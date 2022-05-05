import React from 'react';
import { Component } from 'types/Component';
import { StyledSubmitButton } from './style';

const Button: Component<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <StyledSubmitButton {...rest}>
      {children}
    </StyledSubmitButton>
  );
};

export default Button;
