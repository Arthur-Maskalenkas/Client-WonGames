import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import { getStorageItem } from 'utils/localStorage';

const CART_KEY = 'cartItems';

export type CartContextData = { items: string[] };

// Toda a lógica do carrinho estará aqui
export const CartContextDefaultValues = { items: [] };

export const CartContext = createContext<CartContextData>(CartContextDefaultValues);

export type CartproviderProps = {
  children: React.ReactNode;
};

// Vai passar todos os valores
const CartProvider = ({ children }: CartproviderProps) => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  // No next não tem window na geração do static/ssr. Por isso eu vou driblar isso a partir do useEffect
  useEffect(() => {
    const data = getStorageItem(CART_KEY);

    if (data) {
      setCartItems(data);
    }
  }, []);

  return (
    <CartContext.Provider value={{ items: cartItems }}>{children}</CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
// const { items, quantity } = useCart()

export { CartProvider, useCart };
