import { render, screen } from 'utils/test-utils';
import { CartContextDefaultValues } from 'hooks/use-cart';

import items from 'components/CartList/mock';

import CartDropdown from '.';

describe('<CartDropdown />', () => {
  const cartProviderProps = {
    ...CartContextDefaultValues,
    items,
    quantity: items.length,
    total: 'R$300,00',
  };

  it('should render <CartIcon /> and its badge', () => {
    render(<CartDropdown />, { cartProviderProps });

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument();
    expect(screen.getByText(`${items.length}`)).toBeInTheDocument();
  });

  it('should render Dropdown content with cart items and total', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      total: 'R$300,00',
    };

    render(<CartDropdown />, { cartProviderProps });

    expect(screen.getByText('R$300,00')).toBeInTheDocument();
    expect(screen.getByText(`${items[0].title}`)).toBeInTheDocument();
  });
});
