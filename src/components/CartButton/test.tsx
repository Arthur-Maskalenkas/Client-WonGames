import userEvent from '@testing-library/user-event';
import { CartContextDefaultValues } from 'hooks/use-cart';
import { screen, render } from 'utils/test-utils';

import CartButton from '.';

describe('<CartButton />', () => {
  it('vai renderizar o botão de adicionar e chamar um metodo quando clicado', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => false,
      addToCart: jest.fn(),
    };

    render(<CartButton id="1" />, { cartProviderProps });

    const button = screen.getByLabelText(/add to cart/i);

    expect(button).toBeInTheDocument();

    userEvent.click(button);
    // Espero que ele chame o metodo com o numero do id
    expect(cartProviderProps.addToCart).toHaveBeenCalledWith('1');
  });

  it('vai renderizar o botão de remover e chamar um metodo quando clicado', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => true,
      removeToCart: jest.fn(),
    };

    render(<CartButton id="1" />, { cartProviderProps });

    const button = screen.getByLabelText(/remove from cart/i);

    expect(button).toBeInTheDocument();

    userEvent.click(button);
    // Espero que ele chame o metodo com o numero do id
    expect(cartProviderProps.removeToCart).toHaveBeenCalledWith('1');
  });
});
