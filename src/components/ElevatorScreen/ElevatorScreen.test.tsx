import React from 'react';
import { render, screen } from '@testing-library/react';
import ElevatorScreen from './ElevatorScreen';

describe('ElevatorScreen', () => {
  test('renders the current floor number', () => {
    const currentFloor = 5;
    render(<ElevatorScreen elevatorState="up" currentFloor={currentFloor} />);

    const floorNumberElement = screen.getByText(currentFloor.toString());
    expect(floorNumberElement).toBeInTheDocument();
  });

  test('renders the correct state icon', () => {
    const elevatorState = 'down';
    render(<ElevatorScreen elevatorState={elevatorState} currentFloor={3} />);

    const stateIconElement = screen.getByTestId('state-icon');
    expect(stateIconElement).toBeInTheDocument();
    expect(stateIconElement).toHaveClass('fa-arrow-down');
  });
});
