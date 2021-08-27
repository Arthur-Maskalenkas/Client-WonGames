import { QUERY_GAMES } from 'graphql/queries/games';

// O result eu manipulo,ja a query não. Tem que ser a mesma do template.
// Ao clicar ja vai ter o primeiro item, por isso o start 1
export const gamesMock = {
  request: {
    query: QUERY_GAMES,
    variables: { limit: 15 },
  },
  result: {
    data: {
      games: [
        {
          name: 'Sample Game',
          slug: 'sample-game',
          price: 518.39,
          developers: [{ name: 'sample developer' }],
          cover: {
            url: 'sample-game.jpg',
          },
          __typename: 'Game',
        },
      ],
    },
  },
};

export const fetchMoreMock = {
  request: {
    query: QUERY_GAMES,
    variables: { limit: 15, start: 1 },
  },
  result: {
    data: {
      games: [
        {
          name: 'Fetch More Game',
          slug: 'fetch-more',
          price: 518.39,
          developers: [{ name: 'sample developer' }],
          cover: {
            url: 'sample-game.jpg',
          },
          __typename: 'Game',
        },
      ],
    },
  },
};
