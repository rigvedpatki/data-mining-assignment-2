import { ItemCount } from './types';

const getTripleConfidence = (
  tripleItemCount: ItemCount,
  singleItemCount: ItemCount
): string => {
  console.time('getTripleConfidence');
  let confidenceTripleString = '';
  for (let tripleItem in tripleItemCount) {
    let [itemA, itemB, itemC] = tripleItem.split(',');
    let confABToC =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemC}`];
    let confBCToA =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemA}`];
    let confCAToB =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemB}`];
    confidenceTripleString =
      confidenceTripleString +
      `\nConfidence (${itemA},${itemB} -> ${itemC}) = ${confABToC} \nConfidence (${itemB},${itemC} -> ${itemA}) = ${confBCToA} \nConfidence (${itemC},${itemA} -> ${itemB}) = ${confCAToB}`;
  }
  console.timeEnd('getTripleConfidence');
  return confidenceTripleString;
};

export default getTripleConfidence;
