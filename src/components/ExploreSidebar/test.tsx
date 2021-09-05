import { render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import { Overlay } from './styles';

import itemsMock from './mock';

import ExploreSidebar from '.';
import { css } from 'styled-components';

const props = {
  items: itemsMock,
};

describe('<ExploreSidebar />', () => {
  it('vai renderizar os heading', () => {
    render(<ExploreSidebar {...props} onFilter={jest.fn} />);

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sort by/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /platforms/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument();
  });

  it('vai renderizar os inputs', () => {
    render(<ExploreSidebar {...props} onFilter={jest.fn} />);
    expect(screen.getByRole('checkbox', { name: /under \$50/i })).toBeInTheDocument();

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeInTheDocument();
  });

  it('vai renderizar o botao', () => {
    render(<ExploreSidebar {...props} onFilter={jest.fn} />);

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
  });

  it('vai ter valores iniciais que vao estar marcados', () => {
    render(
      <ExploreSidebar
        {...props}
        onFilter={jest.fn}
        initialValues={{
          platforms: ['windows'],
          sort_by: 'low-to-high',
        }}
      />,
    );

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked();

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked();
  });

  it('vai retornar os valores selecionados no onFilter', () => {
    const onFilter = jest.fn();

    render(<ExploreSidebar {...props} onFilter={onFilter} />);

    userEvent.click(screen.getByLabelText(/windows/i));
    userEvent.click(screen.getByLabelText(/linux/i));
    userEvent.click(screen.getByLabelText(/low to high/i));

    // por conta dos initialValues ele ja vai filtrar + 3 cliques
    expect(onFilter).toHaveBeenCalledTimes(4);

    expect(onFilter).toBeCalledWith({
      platforms: ['windows', 'linux'],
      sort_by: 'low-to-high',
    });
  });

  it('vai alternar entre as opões de radio', () => {
    const onFilter = jest.fn();

    render(<ExploreSidebar items={itemsMock} onFilter={onFilter} />);

    userEvent.click(screen.getByLabelText(/low to high/i));
    userEvent.click(screen.getByLabelText(/high to low/i));

    expect(onFilter).toBeCalledWith({ sort_by: 'high-to-low' });
  });

  it('should open/close sidebar when filtering on mobile ', () => {
    const { container } = render(<ExploreSidebar items={itemsMock} onFilter={jest.fn} />);

    const variant = {
      media: '(max-width:768px)',
      modifier: String(css`
        ${Overlay}
      `),
    };

    const Element = container.firstChild;

    expect(Element).not.toHaveStyleRule('opacity', '1', variant);

    userEvent.click(screen.getByLabelText(/open filters/));

    expect(Element).toHaveStyleRule('opacity', '1', variant);

    userEvent.click(screen.getByLabelText(/close filters/));

    expect(Element).not.toHaveStyleRule('opacity', '1', variant);

    userEvent.click(screen.getByLabelText(/open filters/));

    userEvent.click(screen.getByRole('button', { name: /filter/i }));
  });
});
