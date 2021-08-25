import Base from 'templates/Base';

import GameInfo, { GameInfoProps } from 'components/GameInfo';
import Gallery, { GalleryImageProps } from 'components/Gallery';
import GameDetails, { GameDetailsProps } from 'components/GameDetails';
import TextContent from 'components/TextContent';
import Showcase from 'components/ShowCase';
import { Divider } from 'components/Divider';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';

import * as S from './styles';

export type GameTemplateProps = {
  cover: string;
  gameInfo: GameInfoProps;
  gallery?: GalleryImageProps[];
  description: string;
  details: GameDetailsProps;
  recommendedTitle?: string;
  upcomingTitle: string;
  upcomingHighlight: HighlightProps;
  upcomingGames: GameCardProps[];
  recommendedGames: GameCardProps[];
};

const Game = ({
  cover,
  gameInfo,
  gallery,
  description,
  details,
  recommendedTitle,
  upcomingTitle,
  upcomingHighlight,
  upcomingGames,
  recommendedGames,
}: GameTemplateProps) => (
  <Base>
    {/* Imagem la em cima */}
    <S.Cover src={cover} role="image" aria-label="cover" />

    {/* Conteudo */}
    <S.Main>
      <S.SectionGameInfo>
        <GameInfo {...gameInfo} />
      </S.SectionGameInfo>

      <S.SectionGallery>
        {!!gallery && <Gallery items={gallery} />}
      </S.SectionGallery>

      <S.SectionDescription>
        <TextContent title="Description" content={description} />
      </S.SectionDescription>

      <S.SectionGameDetails>
        <GameDetails {...details} />
        <Divider />
      </S.SectionGameDetails>

      <Showcase
        title={upcomingTitle || 'upcoming'}
        games={upcomingGames}
        highlight={upcomingHighlight}
      />

      <Showcase
        title={recommendedTitle || 'You may like these games'}
        games={recommendedGames}
      />
    </S.Main>
  </Base>
);

export default Game;
