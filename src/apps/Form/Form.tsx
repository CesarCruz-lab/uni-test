import React, { useCallback } from 'react';

import Paper from 'components/surfaces/Paper';
import Container from 'components/surfaces/Container';
import Input, { InputProps } from 'components/form/Input';
import Button from 'components/form/Button';

import { useForm, SubmitHandler } from 'hooks/useForm';

export type FormValues = {
  name: string;
  email: string;
  password: string;
};

export type FormProps = {
  onSubmit: (data: FormValues) => void;
};

type FormStyle = React.HTMLAttributes<HTMLFormElement>['style'];

const formStyle: FormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
};

const Form: React.FC<FormProps> = ({ onSubmit: onSubmitForm }) => {
  const { field, handleSubmit } = useForm<FormValues, InputProps>();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      onSubmitForm(data);
    },
    [onSubmitForm]
  );

  return (
    <Container>
      <Paper>
        {/* eslint-disable-next-line */}
        <form role="form" onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <Input
            {...field('name', {
              type: 'text',
              label: 'Nome',
              counter: true,
            })}
          />
          <Input
            {...field('email', {
              type: 'email',
              label: 'Email',
              counter: true,
            })}
          />
          <Input
            {...field('password', {
              type: 'password',
              label: 'Senha',
              counter: true,
            })}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
