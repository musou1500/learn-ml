const { deepStrictEqual, throws } = require('assert');
const math = require('mathjs');

const getRandIdx = examples =>
  Math.floor(Math.random() * examples.length);

const isCorrect = (s, ans, idx) =>
  s > 0 && ans[idx] > 0 || s < 0 && ans[idx] < 0;

const learn = (examples, ans) => {
  if (examples.length <= 0) {
    throw new RangeError('give >1 examples');
  }

  let weight = [...new Array(examples[0].length)].fill(0);
  let count = 0;
  let run = 0;
  const pocket = {
    weight: [...weight],
    count: 0,
    run: 0
  };

  let i = 0;
  const countLimit = 999;

  while(i++ < countLimit) {
    const randIdx = getRandIdx(examples);
    const example = examples[randIdx];
    const s = math.multiply(weight, example);
    if (isCorrect(s, ans, randIdx)) {
      run++;

      // 正しく分類できる数
      num = examples
        .map(e => math.multiply(weight, example))
        .map(s => isCorrect(s, ans, randIdx) ? 1 : 0)
        .reduce((prev, cur) => prev + cur, 0);
      if (num > pocket.num) {
        pocket.num = num;
        pocket.run = run;
        pocket.weight = weight;
        if (num === examples.length) {
          break;
        }
      }
    } else {
      run = 0;
      weight = math.add(weight, math.multiply(ans[randIdx], example));
    }
  }

  return weight;
};

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
