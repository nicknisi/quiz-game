import { Player as ContestantType } from '../types';
import { Player } from './Player';
import classnames from 'classnames';

export interface PlayersProps {
  players: ContestantType[];
  horizontal?: boolean;
}

export const Players = ({ players, horizontal }: PlayersProps) => (
  <div className={classnames('flex items-center', horizontal ? 'flex-row' : 'flex-col')}>
    {players.map((contestant) => (
      <Player large={horizontal} {...contestant} key={contestant.name} />
    ))}
  </div>
);
