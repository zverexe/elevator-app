import styled from 'styled-components';
import { Flex } from 'theme-ui';

export const ScreenContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0.8em;
  font-size: 0.9em;
  background-color: black;
  padding: 0.4em 0;
  color: red;
  width: 7em;
  height: 1em;
  line-height: 1em;
  .icon {
    position: absolute;
    left: 0.4em;
  }
`;

export const FloorNumber = styled.span`
  margin-left: 5px;
`;
