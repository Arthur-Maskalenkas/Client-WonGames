import 'match-media-mock';
import { render, screen } from 'utils/test-utils';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import itemsMock from 'components/CartList/mock';
import cardsMock from 'components/PaymentOptions/mock';

import Cart from '.';

const props = {
  recommendedGames: gamesMock.slice(0, 5),
  recommendedHighlight: highlightMock,
  cart: { items: itemsMock, total: '$ 430,00' },
  payment: { cards: cardsMock },
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

jest.mock('components/CartList', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Cart" />;
  },
}));

jest.mock('components/PaymentOptions', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock PaymentOptions" />;
  },
}));

jest.mock('components/Empty', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Empty" />;
  },
}));

describe('<Cart />', () => {
  it('should render sections', () => {
    render(<Cart {...props} />);

    expect(screen.getByRole('heading', { name: /my cart/i })).toBeInTheDocument();
    expect(screen.getByTestId('Mock Cart')).toBeInTheDocument();
    expect(screen.getByTestId('Mock PaymentOptions')).toBeInTheDocument();
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();
    expect(screen.queryByTestId('Mock Empty')).not.toBeInTheDocument();
  });

  it('vai renderizar o componente empty se não tiver items no carrinho de compras', () => {
    const cartProps = { items: [], total: '$ 430,00' };

    render(<Cart {...props} cart={cartProps} />);

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument();
  });
});
