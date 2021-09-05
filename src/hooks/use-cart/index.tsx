import { useQueryGames } from 'graphql/queries/games';
import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import formatPrice from 'utils/format-price';
import { getStorageItem, setStorageItem } from 'utils/localStorage';
import { cartMapper } from 'utils/mappers';

const CART_KEY = 'cartItems';

type CartItem = {
  id: string;
  img: string | undefined;
  title: string;
  price: string;
};

// Props do cartContext
export type CartContextData = {
  items: CartItem[];
  quantity: number;
  total: string;
  isInCart: (id: string) => boolean;
  addToCart: (id: string) => void;
  removeToCart: (id: string) => void;
  clearCart: () => void;
  loading: boolean;
};

// Assinatura dos metodos/inicio
export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: '$0.00',
  isInCart: () => false,
  addToCart: () => null,
  removeToCart: () => null,
  clearCart: () => null,
  loading: false,
};

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

  const { data, loading } = useQueryGames({
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

  const isInCart = (id: string) => (id ? cartItems.includes(id) : false);

  const saveCart = (cartItems: string[]) => {
    setStorageItem(CART_KEY, cartItems);
    setCartItems(cartItems);
  };

  const addToCart = (id: string) => {
    const newCartItems = [...cartItems, id];
    saveCart(newCartItems);
  };

  const removeToCart = (id: string) => {
    const newCartItems = cartItems.filter((cartItemsId: string) => cartItemsId !== id);
    saveCart(newCartItems);
  };

  const clearCart = () => {
    saveCart([]);
  };
  // Disponibilizando as funções e valores
  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total || 0),
        isInCart,
        addToCart,
        removeToCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
// const { items, quantity } = useCart()

export { CartProvider, useCart };
