import { Transaction, ItemCount } from './types';

const getDoubleItemCount = (
  transactions: Transaction[],
  singleItemCount: ItemCount
): ItemCount => {
  console.time('getDoubleItemCount');
  const doubleItemCount: ItemCount = {};
  for (let transaction of transactions) {
    for (let itemA in singleItemCount) {
      for (let itemB in singleItemCount) {
        if (itemA !== itemB && parseInt(itemA) > parseInt(itemB)) {
          if (
            transaction.items.includes(parseInt(itemA)) &&
            transaction.items.includes(parseInt(itemB))
          ) {
            let concatItem = `${itemA},${itemB}`;
            if (concatItem in doubleItemCount) {
              doubleItemCount[concatItem] = doubleItemCount[concatItem] + 1;
            } else {
              doubleItemCount[concatItem] = 1;
            }
          }
        }
      }
    }
  }
  console.timeEnd('getDoubleItemCount');
  return doubleItemCount;
};

export default getDoubleItemCount;
