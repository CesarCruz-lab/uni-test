import styled from 'styled-components';

export const StyledSubmitButton = styled('button')`
  color: #4488dd;
  border: 1px solid #4488dd;
  padding: 8px 16px;
  border-radius: 4px;
  background: transparent;
  transition: 200ms;
  cursor: pointer;

  &:hover {
    background: #4488dd22;
  }

  &:active {
    filter: brightness(0.6);
  }
`;
