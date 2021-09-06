import { CartContextDefaultValues } from 'hooks/use-cart';
import { render, screen } from 'utils/test-utils';

import CartList from '.';
import items from './mock';

describe('<CartList />', () => {
  it('deve renderizar o componente', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      total: 'R$ 330,00',
    };

    const { container } = render(<CartList />, { cartProviderProps });

    expect(screen.getAllByRole('heading')).toHaveLength(2);
    expect(screen.getByText('R$ 330,00')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('vai renderizar o botão', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
    };

    render(<CartList hasButton />, { cartProviderProps });

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument();
  });

  it('vai redenrizar empty se não tiver jogos', () => {
    render(<CartList />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
  });

  it('vai renderizar o loading', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      loading: true,
    };

    render(<CartList hasButton />, { cartProviderProps });

    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });
});
