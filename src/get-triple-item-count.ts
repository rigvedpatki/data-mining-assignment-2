import { ItemCount, Transaction } from './types';

const getTripleItemCount = (
  transactions: Transaction[],
  doubleItemCount: ItemCount
): ItemCount => {
  console.time('getTripleItemCount');
  let tripleItemCount: ItemCount = {};
  let itemList: number[] = [];
  for (let item in doubleItemCount) {
    let items = item.split(',').map(item => parseInt(item));
    itemList = itemList.concat(items);
  }
  itemList = Array.from(new Set(itemList));
  for (let transaction of transactions) {
    for (let itemA of itemList) {
      for (let itemB of itemList) {
        for (let itemC of itemList) {
          if (
            itemA !== itemB &&
            itemB !== itemC &&
            itemC !== itemA &&
            itemA > itemB &&
            itemB > itemC &&
            itemA > itemC
          ) {
            if (
              transaction.items.includes(itemA) &&
              transaction.items.includes(itemB) &&
              transaction.items.includes(itemC)
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
  console.timeEnd('getTripleItemCount');
  return tripleItemCount;
};

export default getTripleItemCount;
