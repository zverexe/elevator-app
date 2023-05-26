import styled from 'styled-components';
import { Flex } from 'theme-ui';

export const ControlButtonsWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  width: 4em;
  height: 9em;
  overflow: hidden auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const ControlButton = styled.span<{ active: boolean }>`
  display: block;
  margin: 0.1em;
  border-radius: 14px;
  width: calc(2em - 0.2em);
  height: calc(2em - 0.2em);
  line-height: calc(2em - 0.2em);
  cursor: pointer;
  background-color: #3f4045;
  text-align: center;
  outline: 0.22em solid #747681;
  outline-offset: -0.2em;
  color: #f5efed;
  transition: outline-color 0.3s ease-in;
  ${(props) => (props.active ? 'outline-color: red;' : '')};
`;
