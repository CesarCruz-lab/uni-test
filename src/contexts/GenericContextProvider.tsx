import React, { createContext, useState } from 'react';
import { Component } from 'types/Component';

export type User = {
  id: string,
  about?: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
};

export type ContextData = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

type GenericContextProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultOptions?: User[];
};

export const GenericContext = createContext<ContextData | null>(null);

const GenericContextProvider: Component<GenericContextProps> = ({ children, defaultOptions,...rest }) => {
  const [users, setUsers] = useState<User[]>(defaultOptions || []);

  return (
    <GenericContext.Provider
      {...rest}
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </GenericContext.Provider>
  );
};

export default GenericContextProvider;
