import { MainImage } from '@/shared/types/product';

export interface OrderListResponse {
  ok: number;
  item: Order[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Order {
  _id: number;
  products: OrderedProduct[];
  state: string; // 예: 'OS020' 등 상태 코드
  user_id: number;
  createdAt: string; // 예: "2025.07.23 14:02:52"
  updatedAt: string;
  cost: OrderCost;
}

export interface OrderedProduct {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: MainImage;
  price: number;
  extra: OrderedProductExtra;
}

export interface OrderedProductExtra {
  productType: 'crop' | 'experience' | 'gardening';
  category: string;
  filter: string[];
  originPlace: string;
  productionPlace: string;
  composition: string;
  deliveryInfo: string;
  likeCount: number;
  dcRate: number;
  productCnt: number;
  badge: Badge[];
}

export interface Badge {
  isNew: boolean;
  isInSeason: boolean;
  isBest: boolean;
  isLowStock: boolean;
  isSold: boolean;
}

export interface OrderCost {
  products: number;
  shippingFees: number;
  discount: {
    products: number;
    shippingFees: number;
  };
  total: number;
}
