import { QuizData } from '../../types';
import { bkQuizzes } from './bkQuizzes';
import { tikQuizzes } from './tikQuizzes';
import { skQuizzes } from './skQuizzes';
import { jkiQuizzes } from './jkiQuizzes';
import { adQuizzes } from './adQuizzes';
import { apQuizzes } from './apQuizzes';
import { dsiQuizzes } from './dsiQuizzes';
import { plbQuizzes } from './plbQuizzes';

export const allQuizzesData: Record<string, QuizData> = {
  ...bkQuizzes,
  ...tikQuizzes,
  ...skQuizzes,
  ...jkiQuizzes,
  ...adQuizzes,
  ...apQuizzes,
  ...dsiQuizzes,
  ...plbQuizzes,
};

export {
  bkQuizzes,
  tikQuizzes,
  skQuizzes,
  jkiQuizzes,
  adQuizzes,
  apQuizzes,
  dsiQuizzes,
  plbQuizzes,
};
