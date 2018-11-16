import { Basket, ItemCount } from './types';

const getSingleItemCount = (baskets: Basket[]): ItemCount => {
  console.time('getSingleItemCount');
  const singleItemCount: ItemCount = {};

  for (let basket of baskets) {
    for (let item of basket.items) {
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
