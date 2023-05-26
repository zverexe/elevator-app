import React from 'react';
import { render, screen } from '@testing-library/react';
import ElevatorDoors from './ElevatorDoors';

describe('ElevatorDoors', () => {
  test('renders with closed doors', () => {
    render(<ElevatorDoors open={false} />);

    const elevatorDoors = screen.queryAllByTestId('elevator-doors');
    elevatorDoors.forEach((door) => {
      expect(door).toBeInTheDocument();
      expect(door).toHaveClass('closed');
    });
  });

  test('renders with open doors', () => {
    render(<ElevatorDoors open={true} />);

    // Check if the elevator doors are rendered
    const elevatorDoors = screen.queryAllByTestId('elevator-doors');
    elevatorDoors.forEach((door) => {
      expect(door).toBeInTheDocument();
      expect(door).toHaveClass('open');
    });
  });
});
