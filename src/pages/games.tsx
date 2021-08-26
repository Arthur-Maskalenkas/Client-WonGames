import GamesTemplate, { GamesTemplateProps } from 'templates/Games';
import filterItemsMock from 'components/ExploreSidebar/mock';
import { initializeApollo } from 'utils/apollo';
import { QUERY_GAMES } from 'graphql/queries/games';
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';

// Gametemplate vai receber uma lista de games, e por isso o map. Esta dabdi uma lista de games

export default function GamesPage(props: GamesTemplateProps) {
  return <GamesTemplate {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  // Pegando os dados para ja ter um estado inicial do lado do client, e passando esses dados para o client com initialApolloState
  // O data do client ja existe, então sequer ele vai precisar rodar a query. Por isso o loading nunca vai aparecer
  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 15 },
  });

  return {
    props: {
      revalidate: 60,
      // Extraindo os dados da query e passando para o client
      initialApolloState: apolloClient.cache.extract(),
      filterItems: filterItemsMock,
    },
  };
}
