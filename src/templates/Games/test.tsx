import { renderWithTheme } from 'utils/tests/helpers';
import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import filterItemsMock from 'components/ExploreSidebar/mock';

import Games from '.';
import { QUERY_GAMES } from 'graphql/queries/games';

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
      <MockedProvider
        mocks={[
          {
            request: {
              query: QUERY_GAMES,
              variables: { limit: 15 },
            },
            result: {
              data: {
                games: [
                  {
                    name: 'Mundaun',
                    slug: 'mundaun',
                    cover: {
                      url: 'https://res.cloudinary.com/won-games/image/upload/v1621522980/mundaun_9164cd782e.jpg',
                    },
                    developers: [{ name: 'Hidden Fields' }],
                    price: 28.49,
                    __typename: 'Game',
                  },
                ],
              },
            },
          },
        ]}
        addTypename={false}
      >
        <Games filterItems={filterItemsMock} />
      </MockedProvider>,
    );

    // Vai iniciar sem dado
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // get -> tem certeza do elemento
    // query -> Não tem o elemento
    // find -> processos assincronos

    // Quando ter dado vai testar os elementos
    expect(
      await screen.findByTestId('Mock ExploreSidebar'),
    ).toBeInTheDocument();

    expect(await screen.findByText(/mundaun/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /show more/i }),
    ).toBeInTheDocument();
  });
});
