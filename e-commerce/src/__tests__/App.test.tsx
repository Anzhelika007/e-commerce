import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import App from '../App/App';

test('demo', () => {
  expect(true).toBe(true);
});

/* Header */
describe('render', () => {
  it('renders the main page Header', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByAltText('logo')).toBeInTheDocument();
  });
});

/* Footer */
describe('App component', () => {
  it('renders the main page and includes the Footer contact title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByAltText('logoFooter')).toBeInTheDocument();
  });
});
