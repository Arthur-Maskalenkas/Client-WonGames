import { useQueryGames } from 'graphql/queries/games';
import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import formatPrice from 'utils/format-price';
import { getStorageItem } from 'utils/localStorage';
import { cartMapper } from 'utils/mappers';
import { gamesMock } from './mock';

const CART_KEY = 'cartItems';

type CartItem = {
  id: string;
  img: string | undefined;
  title: string;
  price: string;
};

// Props do cartContext
export type CartContextData = { items: CartItem[]; quantity: number; total: string };

export const CartContextDefaultValues = { items: [], quantity: 0, total: '$0.00' };

export const CartContext = createContext<CartContextData>(CartContextDefaultValues);

export type CartproviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartproviderProps) => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  // No next não tem window na geração do static/ssr.
  useEffect(() => {
    const data = getStorageItem(CART_KEY);

    if (data) {
      setCartItems(data);
    }
  }, []);

  const { data } = useQueryGames({
    // Se não tiver id, não roda
    skip: !cartItems?.length,
    variables: {
      where: {
        id: cartItems,
      },
    },
  });

  const total = data?.games.reduce((acc, game) => {
    return acc + game.price;
  }, 0);

  // Disponibilizando os items pego pelo storage
  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total || 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
// const { items, quantity } = useCart()

export { CartProvider, useCart };
