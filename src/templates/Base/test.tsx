import { render, screen } from 'utils/test-utils';

import Base from '.';

// mokando um metodo
// Quer que retornele aquele array com objeto session sendo null
jest.mock('next-auth/client', () => ({
  useSession: jest.fn(() => {
    return [{ session: null }];
  }),
}));

jest.mock('components/Menu', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Menu"></div>;
    },
  };
});

jest.mock('components/Footer', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Footer"></div>;
    },
  };
});

describe('<Base />', () => {
  it('Verifica a renderização do menu, footer e filho', () => {
    render(
      <Base>
        <h1>Heading</h1>
      </Base>,
    );

    expect(screen.getByTestId('Mock Menu')).toBeInTheDocument();
    expect(screen.getByTestId('Mock Footer')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /heading/i })).toBeInTheDocument();
  });
});
