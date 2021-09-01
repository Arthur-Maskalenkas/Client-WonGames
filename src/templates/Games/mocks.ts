import { QUERY_GAMES } from 'graphql/queries/games';

// Ao clicar ja vai ter o primeiro item, por isso o start 1
export const noGamesMock = {
  request: {
    limit: 15,
    query: QUERY_GAMES,
    variables: { limit: 15, where: {} },
  },
  result: {
    data: {
      games: [],
      gamesConnection: {
        values: [],
        __typename: 'GameConnection',
      },
    },
  },
};

export const gamesMock = {
  request: {
    limit: 15,
    query: QUERY_GAMES,
    variables: { limit: 15, where: {} },
  },
  result: {
    data: {
      games: [
        {
          id: '1',
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
      gamesConnection: {
        values: [{ id: '1' }, { id: '2' }],
        __typename: 'GameConnection',
      },
    },
  },
};

export const fetchMoreMock = {
  request: {
    limit: 15,
    query: QUERY_GAMES,
    variables: { limit: 15, where: {}, start: 1 },
  },
  result: {
    data: {
      games: [
        {
          id: '2',
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
      gamesConnection: {
        values: [{ id: '1' }, { id: '2' }],
        __typename: 'GameConnection',
      },
    },
  },
};
