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
    expect(result.current.quantity).toBe(2);
    expect(result.current.total).toBe('$21.00');
  });
});

// Fluxo
// O teste passa mock de query com jogos de id [1,2]
// O teste coloca no storageItem os ids [1,2]
// O cart é inicializado e pega esses ids [1,2] do storage
// O cart usa a query mokada para buscar o jogo através dos ids [1,2]
