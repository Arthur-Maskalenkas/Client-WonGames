import { renderHook } from '@testing-library/react-hooks';
import { setStorageItem } from 'utils/localStorage';

import { useCart, CartProvider, CartproviderProps } from '.';

describe('useCart', () => {
  it('vai retornar items e info de qualquer coisa no carro ', () => {
    const wrapper = ({ children }: CartproviderProps) => (
      <CartProvider>{children}</CartProvider>
    );

    setStorageItem('cartItems', ['1', '2']);

    // Renderizando dentro do wrapper o useCart
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toStrictEqual(['1', '2']);
  });
});
