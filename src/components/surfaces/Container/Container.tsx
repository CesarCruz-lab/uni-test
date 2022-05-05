import React from 'react';
import { Component } from 'types/Component';
import { StyledContainer } from './style';

const Container: Component<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default Container;
