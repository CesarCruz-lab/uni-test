import React from 'react';
import Container from 'components/surfaces/Container';
import { useGenericContext } from 'hooks/useGenericContext';

import WithContextItem from './WithContextItem';

type WithContextStyle = React.HTMLAttributes<HTMLDivElement>['style'];

const withContextStyle: WithContextStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const WithContext: React.FC = () => {
  const { users } = useGenericContext() || {};

  return (
    <Container role="list" style={withContextStyle}>
      {users?.map((user) => (
        <WithContextItem role="listitem" key={user.id} user={user} />
      ))}
    </Container>
  );
};

export default WithContext;
