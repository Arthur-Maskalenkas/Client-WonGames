import 'match-media-mock';
import { render, screen } from 'utils/test-utils';

import Wishlist from '.';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

const props = {
  games: gamesMock,
  recommendedHighlight: highlightMock,
  recommendedGames: gamesMock,
};

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  },
}));

jest.mock('components/ShowCase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />;
  },
}));

describe('<Wishlist />', () => {
  it('should render correctly', () => {
    render(<Wishlist {...props} />);

    // Renderizando o titulo
    expect(screen.getByRole('heading', { name: /wishlist/i })).toBeInTheDocument();

    // Renderizando componente
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();

    expect(screen.getAllByText(/population zero/i)).toHaveLength(6);
  });

  it('deve renderizar o componente Empty se não tiver games', () => {
    render(
      <Wishlist recommendedHighlight={highlightMock} recommendedGames={gamesMock} />,
    );

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();

    // Esperando o componente empty
    expect(screen.getByRole('heading', { name: /your wishlist is empty/i }));
  });
});
