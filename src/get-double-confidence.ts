import { ItemCount } from './types';
import config from './config';

const getDoubleConfidence = (
  doubleItemCount: ItemCount,
  singleItemCount: ItemCount
): string => {
  console.time('getDoubleConfidence');
  let confidenceDoubleString = '';
  // Confidence
  for (let doubleItem in doubleItemCount) {
    let [itemA, itemB] = doubleItem.split(',');
    let confItemAItemB = doubleItemCount[doubleItem] / singleItemCount[itemA];
    if (confItemAItemB > config.CONFIDENCE) {
      confidenceDoubleString =
        confidenceDoubleString +
        `\nConfidence (${itemA} -> ${itemB}) = ${confItemAItemB} `;
    }

    let confItemBItemA = doubleItemCount[doubleItem] / singleItemCount[itemB];
    if (confItemBItemA > config.CONFIDENCE) {
      confidenceDoubleString =
        confidenceDoubleString +
        ` \nConfidence (${itemB} -> ${itemA}) = ${confItemBItemA}`;
    }
  }
  console.timeEnd('getDoubleConfidence');
  return confidenceDoubleString;
};

export default getDoubleConfidence;
