import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import CartIcon from '.';

describe('<CartIcon />', () => {
  it('vai renderizar sem a badge', () => {
    renderWithTheme(<CartIcon />);

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument();
  });

  it('vai com a badge', () => {
    renderWithTheme(<CartIcon quantity={3} />);

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument();
  });

  it('vai renderizar badge apenas com numeros postiivos', () => {
    renderWithTheme(<CartIcon quantity={-1} />);

    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/-1/)).not.toBeInTheDocument();
  });
});
