import { ItemCount, Basket } from './types';

const getTripleItemCount = (
  baskets: Basket[],
  singleItemCount: ItemCount
): ItemCount => {
  console.time('getTripleItemCount');
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
              basket.items.includes(parseInt(itemA)) &&
              basket.items.includes(parseInt(itemB)) &&
              basket.items.includes(parseInt(itemC))
            ) {
              let concatItem = `${itemA},${itemB},${itemC}`;
              if (concatItem in tripleItemCount) {
                tripleItemCount[concatItem] = tripleItemCount[concatItem] + 2;
              } else {
                tripleItemCount[concatItem] = 2;
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
