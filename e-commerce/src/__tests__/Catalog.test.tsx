import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Catalog page */
describe('render Catalog page', () => {
  it('renders Title on Catalog page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Catalog />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.queryByText('Catalog') || screen.queryByAltText('loading...')
    ).toBeInTheDocument();
  });
});
