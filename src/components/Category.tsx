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
  'bg-game-blue',
  'text-shadow-lg',
  'shadow-black',
];

export const Category = ({ onClick, category: { name, questions } }: CategoryProps) => {
  return (
    <div className="grid flex-col">
      <div className={classnames(['text-center', 'font-bold', 'text-game-white'], boxClasses)}>{name}</div>
      {questions.map((question) => (
        <div key={question.answer} className={classnames(boxClasses)} onClick={() => onClick(question)}>
          {!question.used && (
            <div className={classnames(['text-game-yellow', 'cursor-pointer', 'font-bold', 'text-3xl', 'mt-0.5'])}>
              {question.value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
