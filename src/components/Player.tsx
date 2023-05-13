import { useCallback } from 'react';
import { useGameStyle, useSendEvent, useValue } from '../hooks/game';
import { Player as PlayerData } from '../types';
import classnames from 'classnames';

export interface PlayerProps extends PlayerData {
  large?: boolean;
  hideControls?: boolean;
}

export const usePlayer = (player: PlayerData) => {
  const send = useSendEvent();
  const currentQuestion = useValue('currentQuestion');
  const increment = useCallback(
    (value?: number) => {
      send({ type: 'INCREMENT_SCORE', handle: player.handle, value: value ?? currentQuestion?.question.value ?? 100 });
    },
    [send, player],
  );
  const decrement = useCallback(
    (value?: number) => {
      send({ type: 'DECREMENT_SCORE', handle: player.handle, value: value ?? currentQuestion?.question.value ?? 100 });
    },
    [send, player],
  );
  return {
    increment,
    decrement,
  };
};

const actionButton = classnames(['outline-0', 'cursor-pointer', 'text-2xl']);

export function Player({ large, name, handle, avatar, score, hideControls }: PlayerProps) {
  const { increment, decrement } = usePlayer({ handle, avatar, name, score });
  const style = useGameStyle();
  return (
    <div
      className={classnames(
        'group',
        'flex',
        'w-full',
        'items-center',
        style.lightMode ? 'text-black' : 'text-white',
        'm-3',
      )}
    >
      {!hideControls && (
        <div className="flex flex-col invisible group-hover:visible">
          <button className={actionButton} onClick={() => increment()}>
            +
          </button>
          <button className={actionButton} onClick={() => decrement()}>
            -
          </button>
        </div>
      )}
      <img
        className={classnames(
          [
            'border-transparent',
            'border-2',
            'border-solid',
            'radius',
            'rounded-full',
            'h-[100px]',
            'min-w-[100px]',
            'w-auto',
            'object-cover',
            'mr-3',
            style.lightMode ? 'group-hover:border-black' : 'group-hover:border-white',
          ],
          {
            'h-[200px]': large,
          },
        )}
        src={avatar ?? `http://localhost:8888/?handle=${handle}`}
      />
      <div className="flex flex-col">
        <div className={classnames('font-jsdanger', 'text-lg', 'mb-0.5', { 'text-2xl': large })}>{name}</div>
        <div className={classnames('font-sans, font-bold text-2xl', { 'text-red-400': score < 0 })}>
          {String(score)}
        </div>
      </div>
    </div>
  );
}
