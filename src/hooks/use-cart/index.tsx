import { useQueryGames } from 'graphql/queries/games';
import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import formatPrice from 'utils/format-price';
import { getStorageItem } from 'utils/localStorage';
import { cartMapper } from 'utils/mappers';

const CART_KEY = 'cartItems';

type CartItem = {
  id: string;
  img: string | undefined;
  title: string;
  price: string;
};

// Props do cartContext
export type CartContextData = { items: CartItem[] };

export const CartContextDefaultValues = { items: [] };

export const CartContext = createContext<CartContextData>(CartContextDefaultValues);

export type CartproviderProps = {
  children: React.ReactNode;
};

const CartProvider = ({ children }: CartproviderProps) => {
  // Vai possuir apenas ids
  const [cartItems, setCartItems] = useState<string[]>([]);

  // No next não tem window na geração do static/ssr. Por isso eu vou driblar isso a partir do useEffect
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
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
// const { items, quantity } = useCart()

export { CartProvider, useCart };

// Fluxo:

// > Algo vai setar na chave CartItems dentro do localStorage os ids [1,2]
// > O use-cart vai ser chamado e vai pegar os valores [1,2] definidos dentro do localStorage, com o getStorage
// > O use-cart vai jogar os valores [1,2] do localStorage no estado cartItems, com o setCartItems
// > Por fim ele vai fazer uma query buscando os jogos com ids [1,2]
