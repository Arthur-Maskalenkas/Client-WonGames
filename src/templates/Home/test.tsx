import 'match-media-mock';
import { render, screen } from 'utils/test-utils';

import bannerMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Home from '.';

const props = {
  banners: bannerMock,
  newGamesTitle: 'News',
  newGames: gamesMock,
  mostPopularGamesTitle: 'Most Popular',
  mostPopularHighlight: highlightMock,
  mostPopularGames: gamesMock,
  upcomingGamesTitle: 'Upcoming',
  upcomingGames: gamesMock,
  upcomingHighlight: highlightMock,
  freeGamesTitle: 'Free Games',
  freeGames: gamesMock,
  freeHighlight: highlightMock,
};

// Verificando se os elementos são renderizados quadno HOme é chamada
// Eu não preciso testar coisas que ja foram testadas. Showcase por exemplo ja foi testado nele mesmo, por isso eu só verifico se o SHOWCASE foi renderizado, e não o highlights que tem dentro dele por exemplo

// Ao invés de pegar o footer real quando ele for chamado, ele vai pegar essa div
jest.mock('components/ShowCase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="mock-showcase"></div>;
    },
  };
});

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="mock-bannerSlider"></div>;
    },
  };
});

describe('<Home />', () => {
  it('deve renderizar todos os componentes', () => {
    render(<Home {...props} />);

    // Renderizando apenas os componentes mocados
    expect(screen.getAllByTestId('mock-showcase')).toHaveLength(4);
    expect(screen.getByTestId('mock-bannerSlider')).toBeInTheDocument();
  });
});
