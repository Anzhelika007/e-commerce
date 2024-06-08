import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Home page */
describe('render Home page', () => {
  it('renders Title on Home page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Home')).toBeInTheDocument();
  });
});
