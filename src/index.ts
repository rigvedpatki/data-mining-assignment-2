import * as fs from 'fs';
import getBaskets from './get-baskets';
import getSingleItemCount from './get-single-item-count';
import getDoubleItemCount from './get-double-item-count';
import getItemCountWithSupport from './get-item-count-with-support';
import getDoubleConfidence from './get-double-confidence';
// import getTripleItemCount from './get-triple-item-count';
// import getTripleConfidence from './get-triple-confidence';
import {
  dataPath,
  singleItemCountWithSupportPath,
  singleItemCountWithoutSupportPath,
  doubleItemCountWithSupportPath,
  doubleItemCountWithoutSupportPath,
  confidenceDoublePath
  // tripleItemCountWithoutSupportPath,
  // tripleItemCountWithSupportPath,
  // confidenceTriplePath
} from './get-file-paths';

import cluster from 'cluster';
import os from 'os';

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  const cpuCount = os.cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
  process.exit();
} else {
  console.time('data-mining-assignment-2');

  console.log(`Worker ${process.pid} started and finished`);

  const data = fs.readFileSync(dataPath, 'utf-8');

  const baskets = getBaskets(data);

  const singleItemCount = getSingleItemCount(baskets);

  fs.writeFileSync(
    singleItemCountWithoutSupportPath,
    JSON.stringify(singleItemCount, null, 2)
  );

  const singleItemCountWithSupport = getItemCountWithSupport(singleItemCount);

  fs.writeFileSync(
    singleItemCountWithSupportPath,
    JSON.stringify(singleItemCountWithSupport, null, 2)
  );

  const doubleItemCount = getDoubleItemCount(baskets, singleItemCount);

  fs.writeFileSync(
    doubleItemCountWithoutSupportPath,
    JSON.stringify(doubleItemCount, null, 2)
  );

  const doubleItemCountWithSupport = getItemCountWithSupport(doubleItemCount);

  fs.writeFileSync(
    doubleItemCountWithSupportPath,
    JSON.stringify(doubleItemCountWithSupport, null, 2)
  );

  const doubleConfidence = getDoubleConfidence(
    doubleItemCountWithSupport,
    singleItemCountWithSupport
  );

  fs.writeFileSync(confidenceDoublePath, doubleConfidence);

  // const tripleItemCount = getTripleItemCount(baskets, singleItemCount);

  // fs.writeFileSync(
  //   tripleItemCountWithoutSupportPath,
  //   JSON.stringify(tripleItemCount, null, 2)
  // );

  // const tripleItemCountWithSupport = getItemCountWithSupport(tripleItemCount);

  // fs.writeFileSync(
  //   tripleItemCountWithSupportPath,
  //   JSON.stringify(tripleItemCountWithSupport, null, 2)
  // );

  // const tripleConfidence = getTripleConfidence(
  //   tripleItemCountWithSupport,
  //   singleItemCountWithSupport
  // );
  // fs.writeFileSync(confidenceTriplePath, tripleConfidence);
  process.exit();
  console.timeEnd('data-mining-assignment-2');
}
