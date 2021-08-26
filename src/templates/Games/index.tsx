import { useQuery } from '@apollo/client';

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar';
import GameCard, { GameCardProps } from 'components/GameCard';
import { Grid } from 'components/Grid';
import Base from 'templates/Base';

import * as S from './styles';
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown';

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES } from 'graphql/queries/games';

export type GamesTemplateProps = {
  games?: GameCardProps[];
  filterItems: ItemProps[];
};

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  // O data ja existe
  const { data, loading } = useQuery<QueryGames, QueryGamesVariables>(
    QUERY_GAMES,
    { variables: { limit: 15 } },
  );

  const handleFilter = () => {
    return;
  };

  const handleShowMore = () => {
    return;
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
