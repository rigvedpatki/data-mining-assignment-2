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
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemC}`];
    if (confABToC > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemA},${itemB} -> ${itemC}) = ${confABToC}`;
    }
    let confCToAB =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      doubleItemCount[`${itemA},${itemB}`];
    if (confCToAB > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemC} -> ${itemA},${itemB}) = ${confCToAB}`;
    }
    let confCToBA =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      doubleItemCount[`${itemB},${itemA}`];
    if (confCToBA > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemC} -> ${itemB},${itemA}) = ${confCToBA}`;
    }
    let confBCToA =
      tripleItemCount[`$${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemA}`];
    if (confBCToA > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        ` \nConfidence (${itemB},${itemC} -> ${itemA}) = ${confBCToA}`;
    }
    let confAToBC =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      doubleItemCount[`${itemB},${itemC}`];
    if (confAToBC > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemA} -> ${itemB},${itemC}) = ${confAToBC}`;
    }
    let confAToCB =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      doubleItemCount[`${itemC},${itemB}`];
    if (confAToCB > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemA} -> ${itemC},${itemB}) = ${confAToCB}`;
    }
    let confCAToB =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemB}`];
    if (confCAToB > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        ` \nConfidence (${itemC},${itemA} -> ${itemB}) = ${confCAToB}`;
    }
    let confBToCA =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      doubleItemCount[`${itemC},${itemA}`];
    if (confBToCA > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemB} -> ${itemC},${itemA}) = ${confBToCA}`;
    }
    let confBToAC =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      doubleItemCount[`${itemA},${itemC}`];
    if (confBToAC > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemB} -> ${itemA},${itemC}) = ${confBToAC}`;
    }
  }
  console.timeEnd('getTripleConfidence');
  return confidenceTripleString;
};

export default getTripleConfidence;
