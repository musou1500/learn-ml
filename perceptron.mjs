import math from 'mathjs';

const getRandIdx = examples =>
  Math.floor(Math.random() * examples.length);

const isCorrect = (s, ans, idx) =>
  s > 0 && ans[idx] > 0 || s < 0 && ans[idx] < 0;

export const learn = (examples, ans) => {
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
      count = examples
        .map(e => math.multiply(weight, e))
        .map((s, i) => isCorrect(s, ans, i) ? 1 : 0)
        .reduce((prev, cur) => prev + cur);

      if (count > pocket.count) {
        pocket.count = count;
        pocket.run = run;
        pocket.weight = weight;
        if (count === examples.length) {
          break;
        }
      }
    } else {
      run = 0;
      weight = math.add(weight, math.multiply(ans[randIdx], example));
    }
  }

  return pocket.weight;
};
