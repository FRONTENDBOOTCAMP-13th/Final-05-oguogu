import { Item } from '@/shared/types/product';

// 장바구니 아이템
export interface CartItem {
  _id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Item;
}

// 할인/비용
type CartDiscount = {
  products: number;
  shippingFees: number;
};

type CartCost = {
  products: number;
  shippingFees: number;
  discount: CartDiscount;
  total: number;
};

// 최종 응답 타입
export interface CartResponse {
  ok: 1;
  item: CartItem[];
  cost: CartCost;
}
