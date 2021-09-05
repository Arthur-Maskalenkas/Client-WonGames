import { render, screen } from 'utils/test-utils';

import GameDetails, { GameDetailsProps } from '.';

const props: GameDetailsProps = {
  developer: 'Different Tales',
  platforms: ['windows', 'mac', 'linux'],
  releaseDate: '2020-11-21T23:00:00',
  rating: 'BR0',
  genres: ['Role-playing', 'Narrative'],
  publisher: '2K',
};

describe('<GameDetails />', () => {
  it('vai renderizar os blocos', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByRole('heading', { name: /Developer/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Release date/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Platforms/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Publisher/i })).toBeInTheDocument();
  });

  it('vai renderizar os icones das plataformas', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByRole('img', { name: /linux/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /windows/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /mac/i })).toBeInTheDocument();
  });

  it('vai renderizar a data formatada', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/nov 21, 2020/i)).toBeInTheDocument();
  });

  it('vai renderizar a classificação como 0', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/free/i)).toBeInTheDocument();
  });

  it('vai renderizar a classificação como 18+', () => {
    render(<GameDetails {...props} rating="BR18" />);

    expect(screen.getByText(/18\+/i)).toBeInTheDocument();
  });

  it('vai renderizar a lista de generos', () => {
    render(<GameDetails {...props} rating="BR18" />);

    expect(screen.getByText(/role-playing \/ narrative/i)).toBeInTheDocument();
  });

  it('should render the developer', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/Different Tales/i)).toBeInTheDocument();
  });

  it('should render the publisher', () => {
    render(<GameDetails {...props} />);

    expect(screen.getByText(/2k/i)).toBeInTheDocument();
  });
});
