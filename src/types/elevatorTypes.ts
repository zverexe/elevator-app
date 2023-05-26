export type ElevatorDirection = 'up' | 'down';
export type ElevatorWorkingState = ElevatorDirection | 'idle';

export interface ElevatorStatus {
  id: number;
  currentFloor: number;
  nextStop: number;
  state: ElevatorWorkingState;
  stops: number[];
}
