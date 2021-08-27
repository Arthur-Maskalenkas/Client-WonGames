import { InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

// A query QueryGames retorna -> games <-, e é isso que o cache vai acumular games

// ** fluxo:
// > Eu pego uma lista de free
// > o cache fica [game1,game2,game3]
// > Assim que outra parte usa alguma query que retorne game, ela vai receber independente de tudo [game1,game2,game3], e não [game4,game5,game6]
// **

// Para quebrar o fluxo, eu separar o cacheamento por 'where' e 'sort'
export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        games: concatPagination(['where', 'sort']),
      },
    },
  },
});
