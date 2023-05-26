import { ElevatorStatus, ElevatorWorkingState } from '../types';

interface ElevatorStopRequest {
  targetFloor: number;
}

export class Elevator {
  /**
   * The stop request queue is divided into two parts: currentDirectionStops
   * and oppositeDirectionStops. The oppositeDirectionStops have a negative
   * distance because they are in the opposite direction. This separation of
   * queues is done for easier implementation. The actual queue is formed by
   * placing currentDirectionStops first, followed by oppositeDirectionStops.
   */

  private state: ElevatorWorkingState = 'idle';

  private readonly currentDirectionStops: ElevatorStopRequest[] = [];

  private readonly oppositeDirectionStops: ElevatorStopRequest[] = [];

  constructor(public readonly id: number, private floor: number) {}

  get currentFloor(): number {
    return this.floor;
  }

  get nextStop(): number {
    return this.currentDirectionStops[0]?.targetFloor ?? this.currentFloor;
  }

  get isIdle(): boolean {
    return this.state === 'idle';
  }

  get status(): ElevatorStatus {
    const stops = [...this.currentDirectionStops, ...this.oppositeDirectionStops].map((stopReq) => stopReq.targetFloor);
    return {
      id: this.id,
      currentFloor: this.currentFloor,
      nextStop: this.nextStop,
      state: this.state,
      stops,
    };
  }

  // check if distance is positive or negative depending on direction
  getDirectionDistance(floor: number): number {
    const res = floor - this.currentFloor;
    switch (this.state) {
      case 'up':
        return res;
      case 'down':
        return -res;
      default:
        return Math.abs(res);
    }
  }

  resetData(): void {
    this.currentDirectionStops.splice(0, this.currentDirectionStops.length);
    this.oppositeDirectionStops.splice(0, this.oppositeDirectionStops.length);
    this.floor = 0;
    this.state = 'idle';
  }

  // Adding new stop in the queue, sorted by distance
  addNewStop(targetFloor: number): void {
    const distance = this.getDirectionDistance(targetFloor);
    if (distance === 0) return;
    const newReq: ElevatorStopRequest = { targetFloor };
    const arrayToInsert = distance > 0 ? this.currentDirectionStops : this.oppositeDirectionStops;

    if (arrayToInsert.find((stop) => stop.targetFloor === targetFloor) !== undefined) return;

    let i = 0;
    for (const request of arrayToInsert) {
      const requestDistance = this.getDirectionDistance(request.targetFloor);
      if ((distance > 0 && requestDistance <= distance) || (distance < 0 && requestDistance >= distance)) i++;
    }
    arrayToInsert.splice(i, 0, newReq);
    if (this.state === 'idle') this.setState(this.nextStop);
  }

  step(): void {
    if (this.state === 'idle') return;

    this.moveElevator();

    // Check if request completed
    if (this.currentFloor === this.nextStop) this.currentDirectionStops.shift();

    // Requests in current direction finished
    if (this.currentDirectionStops.length === 0) {
      if (this.oppositeDirectionStops.length === 0) {
        this.state = 'idle';
        return;
      }

      this.bounceBack();
    }
  }

  /**
   * This function adds a new ElevatorStopRequest at the beginning of the
   * request queue. It ensures that the elevator
   * moves to the target floor first, delaying its previous target.
   */
  addImmediateStop(targetFloor: number, distance?: number): void {
    this.setState(targetFloor);
    distance = distance ?? this.getDirectionDistance(targetFloor);
    const newReq: ElevatorStopRequest = { targetFloor };
    if (distance === 0 || this.currentDirectionStops.find((stop) => stop.targetFloor === targetFloor) !== undefined) {
      this.setState(this.nextStop);
      return;
    }

    this.currentDirectionStops.unshift(newReq);
  }

  /**
   * This function exchanges the sameDirectionStops and oppositeDirectionStops
   * queues and updates the elevator's state to face the direction of the next
   * target.
   */
  private bounceBack(): void {
    const reqCopy = [...this.currentDirectionStops];
    this.currentDirectionStops.splice(0, this.currentDirectionStops.length);

    this.oppositeDirectionStops.forEach((req) => {
      this.currentDirectionStops.push(req);
    });

    this.oppositeDirectionStops.splice(0, this.oppositeDirectionStops.length);

    reqCopy.forEach((req) => {
      this.oppositeDirectionStops.push(req);
    });

    this.setState(this.nextStop);
  }

  private setState(floorToFace: number): void {
    this.state = this.currentFloor === floorToFace ? 'idle' : this.currentFloor > floorToFace ? 'down' : 'up';
  }

  private moveElevator(): void {
    switch (this.state) {
      case 'down':
        this.floor--;
        break;
      case 'up':
        this.floor++;
        break;
      default:
        return;
    }
  }
}
