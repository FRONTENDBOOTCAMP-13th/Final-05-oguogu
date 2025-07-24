export interface BuyBoxOptionType {
  name: string;
  price: number;
  quantity?: number;
  maxQuantity?: number;
  buyQuantity?: number;
  type: 'crop' | 'experience' | 'gardening';
  handleBuy: (product_id: number, quantity: number, token: string) => void;
  product_id: number;
}
