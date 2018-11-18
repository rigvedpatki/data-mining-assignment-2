export interface ItemCount {
  [itemName: string]: number;
}

export interface Transaction {
  transactionId: number;
  items: number[];
}
