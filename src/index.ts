import * as fs from 'fs';
import * as path from 'path';
import { ItemCount } from './types';
import config from './config';

console.time('data-mining-assignment-2');

const DATA_PATH = path.resolve(__dirname, '../data/T10I4D100K.dat');

const data = fs.readFileSync(DATA_PATH, 'utf-8');

const dataBaskets = data.split('\n');

const baskets = dataBaskets.map((data, i) => ({
  basket: i,
  data: data
    .split(' ')
    .slice(0, -1)
    .map(item => parseInt(item))
}));

const singleItemCount: ItemCount = {};

for (let basket of baskets) {
  for (let item of basket.data) {
    if (item in singleItemCount) {
      singleItemCount[item] = singleItemCount[item] + 1;
    } else {
      singleItemCount[item] = 1;
    }
  }
}

fs.writeFileSync(
  'single-item-count-without-support.txt',
  JSON.stringify(singleItemCount, null, 2)
);

for (let item in singleItemCount) {
  if (singleItemCount[item] < config.SUPPORT) {
    delete singleItemCount[item];
  }
}

fs.writeFileSync(
  'single-item-count-with-support.txt',
  JSON.stringify(singleItemCount, null, 2)
);

const doubleItemCount: ItemCount = {};

for (let basket of baskets) {
  for (let itemA in singleItemCount) {
    for (let itemB in singleItemCount) {
      if (itemA !== itemB && parseInt(itemA) > parseInt(itemB)) {
        if (
          basket.data.includes(parseInt(itemA)) &&
          basket.data.includes(parseInt(itemB))
        ) {
          if (`${itemA},${itemB}` in doubleItemCount) {
            doubleItemCount[`${itemA},${itemB}`] =
              doubleItemCount[`${itemA},${itemB}`] + 1;
          } else {
            doubleItemCount[`${itemA},${itemB}`] = 1;
          }
        }
      }
    }
  }
}
fs.writeFileSync(
  'double-item-count-without-support.txt',
  JSON.stringify(doubleItemCount, null, 1)
);

for (let itemPair in doubleItemCount) {
  if (doubleItemCount[itemPair] < config.SUPPORT) {
    delete doubleItemCount[itemPair];
  }
}
fs.writeFileSync(
  'double-item-count-with-support.txt',
  JSON.stringify(doubleItemCount, null, 1)
);
console.timeEnd('data-mining-assignment-2');
