import {
  ENUM_COMPONENTPAGEHIGHLIGHT_ALIGNMENT,
  ENUM_COMPONENTPAGERIBBON_COLOR,
  ENUM_COMPONENTPAGERIBBON_SIZE,
} from 'graphql/generated/globalTypes';
import { QueryGames_games } from 'graphql/generated/QueryGames';

import {
  QueryHome_banners,
  QueryHome_newGames,
  QueryHome_sections_freeGames_highlight,
} from 'graphql/generated/QueryHome';
import { bannerMapper, cartMapper, gamesMapper, highlightMapper } from '.';

describe('bannerMapper()', () => {
  it('retorna o formato certo quando mapeado', () => {
    const banner: QueryHome_banners[] = [
      {
        image: {
          url: 'https://source.unsplash.com/user/willianjusten/1042x580',
          __typename: 'UploadFile',
        },
        title: 'Defy death 1',
        subtitle: '<p>Play the new <strong>CrashLands</strong> season',
        button: {
          label: 'Buy now',
          link: '/games/defy-death',
          __typename: 'ComponentPageButton',
        },
        ribbon: {
          text: 'Bestselling',
          color: ENUM_COMPONENTPAGERIBBON_COLOR.primary,
          size: ENUM_COMPONENTPAGERIBBON_SIZE.normal,
          __typename: 'ComponentPageRibbon',
        },
        __typename: 'Banner',
      },
    ];

    expect(bannerMapper(banner)).toStrictEqual([
      {
        img: 'https://source.unsplash.com/user/willianjusten/1042x580',
        title: 'Defy death 1',
        subtitle: '<p>Play the new <strong>CrashLands</strong> season',
        buttonLabel: 'Buy now',
        buttonLink: '/games/defy-death',
        ribbonColor: 'primary',
        ribbonSize: 'normal',
        ribbon: 'Bestselling',
      },
    ]);
  });
});

describe('gamesMapper()', () => {
  it('retorna o formato certo quando mapeado', () => {
    const games: QueryHome_newGames[] = [
      {
        id: '1',
        name: 'gta v',
        price: 100,
        developers: [{ name: 'Rockstar games', __typename: 'Developer' }],
        cover: { __typename: 'UploadFile', url: 'games.com' },
        slug: 'gta-v',
        __typename: 'Game',
      },
    ];

    expect(gamesMapper(games)).toStrictEqual([
      {
        title: 'gta v',
        slug: 'gta-v',
        developer: 'Rockstar games',
        img: 'games.com',
        price: 100,
      },
    ]);
  });
});

describe('highlightMapper()', () => {
  it('retorna o formato certo quando mapeado', () => {
    const highlight: QueryHome_sections_freeGames_highlight = {
      title: 'titleHighlight',
      subtitle: 'subtitleHighlight',
      background: { __typename: 'UploadFile', url: 'urlBackground' },
      floatImage: { __typename: 'UploadFile', url: 'urlFloatImage' },
      buttonLabel: 'buttonLabelHighlight',
      buttonLink: 'buttonLinkHighlight',
      alignment: ENUM_COMPONENTPAGEHIGHLIGHT_ALIGNMENT.left,
      __typename: 'ComponentPageHighlight',
    };

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'titleHighlight',
      subtitle: 'subtitleHighlight',
      backgroundImage: 'urlBackground',
      buttonLabel: 'buttonLabelHighlight',
      buttonLink: 'buttonLinkHighlight',
      alignment: 'left',
      floatImage: 'urlFloatImage',
    });
  });
});

describe('cartMapper()', () => {
  it('vai retornar vazio se não tiver games', () => {
    expect(cartMapper(undefined)).toStrictEqual([]);
  });

  it('Retorna o formato correto quanto mapeado', () => {
    const cart: QueryGames_games[] = [
      {
        __typename: 'Game',
        cover: { __typename: 'UploadFile', url: 'urlCart' },
        developers: [{ name: 'developerCart', __typename: 'Developer' }],
        id: '1',
        name: 'nameCart',
        price: 10,
        slug: 'name-cart',
      },
    ];

    expect(cartMapper(cart)).toStrictEqual([
      {
        id: '1',
        img: 'urlCart',
        price: '$10.00',
        title: 'nameCart',
      },
    ]);
  });
});
