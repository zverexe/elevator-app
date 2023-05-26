import React from 'react';
import { StyledElevatorDoor } from './ElevatorDoors.styled';

type ElevatorDoorsProps = {
  open: boolean;
};

const ElevatorDoors: React.FC<ElevatorDoorsProps> = ({ open }) => {
  const openClass = open ? 'open' : 'closed';
  return (
    <>
      <StyledElevatorDoor data-testid="elevator-doors" className={`left ${openClass}`} />
      <StyledElevatorDoor data-testid="elevator-doors" className={`right ${openClass}`} />
    </>
  );
};

export default ElevatorDoors;
