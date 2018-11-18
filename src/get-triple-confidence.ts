import { ItemCount } from './types';
import config from './config';

const getTripleConfidence = (
  tripleItemCount: ItemCount,
  singleItemCount: ItemCount,
  doubleItemCount: ItemCount
): string => {
  console.time('getTripleConfidence');
  let confidenceTripleString = '';
  for (let tripleItem in tripleItemCount) {
    let [itemA, itemB, itemC] = tripleItem.split(',');
    let confABToC =
      tripleItemCount[tripleItem] / doubleItemCount[`${itemA},${itemB}`];
    if (confABToC > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemA},${itemB} -> ${itemC}) = ${confABToC}`;
    }
    let confCToAB = tripleItemCount[tripleItem] / singleItemCount[`${itemC}`];
    if (confCToAB > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemC} -> ${itemA},${itemB}) = ${confCToAB}`;
    }
    let confBCToA =
      tripleItemCount[tripleItem] / doubleItemCount[`${itemB},${itemC}`];
    if (confBCToA > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        ` \nConfidence (${itemB},${itemC} -> ${itemA}) = ${confBCToA}`;
    }
    let confAToBC = tripleItemCount[tripleItem] / singleItemCount[`${itemA}`];
    if (confAToBC > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemA} -> ${itemB},${itemC}) = ${confAToBC}`;
    }
    let confCAToB =
      tripleItemCount[tripleItem] / doubleItemCount[`${itemC},${itemA}`];
    if (confCAToB > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        ` \nConfidence (${itemC},${itemA} -> ${itemB}) = ${confCAToB}`;
    }
    let confBToCA = tripleItemCount[tripleItem] / singleItemCount[`${itemB}`];
    if (confBToCA > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemB} -> ${itemC},${itemA}) = ${confBToCA}`;
    }
  }
  console.timeEnd('getTripleConfidence');
  return confidenceTripleString;
};

export default getTripleConfidence;
