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

  region?: string;
  meetingPlace?: string;
  departureDate?: string;
  returnDate?: string;
  reoresentitiveKeyword?: [];
  includedItems?: [];
  schedule?: [];
  guideInfo?: { name: string; contact: string };

  deadline?: string;
  harvestExpectedDate: string;
  harvestExpectedCnt: string;
  period: periodObject[];
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

export interface productRes {
  ok: number;
  item: Item;
}
export interface productsRes {
  ok: number;
  item: Item[];
}

export interface periodObject {
  date: string;
  image: string;
  status: string;
  content: string;
}
