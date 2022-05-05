import styled from 'styled-components';

export const Fieldset = styled('fieldset')`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  color: #838383;
  border: 1px solid #838383;
  border-radius: 4px;

  legend {
    display: none;
    color: transparent;
    font-size: 14px;
    height: 0;
    padding-inline-start: 4px;
    padding-inline-end: 4px;
    transition: 20ms;
    transition-delay: 100ms;
  }

  label {
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translate(0%, -50%);
    font-size: 16px;
    transition: 200ms;
    cursor: text;
  }

  input {
    width: 100%;
    padding: 8px;
    border: none;
    outline: none;

    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      top: -2px;
      left: 12px;
      font-size: 14px;
    }

    &:focus ~ legend,
    &:not(:placeholder-shown) ~ legend {
      display: block;
    }
  }

  small {
    position: absolute;
    right: 4px;
    bottom: 0;
    font-size: 12px;
  }
`;
