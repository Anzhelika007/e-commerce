import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Registration page */
describe('render Registration page', () => {
  it('renders Title on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getByText('Registration');
  });
});

/* Label */
describe('checking input labels on Registration page', () => {
  it('checking input label for email on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getByLabelText('Email*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for password on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getByLabelText('Password*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for first name on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getByLabelText('first Name*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for last name on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getByLabelText('last Name*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for date of birth on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getByLabelText('Date of Birth*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for city on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getAllByLabelText('City*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for country on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getAllByLabelText('Country*');
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for POST code on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    screen.getAllByLabelText('POST Code*');
  });
});

/* checking input fields */
describe('checking input value on Registration page', () => {
  it('checking input value for email on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;
    fireEvent.change(email, { target: { value: 'alex@gmail.com' } });

    await waitFor(() => {
      const emailInput = screen.getByDisplayValue('alex@gmail.com');
      expect(emailInput === email);
    });
  });
});

describe('checking input value on Registration page', () => {
  it('checking input value for password on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;
    fireEvent.change(password, { target: { value: 'oopsIdidit2times' } });

    await waitFor(() => {
      const passwordInput = screen.getByDisplayValue('oopsIdidit2times');
      expect(password === passwordInput);
    });
  });
});

describe('checking input value on Registration page', () => {
  it('checking input value for first name on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const firstName = document.getElementById('firstName') as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: 'John' } });

    await waitFor(() => {
      const firstNameInput = screen.getByDisplayValue('John');
      expect(firstName === firstNameInput);
    });
  });
});

describe('checking input value on Registration page', () => {
  it('checking input value for last name on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const lastName = document.getElementById('lastName') as HTMLInputElement;
    fireEvent.change(lastName, { target: { value: 'Dou' } });

    await waitFor(() => {
      const lastNameInput = screen.getByDisplayValue('Dou');
      expect(lastName === lastNameInput);
    });
  });
});

/* Wrong value */
describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for email on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(email, { target: { value: '  some@gmail.com ' } });

    await screen.findByText('Email must not contain spaces');
  });
});

describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for password on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: 'oopsididit2times' } });

    await screen.findByText(
      'Password must contain at least one uppercase letter'
    );
  });
});

describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for first name on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const firstName = document.getElementById('firstName') as HTMLInputElement;

    fireEvent.change(firstName, { target: { value: 'Jo5n' } });

    await screen.findByText(
      'First name must contain at least one character and no special characters or numbers'
    );
  });
});

describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for last name on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const lastName = document.getElementById('lastName') as HTMLInputElement;

    fireEvent.change(lastName, { target: { value: 'D5u' } });

    await screen.findByText(
      'Last name must contain at least one character and no special characters or numbers'
    );
  });
});

/* Empty choose empty value Country */
describe('checking choose empty value Country on Registration page', () => {
  it('must be error message when empty value in country on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: '-' } });
    fireEvent.blur(addressCountry);

    await screen.findByText('Country is required');
  });
});

/* Correct value PostalCode for Belarus */
describe('checking input correct value on Registration page', () => {
  it('must not be error message when input correct value in Postal Code for country Belarus on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'BY' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '200000' } });

    expect(async () => {
      await screen.findByText('Postal code must be 2#####');
    }).rejects.toThrow();
  });
});

/* Wrong value PostalCode for Belarus */
describe('checking input wrong value on Registration page', () => {
  it('must be error message when input wrong value in Postal code for country Belarus on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'BY' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '100000' } });

    await screen.findByText('Postal code must be 2#####');
  });
});

/* Correct value PostalCode for Georgia */
describe('checking input correct value on Registration page', () => {
  it('must not be error message when input correct value in Postal Code for country Georgia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'GE' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '2000' } });

    expect(async () => {
      await screen.findByText('Postal code must be 4 digit');
    }).rejects.toThrow();
  });
});

/* Wrong value PostalCode for Georgia */
describe('checking input wrong value on Registration page', () => {
  it('must be error message when input wrong value in Postal code for country Georgia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'GE' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '100' } });

    await screen.findByText('Postal code must be 4 digit');
  });
});

/* Correct value PostalCode for Russia */
describe('checking input correct value on Registration page', () => {
  it('must not be error message when input correct value in Postal Code for country Russia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'RU' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '200000' } });

    expect(async () => {
      await screen.findByText('Postal code must be 6 digit');
    }).rejects.toThrow();
  });
});

/* Wrong value PostalCode for Georgia */
describe('checking input wrong value on Registration page', () => {
  it('must be error message when input wrong value in Postal code for country Russia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'RU' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '1000000' } });

    await screen.findByText('Postal code must be 6 digit');
  });
});
