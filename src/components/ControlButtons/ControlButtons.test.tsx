import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the testing library's jest-dom matchers
import ControlButtons from './ControlButtons';

describe('ControlButtons', () => {
  const floorCount = 10;
  const clickedFloors = [2, 5, 7];
  const clickHandler = jest.fn();

  it('should render the correct number of buttons', () => {
    render(<ControlButtons floorCount={floorCount} clickedFloors={clickedFloors} clickHandler={clickHandler} />);

    const buttons = screen.getAllByTestId('control-buttons');
    expect(buttons.length).toBe(floorCount);
  });

  it('should call the clickHandler when a button is clicked', () => {
    render(<ControlButtons floorCount={floorCount} clickedFloors={clickedFloors} clickHandler={clickHandler} />);

    const buttons = screen.getAllByTestId('control-buttons');
    fireEvent.click(buttons[3]);

    expect(clickHandler).toHaveBeenCalledWith(3);
  });
});
