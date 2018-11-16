import { Basket } from './types';

const getBaskets = (data: string): Basket[] => {
  console.time('getBaskets');
  const dataBaskets = data.split('\n');

  const baskets = dataBaskets.map((data, i) => ({
    basket: i,
    items: data
      .split(' ')
      .slice(0, -1)
      .map(item => parseInt(item))
  }));
  console.timeEnd('getBaskets');
  return baskets;
};

export default getBaskets;
