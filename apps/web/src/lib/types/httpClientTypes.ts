export interface Depth {
  YES: {
    asks: { price: number; quantity: number }[];
    bids: { price: number; quantity: number }[];
  };
  NO: {
    asks: { price: number; quantity: number }[];
    bids: { price: number; quantity: number }[];
  };
}
