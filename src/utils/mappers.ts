import {
  QueryHome_banners,
  QueryHome_freeGames,
  QueryHome_sections_freeGames_highlight,
} from 'graphql/generated/QueryHome';

export const bannerMapper = (banners: QueryHome_banners[]) => {
  return banners.map((banner) => ({
    img: banner.image?.url,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLabel: banner.button?.label,
    buttonLink: banner.button?.link,
    ribbon: banner.ribbon?.text || null,
    ribbonColor: banner.ribbon?.color || null,
    ribbonSize: banner.ribbon?.size || null,
  }));
};

export const gamesMapper = (
  games: QueryHome_freeGames[] | null | undefined,
) => {
  return (
    games &&
    games.map((game) => ({
      title: game.name,
      slug: game.slug,
      developer: game.developers[0].name,
      img: game.cover?.url,
      price: game.price,
    }))
  );
};

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined,
) => {
  return (
    highlight && {
      title: highlight?.title,
      subtitle: highlight?.subtitle,
      backgroundImage: highlight?.background?.url,
      floatImage: highlight?.floatImage?.url || null,
      buttonLabel: highlight?.buttonLabel,
      buttonLink: highlight?.buttonLink,
      alignment: highlight?.alignment,
    }
  );
};
