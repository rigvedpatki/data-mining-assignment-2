import { Transaction, ItemCount } from './types';

const getSingleItemCount = (transactions: Transaction[]): ItemCount => {
  console.time('getSingleItemCount');
  const singleItemCount: ItemCount = {};

  for (let transaction of transactions) {
    for (let item of transaction.items) {
      if (item in singleItemCount) {
        singleItemCount[item] = singleItemCount[item] + 1;
      } else {
        singleItemCount[item] = 1;
      }
    }
  }
  console.timeEnd('getSingleItemCount');
  return singleItemCount;
};

export default getSingleItemCount;
