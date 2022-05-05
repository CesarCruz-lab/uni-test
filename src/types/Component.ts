import React from 'react';

export type Component<T> = React.FC<React.PropsWithChildren<T>>;
