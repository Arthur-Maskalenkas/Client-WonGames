import { useQueryGames } from 'graphql/queries/games';
import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import { getStorageItem } from 'utils/localStorage';

const CART_KEY = 'cartItems';

type CartItem = {
  id: string;
  img: string;
  title: string;
  price: string;
};

// Props do cartContext
export type CartContextData = { items: CartItem[] };

// Toda a lógica do carrinho estará aqui.
export const CartContextDefaultValues = { items: [] };

export const CartContext = createContext<CartContextData>(CartContextDefaultValues);

export type CartproviderProps = {
  children: React.ReactNode;
};

// <CartProvider>{children}</CartProvider>
const CartProvider = ({ children }: CartproviderProps) => {
  // Vai possuir apenas ids
  const [cartItems, setCartItems] = useState<string[]>([]);

  // No next não tem window na geração do static/ssr. Por isso eu vou driblar isso a partir do useEffect
  // Pegando os valores definidios através do setStorageItem
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

  // Disponibilizando os items pego pelo storage
  return (
    <CartContext.Provider value={{ items: data?.games }}>{children}</CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
// const { items, quantity } = useCart()

export { CartProvider, useCart };

// O carrinho (estado de cartItem) vai funcionar a base de ids, e a query vai buscar essa lista de ids
// ASsim que carregar o next, o useEffect vai verificar se existem items no storage e passar esses items (ids) para o estado
// CartContext.provider vai disponibilizar o value
// CartContextData são as props do CartContext
