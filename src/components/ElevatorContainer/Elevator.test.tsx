import { ElevatorWorkingState } from '../../types';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ElevatorItem } from './ElevatorItem';

describe('Elevator', () => {
  interface ElevatorModel {
    state: ElevatorWorkingState;
    id: number;
    currentFloor: number;
    nextStop: number;
    stops: number[];
  }

  // Update the model object to match the defined type
  const model: ElevatorModel = {
    state: 'idle',
    id: 1,
    currentFloor: 3,
    nextStop: 5,
    stops: [1, 4, 7],
  };
  const floorCount = 10;
  const removeHandler = jest.fn();
  const addNewStop = jest.fn();

  test('renders the elevator component correctly', () => {
    render(
      <ElevatorItem model={model} floorCount={floorCount} addNewStop={addNewStop} removeHandler={removeHandler} />,
    );

    // Check if the elevator screen is rendered
    const elevatorScreen = screen.getByTestId('elevator-screen');
    expect(elevatorScreen).toBeInTheDocument();

    // Check if the control buttons are rendered
    const controlButtons = screen.queryAllByTestId('control-buttons');
    controlButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
});
