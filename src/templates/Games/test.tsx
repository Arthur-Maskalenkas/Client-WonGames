import { renderWithTheme } from 'utils/tests/helpers';
import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/react';

import { fetchMoreMock, gamesMock } from './mocks';
import filterItemsMock from 'components/ExploreSidebar/mock';

import Games from '.';
import userEvent from '@testing-library/user-event';
import apolloCache from 'utils/apolloCache';

// get -> tem certeza do elemento
// query -> Não tem o elemento
// find -> processos assincronos

// Sempre passar o typename
jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  },
}));

jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock ExploreSidebar">{children}</div>;
  },
}));

describe('<Games />', () => {
  it('vai renderizar o loading quando o template for carregado', () => {
    renderWithTheme(
      <MockedProvider mocks={[]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>,
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  // Tem que ser igualzinho ao template
  // const { data, loading, fetchMore } = useQueryGames({
  //   variables: { limit: 15 },
  // });

  it('vai renderizar as sessões', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>,
    );

    // Vai iniciar sem dado
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // Quando ter dado vai testar os elementos
    expect(
      await screen.findByTestId('Mock ExploreSidebar'),
    ).toBeInTheDocument();

    expect(await screen.findByText(/sample game/i)).toBeInTheDocument();

    expect(
      await screen.getByRole('button', { name: /show more/i }),
    ).toBeInTheDocument();
  });

  // O apollo intercepta apenas uma vez a query, e depois caso você tente a mesma query ele vai quebrar falando que você ja usou o provider uma vez. Todas as querys que eu quiser mokar, eu vou ter que passar na lista de mocks
  it('vai renderizar mais jogos quando o botao mostrar mais for clicado', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>,
    );

    expect(await screen.findByText(/sample game/i)).toBeInTheDocument();

    userEvent.click(await screen.getByRole('button', { name: /show more/i }));

    expect(await screen.findByText(/fetch more game/i)).toBeInTheDocument();
  });
});
