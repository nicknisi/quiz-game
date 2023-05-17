import { useGameStyle } from '../hooks/game';
import { Category, Question as QuestionData } from '../types';
import classnames from 'classnames';

export interface QuestionProps {
  question: QuestionData;
  category: Category;
  onClick?: (question?: QuestionData) => void;
  showAnswer?: boolean;
  onShowAnswer?: () => void;
  final?: boolean;
}

export function Question({
  question: { clue, answer, image, value },
  category,
  onClick,
  onShowAnswer,
  showAnswer,
  final,
}: QuestionProps) {
  const style = useGameStyle();
  return (
    <div
      className={classnames(
        'inset-0.5',
        'flex',
        'content-center',
        'flex-col',
        style.lightMode ? 'text-black' : 'text-white',
        'self-stretch',
        'text-center',
        'flex-grow',
        'basis-[600px]',
        'p-3',
        'text-shadow-lg',
        {
          absolute: !final,
        },
      )}
      onClick={() => onClick?.()}
      style={{ backgroundColor: style.secondaryColor }}
    >
      <div className="flex flex-grow justify-between">
        <div className="text-lg font-jsdanger">{category.name}</div>
        <div className="font-jsdanger text-lg">{value}</div>
      </div>
      {image && (
        <div className="flex-grow">
          <img className="h-auto max-w-[75%]" src={image} alt={clue} />
        </div>
      )}
      <div className="cursor-pointer font-jsdanger text-5xl p-2 flex-gro text-shadow-lg shadow-black">{clue}</div>
      {showAnswer ? (
        <div
          className={classnames(
            'flex-grow',
            'font-jsdanger',
            'text-3xl',
            'text-center',
            'pt-6',
            'shadow-black',
            'text-shadow-lg',
            'text-6xl',
          )}
          style={{ color: style.primaryColor }}
        >
          {answer}
        </div>
      ) : (
        <>
          <div
            className={classnames(
              'flex-grow',
              'font-jsdanger',
              'text-3xl',
              'text-center',
              'shadow-black',
              'text-shadow-lg',
              'underline',
              'pt-[1em]',
            )}
            onClick={(event) => {
              event.stopPropagation();
              onShowAnswer?.();
            }}
          >
            Show Answer
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
