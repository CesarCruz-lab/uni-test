import React, { useCallback, useRef } from 'react';
import Paper from 'components/surfaces/Paper';

import { User } from 'contexts/GenericContextProvider';
import styled from 'styled-components';
import { useGenericContext } from 'hooks/useGenericContext';

interface WithContextItemProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

const StyledWithContextItem = styled(Paper)`
  opacity: 0;
  transform: translateY(8px);
  display: flex;
  justify-content: space-between;
  align-items: center;

  animation-name: animate;
  animation-duration: 200ms;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;

  h4 {
    color: #5c5a5a;
  }

  span {
    color: #5d5c5c;
  }

  button {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #4488dd;
    background: transparent;
    color: #4488dd;
    cursor: pointer;

    &:hover {
      background: #4488dd22;
    }

    &:active {
      filter: brightness(0.3);
    }

    .removed {
      animation-name: animatedbutton;
      animation-duration: 200ms;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
      /* animation-direction: reverse; */

      @keyframes animatedbutton {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(8px);
        }
      }
    }
  }

  @keyframes animate {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const WithContextItem: React.FC<WithContextItemProps> = ({ user, ...rest }) => {
  const { setUsers } = useGenericContext() || {};
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleRemoveUserById = useCallback(
    (id: string) => {
      return () => {
        buttonRef.current?.classList.add('removed');

        setTimeout(() => {
          setUsers && setUsers((old) => old.filter((item) => item.id !== id));
        }, 500);
      };
    },
    [setUsers]
  );

  return (
    <StyledWithContextItem {...rest}>
      <div>
        <h4>{user.name}</h4>
        <span>{user.email}</span>
      </div>
      <div>
        <button ref={buttonRef} onClick={handleRemoveUserById(user.id)}>
          Remover
        </button>
      </div>
    </StyledWithContextItem>
  );
};

export default WithContextItem;
