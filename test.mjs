import { deepStrictEqual, throws } from 'assert';
import { learn } from './perceptron';

const testLearn = () => {
  const examples = [
    [1, 1, 1],
    [1, 1, -1],
    [1, -1, 1],
    [1, -1, -1],
  ];

  const ans = [1, -1, -1, -1];
  const weight = learn(examples, ans);
  deepStrictEqual(weight, [-1, 1, 1]);

  throws(() => learn([], []));
};

testLearn();
