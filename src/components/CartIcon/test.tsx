import { CartContextDefaultValues } from 'hooks/use-cart';
import { render, screen } from 'utils/test-utils';

import CartIcon from '.';

describe('<CartIcon />', () => {
  it('vai renderizar sem a badge', () => {
    render(<CartIcon />);

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument();
  });

  // Agora eu estou passando via contexto todos os valores padrões e modificando o quantity para 3
  it('vai renderizar com a badge', () => {
    render(<CartIcon />, {
      cartProviderProps: { ...CartContextDefaultValues, quantity: 3 },
    });

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });
});
