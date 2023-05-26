import { inRange, sample, remove } from 'lodash';
import { ElevatorDirection, ElevatorStatus } from '../types';
import { Elevator } from './Elevator';

interface PickUpRequest {
  sourceFloor: number;
  direction: ElevatorDirection;
  timeout: number;
}

interface DispatchCandidate {
  elevator: Elevator;
  distance: number;
}

export class ElevatorBuilder {
  private static readonly REQUEST_TIMEOUT = 10;

  private readonly pickupRequests: PickUpRequest[] = [];

  public readonly elevators: Elevator[] = [];

  private nextID = 0;

  constructor(startingElevators: number) {
    for (let i = 0; i < startingElevators; i++) this.addElevator();
  }

  pickup(sourceFloor: number, direction: ElevatorDirection): void {
    const pickupRequest: PickUpRequest = {
      sourceFloor,
      direction,
      timeout: ElevatorBuilder.REQUEST_TIMEOUT,
    };

    if (!this.tryDispatchElevator(pickupRequest)) this.pickupRequests.push(pickupRequest);
  }

  dropOff(elevatorID: number, targetFloor: number): void {
    this.elevators.find((elevator) => elevator.id === elevatorID)?.addNewStop(targetFloor);
  }

  step(): void {
    this.elevators.forEach((elevator) => elevator.step());
    remove(this.pickupRequests, (request) => this.tryDispatchElevator(request));
  }

  status(): ElevatorStatus[] {
    return this.elevators.map((elevator) => elevator.status);
  }

  addElevator(): void {
    this.elevators.push(new Elevator(this.nextID, 0));
    this.nextID++;
  }

  removeElevator(elevatorID: number): void {
    remove(this.elevators, (elevator) => elevator.id === elevatorID);
  }

  resetElevators(): void {
    this.elevators.forEach((elevator) => elevator.resetData());
    this.pickupRequests.splice(0, this.pickupRequests.length);
  }

  /**
   * This function attempts to locate the most suitable elevator for a given
   * request by following these steps:
   * Identify all elevators that are either not in use (idle) or currently passing by the requested floor.
   * If any such elevators are found, select the one that is closest to the
   * requested floor and add the requested floor as the next stop at the front
   * of that elevator's queue.
   * If no suitable elevators are found, reduce the timeout value associated with the request.
   * If the timeout reaches zero, choose a random elevator for the request.
   * The function returns true if an elevator has been dispatched successfully,
   * and false if it was unsuccessful but resulted in an increased timeout value.
   */
  private tryDispatchElevator(pickupRequest: PickUpRequest): boolean {
    const targetFloor: number = pickupRequest.sourceFloor;
    const dispatchCandidates: DispatchCandidate[] = [];
    this.elevators.forEach((elevator) => {
      if (
        elevator.isIdle ||
        (inRange(targetFloor, elevator.currentFloor, elevator.nextStop) &&
          elevator.status.state === pickupRequest.direction)
      ) {
        const distance = elevator.getDirectionDistance(targetFloor);
        dispatchCandidates.push({ elevator, distance });
      }
    });

    if (dispatchCandidates.length === 0) {
      pickupRequest.timeout--;
      if (pickupRequest.timeout <= 0) {
        sample(this.elevators)?.addNewStop(pickupRequest.sourceFloor);
        return true;
      }
      return false;
    }

    dispatchCandidates.sort((a, b) => a.distance - b.distance); // min instead of sort
    const chosenCandidate = dispatchCandidates[0];
    chosenCandidate?.elevator.addImmediateStop(targetFloor, chosenCandidate.distance);
    return true;
  }
}
