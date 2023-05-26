import React from 'react';
import { ElevatorStatus } from '../../types';
import { ControlButtons } from '../ControlButtons';
import { ElevatorScreen } from '../ElevatorScreen';
import { ElevatorDoors } from '../ElevatorDoors';
import { ElevatorWrapper } from './Elevator.styled';

type ElevatorProps = {
  model: ElevatorStatus;
  floorCount: number;
  removeHandler: () => void;
  addNewStop: (targetFloor: number) => void;
};

export const ElevatorItem: React.FC<ElevatorProps> = ({ model, floorCount, addNewStop }) => {
  return (
    <ElevatorWrapper data-testid="elevator-screen">
      <ElevatorScreen elevatorState={model.state} currentFloor={model.currentFloor} />
      <ElevatorDoors open={model.currentFloor === model.nextStop} />
      <ControlButtons clickedFloors={model.stops} floorCount={floorCount} clickHandler={addNewStop} />
    </ElevatorWrapper>
  );
};
