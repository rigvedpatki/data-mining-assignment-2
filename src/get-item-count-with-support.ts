import { ItemCount, Basket } from './types';
import config from './config';

const getItemCountWithSupport = (
  itemCount: ItemCount,
  baskets: Basket[]
): ItemCount => {
  console.time('getItemCountWithSupport');
  for (let item in itemCount) {
    if (itemCount[item] / baskets.length < config.SUPPORT) {
      delete itemCount[item];
    }
  }
  console.timeEnd('getItemCountWithSupport');

  return itemCount;
};

export default getItemCountWithSupport;
