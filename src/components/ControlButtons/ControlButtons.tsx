import React, { useMemo } from 'react';
import { ControlButton, ControlButtonsWrapper } from './ControlButtons.styled';

type FloorButtonsProps = {
  className?: string;
  floorCount: number;
  clickedFloors: number[];
  clickHandler: (floor: number) => void;
};

const ControlButtons: React.FC<FloorButtonsProps> = ({ floorCount, clickedFloors, clickHandler, className }) => {
  const buttons = useMemo(() => {
    const highlightButton = new Array<boolean>(floorCount).fill(false);
    clickedFloors.forEach((floor) => (highlightButton[floor] = true));

    return highlightButton.map((highlight, floorIndex) => {
      return (
        <ControlButton
          data-testid="control-buttons"
          key={floorIndex}
          active={highlight}
          onClick={() => clickHandler(floorIndex)}
        >
          {floorIndex}
        </ControlButton>
      );
    });
  }, [clickedFloors, floorCount, clickHandler]);

  return <ControlButtonsWrapper className={`${className}`}>{buttons}</ControlButtonsWrapper>;
};

export default ControlButtons;
