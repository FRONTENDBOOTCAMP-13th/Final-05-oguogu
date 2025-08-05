import { UserAccountExtraType } from '@/shared/types/account';
import { MainImage, periodObject } from '@/shared/types/product';

export interface OrderListResponse {
  ok: number;
  item: Order[];
  pagination: Pagination;
  message: string;
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
  user: OrderUser;
}

export interface OrderUser {
  email: string;
  address: string;
  image: string;
  loginType: string;
  name: string;
  phone: string;
  _id: number;
  extra: UserAccountExtraType;
}

export interface OrderedProduct {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  image: MainImage;
  price: number;
  extra: OrderedProductExtra;
  review_id: number;
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
  period: periodObject[];
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
