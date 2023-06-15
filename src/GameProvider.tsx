import { useInterpret } from '@xstate/react';
import { createContext, ReactNode } from 'react';
import { InterpreterFrom } from 'xstate';
import { gameMachine } from './machines/gameMachine';

export interface GameProviderProps {
  url?: string;
  children?: ReactNode;
}

export const GameContext = createContext<null | { service: InterpreterFrom<typeof gameMachine> }>(null);

export function GameProvider({ url, children }: GameProviderProps) {
  const queryParams = new URLSearchParams(window.location.search);
  const gameUrl = url ?? queryParams.get('game') ?? '';
  const service = useInterpret(gameMachine.withContext({ ...gameMachine.context, url: gameUrl }), { devTools: true });
  return <GameContext.Provider value={{ service }}>{children}</GameContext.Provider>;
}
