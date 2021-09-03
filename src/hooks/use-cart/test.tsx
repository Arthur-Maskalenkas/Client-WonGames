import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';

import { setStorageItem } from 'utils/localStorage';

import { useCart, CartProvider, CartproviderProps } from '.';
import { cartItems, gamesMock } from './mock';

describe('useCart', () => {
  it('vai retornar items e info de qualquer coisa no carrinho ', async () => {
    const wrapper = ({ children }: CartproviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    );

    setStorageItem('cartItems', ['1', '2']);

    // Renderizando dentro do wrapper o useCart
    const { result, waitForNextUpdate } = renderHook(() => useCart(), { wrapper });

    // Espera até que atualize algo
    await waitForNextUpdate();

    expect(result.current.items).toStrictEqual(cartItems);
  });
});
