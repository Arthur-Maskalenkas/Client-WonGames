import { parseQueryStringToFilter, parseQueryStringToWhere } from '.';

import { ItemProps } from 'components/ExploreSidebar';

const filterItems: Pick<ItemProps, 'type' | 'name'>[] = [
  { name: 'price_lte', type: 'radio' },
  { name: 'platforms', type: 'checkbox' },
  { name: 'developers', type: 'checkbox' },
  { name: 'sort', type: 'radio' },
];

const queryString = {
  price_lte: 100,
  platforms: ['windows', 'linux'],
  developers: 'Rockstar Games',
  sort: 'price:asc',
};

// Vai retornar para o Graphql
describe('parseQueryStringToWhere()', () => {
  it('vai receber a queryString e vai formatar para o "where"', () => {
    const parsedQuery = parseQueryStringToWhere({ queryString, filterItems });

    expect(parsedQuery).toStrictEqual({
      price_lte: 100,
      platforms: { name_contains: ['windows', 'linux'] },
      developers: { name_contains: 'Rockstar Games' },
    });
  });
});

// Vai retornar para a exploresidebar para deixar os campos preenchidos
describe('parseQueryStringToFilter()', () => {
  it('vai receber a queryString e vai filtrar o valor formatado ', () => {
    const parsedQuery = parseQueryStringToFilter({ queryString, filterItems });

    expect(parsedQuery).toStrictEqual({
      price_lte: 100,
      platforms: ['windows', 'linux'],
      developers: ['Rockstar Games'],
      sort: 'price:asc',
    });
  });
});
