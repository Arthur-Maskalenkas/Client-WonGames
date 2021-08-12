import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import itemsMock from './mock';

import ExploreSidebar from '.';
import userEvent from '@testing-library/user-event';

const props = {
  items: itemsMock,
};

describe('<ExploreSidebar />', () => {
  it('vai renderizar os heading', () => {
    renderWithTheme(<ExploreSidebar {...props} onFilter={jest.fn} />);

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sort by/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /system/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument();
  });

  it('vai renderizar os inputs', () => {
    renderWithTheme(<ExploreSidebar {...props} onFilter={jest.fn} />);
    expect(
      screen.getByRole('checkbox', { name: /under \$50/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('radio', { name: /low to high/i }),
    ).toBeInTheDocument();
  });

  it('vai renderizar o botao', () => {
    renderWithTheme(<ExploreSidebar {...props} onFilter={jest.fn} />);

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
  });

  it('vai ter valores iniciais que vao estar marcados', () => {
    renderWithTheme(
      <ExploreSidebar
        {...props}
        onFilter={jest.fn}
        initialValues={{ windows: true, sort_by: 'low-to-high' }}
      />,
    );

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked();

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked();
  });

  it('vai retornar os valores selecionados no onFilter', () => {
    const onFilter = jest.fn();

    renderWithTheme(<ExploreSidebar {...props} onFilter={onFilter} />);

    userEvent.click(screen.getByLabelText(/windows/i));
    userEvent.click(screen.getByLabelText(/low to high/i));

    userEvent.click(screen.getByRole('button', { name: /filter/i }));

    expect(onFilter).toBeCalledWith({ windows: true, sort_by: 'low-to-high' });
  });

  it('vai alternar entre as opões de radio', () => {
    const onFilter = jest.fn();

    renderWithTheme(<ExploreSidebar items={itemsMock} onFilter={onFilter} />);

    userEvent.click(screen.getByLabelText(/low to high/i));
    userEvent.click(screen.getByLabelText(/high to low/i));

    userEvent.click(screen.getByRole('button', { name: /filter/i }));

    expect(onFilter).toBeCalledWith({ sort_by: 'high-to-low' });
  });
});
