import { Transaction } from './types';

const getBaskets = (data: string): Transaction[] => {
  console.time('getBaskets');
  const dataBaskets = data.split('\n');

  const transactions = dataBaskets.map((data, i) => ({
    transactionId: i,
    items: data
      .split(' ')
      .slice(0, -1)
      .map(item => parseInt(item))
  }));
  console.timeEnd('getBaskets');
  return transactions;
};

export default getBaskets;
