import { ItemCount, Transaction } from './types';
import config from './config';

const getItemCountWithSupport = (
  itemCount: ItemCount,
  transactions: Transaction[]
): ItemCount => {
  console.time('getItemCountWithSupport');
  for (let item in itemCount) {
    if (itemCount[item] / transactions.length < config.SUPPORT) {
      delete itemCount[item];
    }
  }
  console.timeEnd('getItemCountWithSupport');

  return itemCount;
};

export default getItemCountWithSupport;
