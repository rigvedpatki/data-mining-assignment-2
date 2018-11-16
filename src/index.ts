import * as fs from 'fs';
import * as path from 'path';
import { ItemCount } from './types';
import config from './config';

console.time('data-mining-assignment-2');

const DATA_PATH = path.resolve(__dirname, '../data/T10I4D100K.dat');

const singleItemCountWithoutSupport = path.resolve(
  __dirname,
  '../output/single-item-count-without-support.txt'
);

const singleItemCountWithSupport = path.resolve(
  __dirname,
  '../output/single-item-count-with-support.txt'
);

const doubleItemCountWithoutSupport = path.resolve(
  __dirname,
  '../output/double-item-count-without-support.txt'
);

const doubleItemCountWithSupport = path.resolve(
  __dirname,
  '../output/double-item-count-with-support.txt'
);

const tripleItemCountWithoutSupport = path.resolve(
  __dirname,
  '../output/triple-item-count-without-support.txt'
);

const tripleItemCountWithSupport = path.resolve(
  __dirname,
  '../output/triple-item-count-with-support.txt'
);

const confidenceDouble = path.resolve(
  __dirname,
  '../output/confidenceDouble.txt'
);
const confidenccTriple = path.resolve(
  __dirname,
  '../output/confidenceTriple.txt'
);

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
  singleItemCountWithoutSupport,
  JSON.stringify(singleItemCount, null, 2)
);

for (let item in singleItemCount) {
  if (singleItemCount[item] < config.SUPPORT) {
    delete singleItemCount[item];
  }
}

fs.writeFileSync(
  singleItemCountWithSupport,
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
  doubleItemCountWithoutSupport,
  JSON.stringify(doubleItemCount, null, 1)
);

for (let itemPair in doubleItemCount) {
  if (doubleItemCount[itemPair] < config.SUPPORT) {
    delete doubleItemCount[itemPair];
  }
}
fs.writeFileSync(
  doubleItemCountWithSupport,
  JSON.stringify(doubleItemCount, null, 1)
);

let confidenceDoubleString = '';
// Confidence
for (let doubleItem in doubleItemCount) {
  let [itemA, itemB] = doubleItem.split(',');
  let confItemAItemB = doubleItemCount[doubleItem] / singleItemCount[itemA];
  let confItemBItemA = doubleItemCount[doubleItem] / singleItemCount[itemB];
  confidenceDoubleString =
    confidenceDoubleString +
    `\nConfidence (${itemA} -> ${itemB}) = ${confItemAItemB} \nConfidence (${itemB} -> ${itemA}) = ${confItemBItemA}`;
}

fs.writeFileSync(confidenceDouble, confidenceDoubleString);

let tripleItemCount: ItemCount = {};
for (let basket of baskets) {
  for (let itemA in singleItemCount) {
    for (let itemB in singleItemCount) {
      for (let itemC in singleItemCount) {
        if (
          itemA !== itemB &&
          itemB !== itemC &&
          parseInt(itemA) > parseInt(itemB) &&
          parseInt(itemB) > parseInt(itemC)
        ) {
          if (
            basket.data.includes(parseInt(itemA)) &&
            basket.data.includes(parseInt(itemB)) &&
            basket.data.includes(parseInt(itemC))
          ) {
            let concatItem = `${itemA},${itemB},${itemC}`;
            if (concatItem in tripleItemCount) {
              tripleItemCount[concatItem] = tripleItemCount[concatItem] + 1;
            } else {
              tripleItemCount[concatItem] = 1;
            }
          }
        }
      }
    }
  }
}

fs.writeFileSync(
  tripleItemCountWithoutSupport,
  JSON.stringify(tripleItemCount, null, 1)
);

for (let tripleItem in tripleItemCount) {
  if (tripleItemCount[tripleItem] < config.SUPPORT) {
    delete tripleItemCount[tripleItem];
  }
}

fs.writeFileSync(
  tripleItemCountWithSupport,
  JSON.stringify(tripleItemCount, null, 1)
);

let confidenceTripleString = '';
// Confidence
for (let tripleItem in tripleItemCount) {
  let [itemA, itemB, itemC] = tripleItem.split(',');
  let confABToC =
    tripleItemCount[`${itemA},${itemB},${itemC}`] / singleItemCount[`${itemC}`];
  let confBCToA =
    tripleItemCount[`${itemA},${itemB},${itemC}`] / singleItemCount[`${itemA}`];
  let confCAToB =
    tripleItemCount[`${itemA},${itemB},${itemC}`] / singleItemCount[`${itemB}`];

  confidenceTripleString =
    confidenceTripleString +
    `\nConfidence (${itemA},${itemB} -> ${itemC}) = ${confABToC} \nConfidence (${itemB},${itemC} -> ${itemA}) = ${confBCToA} \nConfidence (${itemC},${itemA} -> ${itemB}) = ${confCAToB}`;
}

fs.writeFileSync(confidenccTriple, confidenceTripleString);

console.timeEnd('data-mining-assignment-2');
