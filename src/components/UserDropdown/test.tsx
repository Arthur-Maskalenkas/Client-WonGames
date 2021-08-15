import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'utils/tests/helpers';

import UserDropdown from '.';

describe('<UserDropdown />', () => {
  it('vai renderizar o username', () => {
    renderWithTheme(<UserDropdown username="Arthur" />);

    expect(screen.getByText(/Arthur/i)).toBeInTheDocument();
  });

  it('vai renderizar o menu', () => {
    renderWithTheme(<UserDropdown username="Arthur" />);

    // open menu
    userEvent.click(screen.getByText(/arthur/i));

    expect(
      screen.getByRole('link', { name: /my profile/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();
  });
});
