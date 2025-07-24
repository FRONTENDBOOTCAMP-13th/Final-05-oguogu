export interface MainImage {
  path: string;
  name: string;
  originalname: string;
}

export interface Seller {
  address: string;
  email: string;
  name: string;
  phone: string;
  _id: number;
  extra: {
    businessLicenseImage: string;
    businessName: string;
    businessNumber: string;
    certification: {
      status: string;
      requestedAt: string;
      reviewedAt: string;
      reviewer: string;
      reason: string;
    };
    representativeName: string;
    tel: string;
    telecomRegistrationImage: string;
  };
}

export interface Item {
  /* 기본 */
  _id: number;
  name: string;
  price: number;

  /* 선택 */
  seller_id?: number;
  content?: string;
  shippingFees?: number;
  quantity?: number;
  buyQuantity?: number;
  show?: boolean;
  active?: boolean;
  mainImages?: MainImage[];
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  extra?: Extra;
  rating?: number;
  replies?: number;
  bookmarks?: number;
  seller?: Seller;
  togglebookmark?: () => void;
  isbookmarked?: boolean;
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
