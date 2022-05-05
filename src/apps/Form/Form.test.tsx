import { render, screen, fireEvent } from '@testing-library/react';
import Form, { FormValues } from './Form';

function getFields() {
  const inputName = screen.getByLabelText('Nome');
  const inputEmail = screen.getByLabelText('Email');
  const inputPassword = screen.getByLabelText('Senha');
  const buttonSubmit = screen.getByText('Salvar');

  return {
    inputName,
    inputEmail,
    inputPassword,
    buttonSubmit,
  };
}

function setup() {
  const onSubmit = jest.fn();
  const view = render(<Form onSubmit={onSubmit} />);
  const formRole = 'form';
  const formValues: FormValues = {
    name: 'César',
    email: 'rbcesar86@gmail.com',
    password: '123',
  };

  return { view, formRole, formValues, onSubmit };
}

describe('Form', () => {
  it('should be render', () => {
    const { formRole } = setup();
    const formContainer = screen.getByRole(formRole);
    const { inputName, inputEmail, inputPassword, buttonSubmit } = getFields();

    expect(formContainer).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  it('submit form with mock data', () => {
    const { formValues, onSubmit } = setup();
    const { inputName, inputEmail, inputPassword, buttonSubmit } = getFields();
    const { name, email, password } = formValues;

    fireEvent.change(inputName, { target: { value: name } });
    fireEvent.change(inputEmail, { target: { value: email } });
    fireEvent.change(inputPassword, { target: { value: password } });
    fireEvent.submit(buttonSubmit);

    expect(onSubmit).toHaveBeenCalledWith(formValues);
  });
});
