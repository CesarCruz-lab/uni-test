import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import WithContext from './WithContext';
import GenericContextProvider from 'contexts/GenericContextProvider';
import generateHash from 'utils/hash';

function renderComponentWithContextProvider(Component: React.FC) {
  return render(
    <GenericContextProvider
      defaultOptions={[
        {
          id: generateHash({ amount: 20, lowercase: true }),
          name: 'Cesar',
          email: 'user@email.com',
          password: 'try1234',
        },
        {
          id: generateHash({ amount: 20, lowercase: true }),
          name: 'Jão',
          email: 'jao@email.com',
          password: 'catch12345',
        },
      ]}
    >
      <Component />
    </GenericContextProvider>
  );
}

function setup() {
  const view = renderComponentWithContextProvider(WithContext);
  const references = {
    parentComponentRole: 'list',
    childrenConponentRole: 'listitem',
  };

  return { view, references };
}

describe('WithContext', () => {
  it('should be render with context', () => {
    const { references } = setup();
    const listElement = screen.getByRole(references.parentComponentRole);
    const listItemElements = screen.getAllByRole(references.childrenConponentRole);

    expect(listElement).toBeInTheDocument();

    listItemElements.forEach((itemElement) => {
      expect(itemElement).toBeInTheDocument();
    });
  });

  it('should remove user', async () => {
    const { references } = setup();
    const listItemElement = screen.getAllByRole(references.childrenConponentRole)[0];

    fireEvent.click(listItemElement);

    // eslint-disable-next-line
    waitForElementToBeRemoved(listItemElement, { timeout: 200 }).then(() => {
      expect(listItemElement).not.toBeInTheDocument();
    });
  });
});
