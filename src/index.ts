import * as fs from 'fs';
import getSalesTransactions from './get-sales-transactions';
import getSingleItemCount from './get-single-item-count';
import getDoubleItemCount from './get-double-item-count';
import getItemCountWithSupport from './get-item-count-with-support';
import getDoubleConfidence from './get-double-confidence';
import getTripleItemCount from './get-triple-item-count';
import getTripleConfidence from './get-triple-confidence';
import {
  dataPath,
  singleItemCountWithSupportPath,
  singleItemCountWithoutSupportPath,
  doubleItemCountWithSupportPath,
  doubleItemCountWithoutSupportPath,
  confidenceDoublePath,
  tripleItemCountWithoutSupportPath,
  tripleItemCountWithSupportPath,
  confidenceTriplePath
} from './get-file-paths';

console.time('data-mining-assignment-2');

const data = fs.readFileSync(dataPath, 'utf-8');

const baskets = getSalesTransactions(data);

const singleItemCount = getSingleItemCount(baskets);

fs.writeFileSync(
  singleItemCountWithoutSupportPath,
  JSON.stringify(singleItemCount, null, 2)
);

const singleItemCountWithSupport = getItemCountWithSupport(
  singleItemCount,
  baskets
);

fs.writeFileSync(
  singleItemCountWithSupportPath,
  JSON.stringify(singleItemCountWithSupport, null, 2)
);

const doubleItemCount = getDoubleItemCount(baskets, singleItemCountWithSupport);

fs.writeFileSync(
  doubleItemCountWithoutSupportPath,
  JSON.stringify(doubleItemCount, null, 2)
);

const doubleItemCountWithSupport = getItemCountWithSupport(
  doubleItemCount,
  baskets
);

fs.writeFileSync(
  doubleItemCountWithSupportPath,
  JSON.stringify(doubleItemCountWithSupport, null, 2)
);

const doubleConfidence = getDoubleConfidence(
  doubleItemCountWithSupport,
  singleItemCountWithSupport
);

fs.writeFileSync(confidenceDoublePath, doubleConfidence);

const tripleItemCount = getTripleItemCount(baskets, doubleItemCountWithSupport);

fs.writeFileSync(
  tripleItemCountWithoutSupportPath,
  JSON.stringify(tripleItemCount, null, 2)
);

const tripleItemCountWithSupport = getItemCountWithSupport(
  tripleItemCount,
  baskets
);

fs.writeFileSync(
  tripleItemCountWithSupportPath,
  JSON.stringify(tripleItemCountWithSupport, null, 2)
);

const tripleConfidence = getTripleConfidence(
  tripleItemCountWithSupport,
  singleItemCountWithSupport,
  doubleItemCountWithSupport
);
fs.writeFileSync(confidenceTriplePath, tripleConfidence);

console.timeEnd('data-mining-assignment-2');
