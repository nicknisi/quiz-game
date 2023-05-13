import { useGameStyle } from '../hooks/game';
import { Category as CategoryData, Question } from '../types';
import classnames from 'classnames';

export interface CategoryProps {
  category: CategoryData;
  onClick: (question: Question) => void;
}

const boxClasses = [
  'flex',
  'h-[100px]',
  'justify-center',
  'items-center',
  'm-[2px]',
  'tracking-wideset',
  'py-2',
  'px-3',
  'font-sans',
  'text-shadow-lg',
  'shadow-black',
];

export const Category = ({ onClick, category: { name, questions } }: CategoryProps) => {
  const style = useGameStyle();
  return (
    <div className="grid flex-col">
      <div
        className={classnames('text-center', 'font-bold', style.lightMode ? 'text-black' : 'text-white', boxClasses)}
        style={{ backgroundColor: style.secondaryColor }}
      >
        {name}
      </div>
      {questions.map((question) => (
        <div
          key={question.answer}
          className={classnames(boxClasses)}
          onClick={() => onClick(question)}
          style={{ backgroundColor: style.secondaryColor }}
        >
          {!question.used && (
            <div
              className={classnames(['cursor-pointer', 'font-bold', 'text-3xl', 'mt-0.5'])}
              style={{ color: style.primaryColor }}
            >
              {question.value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
