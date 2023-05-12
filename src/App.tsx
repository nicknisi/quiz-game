import { Player } from './components/Player';
import { Players } from './components/Players';
import { Round } from './components/Round';
import { useAudioControls } from './hooks/audio';
import { useGameControls, useGameData, useGameStatus, useGameView } from './hooks/game';
import classnames from 'classnames';

function App() {
  const loaded = useGameStatus();
  const {
    currentRound,
    style: gameStyle,
    name: gameName,
    contestants,
    round,
    numRounds,
    setRound,
    style,
    winner,
  } = useGameData();
  useGameControls();
  useAudioControls(style);
  const view = useGameView();

  return (
    <>
      {loaded ? (
        <div
          className={classnames(
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'relative',
            'py-3',
            'px-5',
            'before:content-[""]',
            'before:h-[80vw]',
            'before:w-[80vw]',
            'before:opacity-20',
            'before:fixed',
            'before:-right-[40vw]',
            'before:-top-[40vw]',
            'before:-z-[1]',
            'before:pointer-events-none',
            {
              'before:bg-jsdanger-abstract': style === 'jsDanger',
              'before:bg-gopanic-abstract': style === 'goPanic',
            },
          )}
        >
          {' '}
          <div className={classnames('flex', 'items-end', 'text-white', 'w-full', 'mb-[2.5vw]')}>
            <h1
              className={classnames(
                'bg-full',
                'flex-grow-0',
                'flex-shrink-0',
                'basis-[526px]',
                'm-0',
                'mr-3',
                'w-[526px]',
                '-indent-[9999px]',
                'bg-center',
                'bg-no-repeat',
                {
                  'bg-jsdanger-logo': gameStyle === 'jsDanger',
                  'bg-gopanic-logo': gameStyle === 'goPanic',
                  'h-[130px]': gameStyle === 'goPanic',
                  'h-[100px]': gameStyle === 'jsDanger',
                },
              )}
            >
              {gameName}
            </h1>
            {!winner && (
              <button
                className={classnames(
                  'font-jsdanger',
                  'bg-none',
                  'border-none',
                  'text-game-yellow',
                  'text-left',
                  'text-3xl',
                )}
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
              className={classnames('flex', 'flex-col', 'text-center', 'font-jsdanger', 'text-game-yellow')}
              style={{ zoom: '300%' }}
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
