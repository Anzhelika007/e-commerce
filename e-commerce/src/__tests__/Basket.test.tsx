import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Basket page */
describe('render Basket page', () => {
  it('renders Title on Basket page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Basket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Basket')).toBeInTheDocument();
  });
});
