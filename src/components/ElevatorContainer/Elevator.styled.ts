import styled from 'styled-components';
import { Button, Flex } from 'theme-ui';

export const ElevatorWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 12em;
  height: 15em;
  position: relative;
  transition: all 0.5s;
`;

export const ElevatorsContainer = styled(Flex)`
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 20px;
  justify-content: center;
  width: 100vw;
`;

export const StyledFloorDivider = styled.div`
  text-align: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-flow: column wrap;
`;

export const ElevatorButton = styled(Button)`
  width: 50px;
  height: 30px;
  cursor: pointer;
`;

export const ElevatorIcon = styled.img`
  width: 15px;
`;
