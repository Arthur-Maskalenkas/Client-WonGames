import { render, screen } from 'utils/test-utils';

import galleryMock from 'components/Gallery/mock';
import gameInfoMock from 'components/GameInfo/mock';
import gameDetailsMock from 'components/GameDetails/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Game, { GameTemplateProps } from '.';
import { GameDetailsProps } from 'components/GameDetails';

const props: GameTemplateProps = {
  cover: 'bg-image.jpg',
  gameInfo: gameInfoMock,
  gallery: galleryMock,
  description: `<h1>Custom HTML</h1>`,
  details: gameDetailsMock as GameDetailsProps,
  upcomingGames: gamesMock,
  recommendedTitle: 'You may like these games',
  upcomingHighlight: highlightMock,
  recommendedGames: gamesMock,
  upcomingTitle: 'titleupcoming',
};

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  },
}));

jest.mock('components/Menu', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Menu" />;
  },
}));

jest.mock('components/Gallery', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Gallery" />;
  },
}));

jest.mock('components/GameDetails', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock GameDetails" />;
  },
}));

jest.mock('components/GameInfo', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock GameInfo" />;
  },
}));

jest.mock('components/ShowCase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />;
  },
}));

describe('<Game />', () => {
  it('vai renderizar os componentes', () => {
    render(<Game {...props} />);
    expect(screen.getByTestId('Mock Gallery')).toBeInTheDocument();
    expect(screen.getByTestId('Mock GameDetails')).toBeInTheDocument();
    expect(screen.getByTestId('Mock GameInfo')).toBeInTheDocument();
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(2);
    expect(screen.getByText(/custom html/i)).toBeInTheDocument();
  });

  it('N??o vai renderizar a galeria sem imagem', () => {
    render(<Game {...props} gallery={undefined} />);

    expect(screen.queryByTestId('Mock Gallery')).not.toBeInTheDocument();
  });

  it('n??o vai renderizar no mobile', () => {
    render(<Game {...props} />);

    // Mobile
    expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyle({
      display: 'none',
    });

    // PC
    expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyleRule(
      'display',
      'block',
      {
        media: '(min-width: 768px)',
      },
    );
  });

  it('vai renderizar o background da pagina', () => {
    render(<Game {...props} />);

    expect(screen.getByRole('image', { name: /cover/i })).toHaveStyle({
      backgroundImage: 'url(bg-image.jpg)',
      height: '39.5rem',
    });

    expect(screen.getByRole('image', { name: /cover/i })).toHaveStyleRule(
      'height',
      '70rem',
      {
        media: '(min-width: 768px)',
      },
    );
  });
});
