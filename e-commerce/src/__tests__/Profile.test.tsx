import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Profile page */
describe('render Profile page', () => {
  it('renders Title on Profile page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Profile />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Profile')).toBeInTheDocument();
  });
});
