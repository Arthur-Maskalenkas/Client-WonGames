import { useRouter } from 'next/router';
import { initializeApollo } from 'utils/apollo';

import Game, { GameTemplateProps } from 'templates/Game';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games';
import {
  QueryGameBySlug,
  QueryGameBySlugVariables,
} from 'graphql/generated/QueryGameBySlug';
import { GetStaticProps } from 'next';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';

const apolloClient = initializeApollo();

export default function Index(props: GameTemplateProps) {
  const router = useRouter();

  // Se a rota não tiver sido gerada ainda, pode mostrar loading, uma tela de esqueleto...
  if (router.isFallback) return null;

  return <Game {...props} />;
}

/*
// vai ser o passo para gerar as paginas (/game/bla, /game/blu) em build time
*/
export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 },
  });

  // Puxando a propriedade slug da query
  const paths = data.games.map(({ slug }) => ({
    params: { slug },
  }));

  // Caso a pagina não exista, ele vai correr atras (fallback)
  return { paths, fallback: false };
}

/*
// Aqui é aonde alimenta os dados da pagina
*/
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Data games
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
  });

  // Retornando pagina de erro caso não encontre nada na query
  if (!data.games.length) {
    return { notFound: true };
  }

  // pegando os valores do item para alimentar os dados
  const game = data.games[0];

  // Data Recommended games/highlight
  const {
    data: { recommended },
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED,
  });

  return {
    props: {
      revalidate: 60,
      cover: `${game.cover?.src}`,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description,
      },
      gallery: game.gallery.map((image) => ({
        src: `${image.src}`,
        label: image.label,
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name),
      },
      upcomingGames: gamesMock,
      recommendedTitle: recommended?.section?.title,
      upcomingHighlight: highlightMapper(recommended?.section?.highlight),
      recommendedGames: gamesMapper(recommended?.section?.games),
    },
  };
};
