import React from 'react';
import Form, { FormValues } from 'apps/Form';
import WithContext from 'apps/WithContext';
import GenericContextProvider from 'contexts/GenericContextProvider';

import { useGenericContext } from 'hooks/useGenericContext';
import generateHash from 'utils/hash';

function Render() {
  const { setUsers } = useGenericContext() || {};

  const onSubmit = (data: FormValues) => {
    const dataWithId = {
      ...data,
      id: generateHash({ amount: 20, lowercase: true }),
    };

    setUsers && setUsers((old) => old.concat(dataWithId));
  };

  return (
    <React.Fragment>
      <Form onSubmit={onSubmit} />
      <WithContext />
    </React.Fragment>
  );
}

function App() {
  return (
    <GenericContextProvider>
      <Render />
    </GenericContextProvider>
  );
}

export default App;
