import { ItemCount } from './types';

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
    let confItemBItemA = doubleItemCount[doubleItem] / singleItemCount[itemB];
    confidenceDoubleString =
      confidenceDoubleString +
      `\nConfidence (${itemA} -> ${itemB}) = ${confItemAItemB} \nConfidence (${itemB} -> ${itemA}) = ${confItemBItemA}`;
  }
  console.timeEnd('getDoubleConfidence');
  return confidenceDoubleString;
};

export default getDoubleConfidence;
