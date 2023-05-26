import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { ElevatorWorkingState } from '../../types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ScreenContainer, FloorNumber } from './ElevatorScreen.styled';

type ElevatorScreenProps = { elevatorState: ElevatorWorkingState; currentFloor: number };

const ElevatorScreen: React.FC<ElevatorScreenProps> = ({ elevatorState, currentFloor }) => {
  const stateIcon = elevatorState === 'idle' ? faRightLeft : elevatorState === 'up' ? faArrowUp : faArrowDown;
  const stateIconPro = stateIcon as IconProp;
  return (
    <ScreenContainer>
      <FontAwesomeIcon icon={stateIconPro} fixedWidth className="icon" data-testid="state-icon" />
      <FloorNumber> {currentFloor}</FloorNumber>
    </ScreenContainer>
  );
};

export default ElevatorScreen;
