import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Product page */
describe('render Product page', () => {
  it('renders Title on Product page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Product />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByAltText('loading...')).toBeInTheDocument();
  });
});
