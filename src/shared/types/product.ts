export interface MainImage {
  path: string;
  name: string;
  originalname: string;
}

export interface Extra {
  productType: 'crop' | 'experience' | 'gardening';
  category: 'veggie' | 'fruit' | 'grain' | 'mushroom';
  filter: string[];
  originPlace: string;
  productionPlace: string;
  composition: string;
  deliveryInfo: string;
  likeCount: number;
  dcRate: number;
  productCnt: number;
  isNew: boolean;
  isInSeason: boolean;
  isBest: boolean;
  isLowStock: boolean;
  isSold: boolean;
}

export interface Item {
  _id: number;
  seller_id: number;
  name: string;
  content: string;
  price: number;
  shippingFees: number;
  quantity: number;
  buyQuantity: number;
  show: boolean;
  active: boolean;
  mainImages: MainImage[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  extra: Extra;
}
