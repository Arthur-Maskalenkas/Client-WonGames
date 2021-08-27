import { InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

// A query QueryGames retorna -> games <-, e é isso que o cache vai acumular games
// Vai separar por argkeys
export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        games: concatPagination(['where', 'sort']),
      },
    },
  },
});
