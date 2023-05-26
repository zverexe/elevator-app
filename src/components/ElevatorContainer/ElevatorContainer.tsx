import React, { useCallback, useMemo } from 'react';
import { Button, Divider, Flex } from 'theme-ui';
import elevatorImg from '../../assets/elevator.png';
import { useElevatorSystem } from '../../hooks';
import { ElevatorItem } from './ElevatorItem';
import { ElevatorsContainer, ElevatorButton, StyledFloorDivider, ElevatorIcon } from './Elevator.styled';
const ElevatorContainer: React.FC = () => {
  const { floorCount, elevators, requestPickup, requestDropOff, addElevator, removeElevator } = useElevatorSystem();

  const mappedElevators = useMemo(() => {
    return elevators.map((elevator) => (
      <div key={elevator.id}>
        <ElevatorItem
          model={elevator}
          floorCount={floorCount}
          removeHandler={() => removeElevator(elevator.id)}
          addNewStop={(targetFloor) => requestDropOff(elevator.id, targetFloor)}
        />
      </div>
    ));
  }, [elevators, floorCount, removeElevator, requestDropOff]);

  const clickHandler = useCallback((key: number) => requestPickup(key, 'up'), [requestPickup]);

  return (
    <>
      <ElevatorsContainer p={2}>{mappedElevators}</ElevatorsContainer>
      <Flex sx={{ alignItems: 'center', flexDirection: 'column' }}>
        {[...Array(floorCount)].map((el, index) => (
          <Flex sx={{ flexDirection: 'column' }} key={el}>
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <ElevatorButton p={0} onClick={() => clickHandler(floorCount - index - 1)}>
                {floorCount - index - 1}
              </ElevatorButton>
              <StyledFloorDivider>|</StyledFloorDivider>
              {elevators.map((elevator) => (
                <>
                  <StyledFloorDivider>
                    {elevator.currentFloor === floorCount - index - 1 ? (
                      <ElevatorIcon src={elevatorImg} alt="elevator" />
                    ) : (
                      '-'
                    )}
                  </StyledFloorDivider>
                </>
              ))}
            </Flex>
            <Divider />
          </Flex>
        ))}
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        <Button onClick={addElevator}>Add Elevator</Button>
      </Flex>
    </>
  );
};

export default ElevatorContainer;
