import { Basket, ItemCount } from './types';

const getDoubleItemCount = (
  baskets: Basket[],
  singleItemCount: ItemCount
): ItemCount => {
  console.time('getDoubleItemCount');
  const doubleItemCount: ItemCount = {};
  for (let basket of baskets) {
    for (let itemA in singleItemCount) {
      for (let itemB in singleItemCount) {
        if (itemA !== itemB && parseInt(itemA) > parseInt(itemB)) {
          if (
            basket.items.includes(parseInt(itemA)) &&
            basket.items.includes(parseInt(itemB))
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
