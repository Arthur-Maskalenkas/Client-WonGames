//https://www.apollographql.com/docs/react/pagination/core-api/
import { useRouter } from 'next/router';
import {
  parseQueryStringToFilter,
  parseQueryStringToWhere,
} from 'utils/filter';
import { useQueryGames } from 'graphql/queries/games';

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import GameCard from 'components/GameCard';
import { Grid } from 'components/Grid';
import Base from 'templates/Base';

import * as S from './styles';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown';

import { ParsedUrlQueryInput } from 'querystring';
import Empty from 'components/Empty';

export type GamesTemplateProps = {
  filterItems: ItemProps[];
};

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  // push muda a url
  const { push, query } = useRouter();

  // O data ja existe graças ao next
  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({
        queryString: query,
        filterItems: filterItems,
      }),
      sort: query.sort as string | null,
    },
  });

  if (!data) return <p>loading...</p>;

  const { games, gamesConnection } = data;

  const hasMoreGames = games.length < (gamesConnection?.values?.length || 0);

  // Fazendo com que a pagina não vá para o topo quando atualizada
  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({ pathname: '/games', query: items }, undefined, { scroll: false });
    return;
  };

  // Vai adicionar nas policy para usar o fetchMore cacheando as informações
  // https://www.apollographql.com/docs/react/pagination/core-api/
  const handleShowMore = () => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } });
  };

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems,
          })}
          items={filterItems}
          onFilter={handleFilter}
        />

        {/* O loading nunca vai aparecer. Nunca vai ter um estado de loading no inicio ja que toda vez que bater na pagina ja vai ter dado graças ao /pages/games */}
        <section>
          {data?.games.length ? (
            <>
              <Grid>
                {data?.games.map((game) => (
                  <GameCard
                    key={game.slug}
                    title={game.name}
                    developer={game.developers[0].name}
                    slug={game.slug}
                    img={`${game.cover?.url}`}
                    price={game.price}
                  />
                ))}
              </Grid>
            </>
          ) : (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
              hasLink
            />
          )}
          {hasMoreGames && (
            <S.ShowMore>
              {loading ? (
                <S.ShowMoreLoading
                  src="/img/dots.svg"
                  alt="Loading more games..."
                />
              ) : (
                <S.ShowMoreButton role="button" onClick={handleShowMore}>
                  <p>Show More</p>
                  <ArrowDown size={35} />
                </S.ShowMoreButton>
              )}
            </S.ShowMore>
          )}
        </section>
      </S.Main>
    </Base>
  );
};

export default GamesTemplate;
