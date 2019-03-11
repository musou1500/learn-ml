[![CircleCI](https://circleci.com/gh/musou1500/learn-ml.svg?style=svg)](https://circleci.com/gh/musou1500/learn-ml)

# learn-ml

learn machine-learning using [mathjs](https://mathjs.org/)

```js
import { learn } from './perceptron';

const examples = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
];

const classifications = [1, -1, -1, -1];

learn(examples, classifications); // [-1, 1, 1];
```
