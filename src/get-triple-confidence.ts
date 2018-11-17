import { ItemCount } from './types';
import config from './config';

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
    if (confABToC > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        `\nConfidence (${itemA},${itemB} -> ${itemC}) = ${confABToC}`;
    }
    let confBCToA =
      tripleItemCount[`$${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemA}`];
    if (confBCToA > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        ` \nConfidence (${itemB},${itemC} -> ${itemA}) = ${confBCToA}`;
    }
    let confCAToB =
      tripleItemCount[`${itemA},${itemB},${itemC}`] /
      singleItemCount[`${itemB}`];
    if (confCAToB > config.CONFIDENCE) {
      confidenceTripleString =
        confidenceTripleString +
        ` \nConfidence (${itemC},${itemA} -> ${itemB}) = ${confCAToB}`;
    }
  }
  console.timeEnd('getTripleConfidence');
  return confidenceTripleString;
};

export default getTripleConfidence;
