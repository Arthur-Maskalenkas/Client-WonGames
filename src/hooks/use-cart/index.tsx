import { useContext } from 'react';
import { createContext } from 'react';

export type CartContextData = {};

// Toda a lógica do carrinho estará aqui
export const CartContextDefaultValues = {};

export const CartContext = createContext<CartContextData>(CartContextDefaultValues);

export type CartproviderProps = {
  children: React.ReactNode;
};

// Vai passar todos os valores
const CartProvider = ({ children }: CartproviderProps) => {
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);
// const { items, quantity } = useCart()

export { CartProvider, useCart };
