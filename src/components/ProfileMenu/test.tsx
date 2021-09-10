import { render, screen } from 'utils/test-utils';
import theme from 'styles/theme';

import ProfileMenu from '.';

describe('<ProfileMenu />', () => {
  it('vai renderizar o menu', () => {
    const { container } = render(<ProfileMenu />);

    expect(screen.getByRole('link', { name: /my profile/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /my cards/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my orders/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('vai renderizar o menu ja com o link ativo definido', () => {
    render(<ProfileMenu activeLink="/profile/cards" />);

    expect(screen.getByRole('link', { name: /my cards/i })).toHaveStyle({
      background: theme.colors.primary,
      color: theme.colors.white,
    });
  });
});
