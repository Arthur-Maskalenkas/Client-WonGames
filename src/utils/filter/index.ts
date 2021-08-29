import { ItemProps } from 'components/ExploreSidebar';
import { ParsedUrlQueryInput } from 'querystring';

// QueryString = arg1=da&arg2=be
// Importa apenas o tipo do item ('checkbox','radio') e o nome ('sort_by', 'prices')
type ParseArgs = {
  queryString: ParsedUrlQueryInput;
  filterItems: Pick<ItemProps, 'type' | 'name'>[];
};

export const parseQueryStringToWhere = ({
  queryString,
  filterItems,
}: ParseArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};

  // queryString = {platforms: ['windows','linux']}
  // filterItems = {name: 'platforms', type: 'checkbox'}
  Object.keys(queryString)
    .filter((item) => item !== 'sort')
    .forEach((key) => {
      // Esta encontrando o tipo.
      const item = filterItems?.find((item) => item.name === key);
      const isCheckBox = item?.type === 'checkbox';

      // Pegando o valor e colocando dentro do objeto
      obj[key] = !isCheckBox
        ? queryString[key]
        : { name_contains: queryString[key] };
    });

  return obj;
};

export const parseQueryStringToFilter = ({
  queryString,
  filterItems,
}: ParseArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};

  // queryString = {developers: 'Rockstar games'}
  // filterItems = {name: 'developers', type: 'checkbox'}
  Object.keys(queryString).forEach((key) => {
    // Esta encontrando o tipo e definindo se é array
    const item = filterItems?.find((item) => item.name === key);
    const isCheckBox = item?.type === 'checkbox';
    const isArray = Array.isArray(queryString[key]);

    // developers: 'rockstar games'  => ['rockstar games']
    obj[key] = !isArray && isCheckBox ? [queryString[key]] : queryString[key];
  });

  return obj;
};
