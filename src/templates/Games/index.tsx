//https://www.apollographql.com/docs/react/pagination/core-api/

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import GameCard, { GameCardProps } from 'components/GameCard';
import { Grid } from 'components/Grid';
import Base from 'templates/Base';

import * as S from './styles';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown';

import { useQueryGames } from 'graphql/queries/games';

export type GamesTemplateProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  // O data ja existe graças ao next
  const { data, loading, fetchMore } = useQueryGames({
    variables: { limit: 15 },
  });

  const handleFilter = () => {
    return;
  };

  // https://www.apollographql.com/docs/react/pagination/core-api/
  const handleShowMore = () => {
    fetchMore({ variables: { limit: 15, start: data?.games.length } });
  };

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        {/* O loading nunca vai aparecer. Nunca vai ter um estado de loading no inicio ja que toda vez que bater na pagina ja vai ter dado graças ao /pages/games */}
        {loading ? (
          <h1 style={{ color: 'white' }}>loading...</h1>
        ) : (
          <section>
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

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>Show More</p>
              <ArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  );
};

export default GamesTemplate;
