import math from 'mathjs';

const getRandIdx = examples =>
  Math.floor(Math.random() * examples.length);

const pickRand = (examples, classifications) => {
  const randIdx = getRandIdx(examples);
  return {
    example: examples[randIdx],
    classification: classifications[randIdx]
  };
};

const isCorrect = (s, classification) =>
  s > 0 && classification > 0 || s < 0 && classification < 0;

const createIterWithPocket = weightLen => {
  const iteration = {
    weight: getInitWeight(weightLen),
    okNum: 0,
    run: 0
  };

  const pocket = {
    weight: getInitWeight(weightLen),
    okNum: 0,
    run: 0
  };

  return { iteration, pocket };
};

const getInitWeight = len => [...new Array(len)].fill(0);

const testWeight = (weight, example, classification) =>
  isCorrect(math.multiply(weight, example), classification);

export const learn = (examples, classifications, maxIter = 999) => {
  if (examples.length <= 0) {
    throw new RangeError('give >0 examples');
  }

  if (examples.length !== classifications.length) {
    throw new RangeError('examples must have same length as classification');
  }

  const { iteration, pocket } = createIterWithPocket(examples[0].length);

  let i = 0;
  while(i++ < maxIter) {
    const { example, classification } = pickRand(examples, classifications);
    if (testWeight(iteration.weight, example, classification)) {
      iteration.run++;

      // 正しく分類できる数
      iteration.okNum = examples
        .map((e, i) => testWeight(iteration.weight, e, classifications[i]) ? 1 : 0)
        .reduce((prev, cur) => prev + cur, 0);

      if (iteration.okNum > pocket.okNum) {
        pocket.okNum = iteration.okNum;
        pocket.run = iteration.run;
        pocket.weight = iteration.weight;
        if (iteration.okNum === examples.length) {
          break;
        }
      }
    } else {
      iteration.okNum = 0;
      iteration.weight = math.add(iteration.weight, math.multiply(classification, example));
    }
  }

  return pocket.weight;
};
