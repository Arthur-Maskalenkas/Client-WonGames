import Home, { HomeTemplateProps } from 'templates/Home';
import bannersMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import { initializeApollo } from 'utils/apollo';
import { QueryHome } from 'graphql/generated/QueryHome';
import { QUERY_HOME } from 'graphql/queries/home';

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  // Ao inves de utilizar data.banners ou data.newGames, ja desestrutura eles logo
  const {
    data: { banners, newGames, upcomingGames, freeGames, sections },
  } = await apolloClient.query<QueryHome>({ query: QUERY_HOME });

  return {
    props: {
      revalidade: 60,
      banners: banners.map((banner) => ({
        img: banner.image?.url,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonLabel: banner.button?.label,
        buttonLink: banner.button?.link,
        ribbon: banner.ribbon?.text || null,
        ribbonColor: banner.ribbon?.color || null,
        ribbonSize: banner.ribbon?.size || null,
      })),
      newGames: newGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url,
        price: game.price,
      })),
      mostPopularHighlight: highlightMock,
      mostPopularGames: sections?.popularGames!.games.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url,
        price: game.price,
      })),
      upcommingGames: upcomingGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url,
        price: game.price,
      })),
      upcommingHighlight: highlightMock,
      upcommingMoreGames: gamesMock,
      freeGames: freeGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover?.url,
        price: game.price,
      })),
      freeHighlight: highlightMock,
    },
  };
}
