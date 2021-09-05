import { render, screen } from 'utils/test-utils';

import CartList from '.';
import mockItems from './mock';

describe('<CartList />', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<CartList items={mockItems} total="321" />);

    expect(screen.getAllByRole('heading')).toHaveLength(2);
    expect(screen.getByText(/321/i)).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('vai renderizar o botão', () => {
    render(<CartList items={mockItems} total="321" hasButton />);

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument();
  });

  it('vai redenrizar empty se não tiver jogos', () => {
    render(<CartList />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
  });
});
