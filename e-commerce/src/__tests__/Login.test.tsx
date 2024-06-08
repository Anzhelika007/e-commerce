import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Login page */
describe('render Login page', () => {
  it('renders Title on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length === 2).toBeTruthy();
  });
});

/* Label */
describe('checking input labels on Login page', () => {
  it('checking input label for email on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email*'));
  });
});

describe('checking input labels on Login page', () => {
  it('checking input label for password on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Password*'));
  });
});

/* placeholder */
describe('checking input placeholder on Login page', () => {
  it('checking input placeholder for email on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('example@email.com'));
  });
});

/* checking input fields */
describe('checking input value on Login page', () => {
  it('checking input value for email on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
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

// Wrong value for email
// spaces
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for email on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(email, { target: { value: '  some@gmail.com ' } });

    expect(await screen.findByText('Email must not contain spaces'));
  });
});
// doesn't have @
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for email on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(email, { target: { value: 'somegmail.com' } });

    expect(
      await screen.findByText(
        'Email must be properly formatted (e.g., example@email.com)'
      )
    );
  });
});
// doesn't have domain
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for email on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(email, { target: { value: 'somegmail@ffff' } });

    expect(
      await screen.findByText(
        'Email must be contain a domain name (e.g., example.com)'
      )
    );
  });
});

// Wrong value for password
// only numbers
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for password on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: '11111111' } });

    expect(
      await screen.findByText(
        'Password must contain at least one uppercase letter'
      )
    );
  });
});
// only numbers and lower case letters
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for password on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: '11111qqq' } });

    expect(
      await screen.findByText(
        'Password must contain at least one uppercase letter'
      )
    );
  });
});
// only Uppercase letters
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for password on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: 'SSSSSUTS' } });

    expect(
      await screen.findByText(
        'Password must contain at least one lowercase letter'
      )
    );
  });
});
// only Uppercase letters
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for password on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: ' dsYrsds1' } });

    expect(
      await screen.findByText(
        'Password must not contain leading or trailing whitespace'
      )
    );
  });
});
// min 8 chars
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for password on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: 'aSq1223' } });

    expect(
      await screen.findByText('Password must be at least 8 characters long')
    );
  });
});

// Button disabled or not
// incorrect values button disabled
describe('checking button disabled with wrong data on Login page', () => {
  it('checking button disabled with wrong data on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByLabelText(/email/i) as HTMLInputElement;
    const password = screen.getByLabelText(/password/i) as HTMLInputElement;

    // Wrong data
    fireEvent.change(email, { target: { value: 'rsschoolgmail.com' } });
    fireEvent.change(password, { target: { value: 'aSqte229' } });

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /login/i,
      }) as HTMLButtonElement;
      expect(button).toBeDisabled();
    });
  });
});

// correct values the button work
describe('checking button disabled with wrong data on Login page', () => {
  it('checking button disabled with wrong data on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByLabelText(/email/i) as HTMLInputElement;
    const password = screen.getByLabelText(/password/i) as HTMLInputElement;

    // Correct data
    fireEvent.change(email, { target: { value: 'rsschool@gmail.com' } });
    fireEvent.change(password, { target: { value: 'aSqte229' } });

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /login/i,
      }) as HTMLButtonElement;
      expect(button).not.toBeDisabled();
    });
  });
});
