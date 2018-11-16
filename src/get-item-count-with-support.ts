import { ItemCount } from './types';
import config from './config';

const getItemCountWithSupport = (itemCount: ItemCount): ItemCount => {
  console.time('getItemCountWithSupport');
  for (let item in itemCount) {
    if (itemCount[item] < config.SUPPORT) {
      delete itemCount[item];
    }
  }
  console.timeEnd('getItemCountWithSupport');

  return itemCount;
};

export default getItemCountWithSupport;
