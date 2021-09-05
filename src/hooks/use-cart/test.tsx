import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { setStorageItem } from 'utils/localStorage';

import { useCart, CartProvider, CartproviderProps } from '.';
import { cartItems, gamesMock } from './mock';

describe('useCart', () => {
  beforeEach(() => {
    // Não permitindo a poluição de escopo
    window.localStorage.clear();
  });

  it('vai retornar items e info de qualquer coisa no carrinho ', async () => {
    // Fluxo:
    // O teste passa mock de query com jogos de id [1,2]
    // O teste coloca no storageItem os ids [1,2]
    // O cart é inicializado e pega esses ids [1,2] do storage
    // O cart usa a query mokada para buscar o jogo através dos ids [1,2]
    const wrapper = ({ children }: CartproviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    );

    setStorageItem('cartItems', ['1', '2']);

    // Renderizando dentro do wrapper o useCart
    const { result, waitForNextUpdate } = renderHook(() => useCart(), { wrapper });

    // Antes de atualizar algo, vai ter loading
    expect(result.current.loading).toBe(true);

    // Espera até que atualize algo, como items e etc... se fosse metodo, não precisava
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toStrictEqual(cartItems);
    expect(result.current.quantity).toBe(2);
    expect(result.current.total).toBe('$21.00');
  });

  it('vai retornar true/false se o item estiver no carrinho', () => {
    const wrapper = ({ children }: CartproviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    );

    setStorageItem('cartItems', ['1']);

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.isInCart('1')).toBe(true);
    expect(result.current.isInCart('2')).toBe(false);
  });

  it('vai adicionar items ao carrinho', () => {
    const wrapper = ({ children }: CartproviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Encapsulndo dentro do act por conta que vai usar um metodo para mudar estados
    act(() => {
      result.current.addToCart('1');
    });

    expect(result.current.quantity).toBe(1);
    expect(window.localStorage.getItem('WONGAMES_cartItems')).toBe(JSON.stringify(['1']));
  });

  it('vai remover items do carrinho', () => {
    const wrapper = ({ children }: CartproviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    setStorageItem('cartItems', ['1']);

    // Encapsulndo dentro do act por conta que vai usar um metodo para mudar estados
    act(() => {
      result.current.removeToCart('1');
    });

    expect(result.current.quantity).toBe(0);
    expect(window.localStorage.getItem('WONGAMES_cartItems')).toBe(JSON.stringify([]));
  });

  it('vai limpar totalmente os items do carrinho', () => {
    const wrapper = ({ children }: CartproviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    setStorageItem('cartItems', ['1', '2', '3']);

    // Encapsulndo dentro do act por conta que vai usar um metodo para mudar estados
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.quantity).toBe(0);
    expect(window.localStorage.getItem('WONGAMES_cartItems')).toBe(JSON.stringify([]));
  });
});
