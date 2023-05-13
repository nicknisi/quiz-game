import { Player } from './components/Player';
import { Players } from './components/Players';
import { Round } from './components/Round';
import { useAudioControls } from './hooks/audio';
import { useGameControls, useGameData, useGameStatus, useGameView, useGameStyle } from './hooks/game';
import classnames from 'classnames';
import { useEffect, useRef } from 'react';

function App() {
  const loaded = useGameStatus();
  const { currentRound, name: gameName, contestants, round, numRounds, setRound, winner } = useGameData();
  const gameStyle = useGameStyle();
  useGameControls();
  useAudioControls();
  const view = useGameView();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mainRef.current;

    if (!element) {
      return;
    }

    const id = (element.id ||= 'root');

    const pseudoStyles = `
      content: "";
      height: 80vw;
      width: 80vw;
      opacity: ${gameStyle.abstractOpacity};
      position: fixed;
      right: -40vw;
      top: -40vw;
      pointer-events: none;
      z-index: -1;
      background-image: url(${gameStyle?.abstractUrl});
    `;

    const rule = `#${id}:before { ${pseudoStyles} }`;

    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = rule;

    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [gameStyle, mainRef]);

  return (
    <>
      {loaded ? (
        <div
          ref={mainRef}
          className={classnames('flex', 'flex-col', 'items-center', 'justify-center', 'relative', 'py-3', 'px-5')}
        >
          {' '}
          <div
            className={classnames(
              'flex',
              'items-end',
              'w-full',
              'mb-[2.5vw]',
              gameStyle?.lightMode ? 'text-black' : 'text-white',
            )}
          >
            {!gameStyle.logoUrl ? (
              <h1
                className={classnames(
                  'max-w-[526px]',
                  'flex-grow-0',
                  'flex-shrink-0',
                  'basis-[526px]',
                  'm-0',
                  'mr-3',
                  'w-[526px]',
                  'text-4xl',
                )}
              >
                {gameName}
              </h1>
            ) : (
              <img alt={gameName} src={gameStyle.logoUrl} className={classnames('max-w-[526px]', 'h-auto')} />
            )}
            {!winner && (
              <button
                className={classnames('font-jsdanger', 'bg-none', 'border-none', 'text-left', 'text-3xl')}
                disabled={currentRound >= numRounds - 1}
                onClick={() => {
                  setRound();
                }}
              >
                <div className="text-2xl">Round {String(currentRound + 1)}</div>
                <div>{round?.name}</div>
              </button>
            )}
          </div>
          {winner ? (
            <div
              key="winner-view"
              className={classnames('flex', 'flex-col', 'text-center', 'font-jsdanger')}
              style={{ zoom: '300%', color: gameStyle.secondaryColor }}
            >
              <h1>Winner</h1>
              <Player hideControls {...winner} />
            </div>
          ) : view === 'contestants' ? (
            <Players key="contestants-view" horizontal players={contestants} />
          ) : (
            <div key="game-view" className={classnames('flex', 'items-center', 'justify-evenly', 'w-full')}>
              <Round final={round.format !== 'standard'} round={round} />
              <Players players={contestants} />
            </div>
          )}
        </div>
      ) : (
        <>LOADING</>
      )}
    </>
  );
}

export default App;
