import { initializeApollo } from 'utils/apollo';

import { QUERY_GAMES } from 'graphql/queries/games';
import { parseQueryStringToWhere } from 'utils/filter';
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';

import GamesTemplate, { GamesTemplateProps } from 'templates/Games';
import { GetServerSidePropsContext } from 'next';

// Gametemplate vai receber uma lista de games, e por isso o map. Esta dabdi uma lista de games

export default function GamesPage(props: GamesTemplateProps) {
  return <GamesTemplate {...props} />;
}

// ssr para pegar sempre a url
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  const filterPrice = {
    title: 'Price',
    name: 'price_lte',
    type: 'radio',
    fields: [
      { label: 'Free', name: 0 },
      { label: 'Under $50', name: 50 },
      { label: 'Under $100', name: 100 },
      { label: 'Under $150', name: 150 },
      { label: 'Under $250', name: 250 },
      { label: 'Under $500', name: 500 },
    ],
  };

  const filterPlatforms = {
    title: 'Platforms',
    name: 'platforms',
    type: 'checkbox',
    fields: [
      { label: 'Windows', name: 'windows' },
      { label: 'Linux', name: 'linux' },
      { label: 'Mac OS', name: 'mac' },
    ],
  };

  const filterSort = {
    title: 'Sort by price',
    name: 'sort',
    type: 'radio',
    fields: [
      { label: 'Lowest to highest', name: 'price:asc' },
      { label: 'Highest to lowest', name: 'price:desc' },
    ],
  };

  const filterCategories = {
    title: 'Genres',
    name: 'categories',
    type: 'checkbox',
    fields: [
      { label: 'Action', name: 'action' },
      { label: 'Adventure', name: 'adventure' },
      { label: 'Sports', name: 'sports' },
      { label: 'Puzzle', name: 'puzzle' },
      { label: 'Horror', name: 'horror' },
      { label: 'Platform', name: 'platform' },
      { label: 'Fantasy', name: 'fantasy' },
      { label: 'RPG', name: 'role-playing' },
      { label: 'JRPG', name: 'jrpg' },
      { label: 'Simulation', name: 'simulation' },
      { label: 'Strategy', name: 'strategy' },
      { label: 'Shooter', name: 'shooter' },
    ],
  };

  const filterItems = [filterSort, filterPrice, filterPlatforms, filterCategories];

  // Pegando os dados para ja ter um estado inicial do lado do client, e passando esses dados para o client com initialApolloState
  // O data do client ja existe, então sequer ele vai precisar rodar a query. Por isso o loading nunca vai aparecer
  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({
        queryString: query,
        filterItems: filterItems,
      }),
      sort: query.sort as string | null,
    },
  });

  return {
    props: {
      // Extraindo os dados da query e passando para o client
      // Caso uma pesquisa ja tenha sido feita, não vai pesquisar de novo essa mesma pesquisa, pois vai tentar extrair do cache antes de pesquisar na pagina
      initialApolloState: apolloClient.cache.extract(),
      filterItems: filterItems,
    },
  };
}
