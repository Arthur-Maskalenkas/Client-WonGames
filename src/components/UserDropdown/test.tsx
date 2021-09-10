import { render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import UserDropdown from '.';

describe('<UserDropdown />', () => {
  it('vai renderizar o username', () => {
    render(<UserDropdown username="Arthur" />);

    expect(screen.getByText(/Arthur/i)).toBeInTheDocument();
  });

  it('vai renderizar o menu', () => {
    render(<UserDropdown username="Arthur" />);

    // open menu
    userEvent.click(screen.getByText(/arthur/i));

    expect(screen.getByRole('link', { name: /my profile/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });
});
