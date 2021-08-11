import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import itemsMock from './mock';

import ExploreSidebar from '.';

const props = {
  items: itemsMock,
};

describe('<ExploreSidebar />', () => {
  it('vai renderizar os heading', () => {
    renderWithTheme(<ExploreSidebar {...props} />);

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
    renderWithTheme(<ExploreSidebar {...props} />);
    expect(
      screen.getByRole('checkbox', { name: /under \$50/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('radio', { name: /low to high/i }),
    ).toBeInTheDocument();
  });

  it('vai ter valores iniciais que vao estar marcados', () => {
    renderWithTheme(
      <ExploreSidebar
        {...props}
        initialValues={{ windows: true, sort_by: 'low-to-high' }}
      />,
    );

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked();

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked();
  });
});
