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
    businessInfo?: {
      companyName: string; // 상호명
      ownerName: string; // 대표자명
      businessTel: string; // 사업자 대표 전화
      businessNumber: string; // 사업자 등록번호
    };
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
  productType?: 'crop' | 'experience' | 'gardening';
  category?: 'veggie' | 'fruit' | 'grain' | 'mushroom';
  filter?: string[];
  originPlace?: string;
  productionPlace?: string;
  composition?: string;
  deliveryInfo?: string;
  likeCount?: number;
  dcRate?: number;
  productCnt?: number; //최대 구매 가능 수량
  isNew?: boolean;
  isInSeason?: boolean;
  isBest?: boolean;
  isLowStock?: boolean;
  isSold?: boolean;
  productUnit?: string; //상품 수량 또는 무게
  productDetailContent?: string; //상품 상세 설명
  detailImages?: MainImage[];

  region?: string;
  meetingPlace?: string;
  departureDate?: string;
  returnDate?: string;
  reoresentitiveKeyword?: [];
  includedItems?: string[];
  unincludedItems?: string[];
  schedule?: [];
  guideInfo?: { name: string; contact: string; company: string };

  deadline?: string;
  harvestExpectedDate?: string;
  harvestExpectedCnt?: string;
  period?: periodObject[];

  badge?: badge;
}

export interface badge {
  isNew: boolean | null;
  isInSeason: boolean | null;
  isBest: boolean | null;
  isLowStock: boolean | null;
  isSold: boolean | null;
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
  image?: {
    name?: File | null;
    imagePath?: string | null;
  };
  status: string;
  title: string;
  content: string;
}
