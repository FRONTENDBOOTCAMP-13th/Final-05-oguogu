// 장바구니 아이템
export interface CartItem {
  _id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  shippingFees?: number;
  product: {
    _id: number;
    name: string;
    price: number;
    seller_id: number;
    quantity: number;
    buyQuantity: number;
    image: {
      path: string;
      fileName: string;
      orgName: string;
    };
    extra: {
      isNew: boolean;
      isBest: boolean;
      category: string[];
      sort: number;
      dcRate: number;
      productCnt: number;
    };
  };
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

export interface CartResponse {
  ok: number;
  item: CartItem[];
  cost: CartCost;
}
