/* 1. 상품(CropItem, ExperienceItem, GardeningItem) */
// prettier-ignore
export interface ItemType {
  _id: number;                                              // 고유 ID
  name: string;                                             // 제목 | 상품명
  content?: string;                                         // 설명 | 부제목
  price: number;                                            // 판매 가격
  seller_id?: number;                                       // 해당 상품을 판매하는 판매자의 고유 id
  shippingFees?: number;                                    // 배송비
  quantity?: number;                                        // 총 판매 수량
  buyQuantity?: number;                                     // 현재 구매된 수량
  show?: boolean;                                           // 공개/비공개?
  active?: boolean;                                         // 이건뭐임?
  createdAt?: string;                                       // 생성일자 : parseISO(string) 사용
  updatedAt?: string;                                       // 수정일자 
  rating?: number;                                          // 평균 별점
  replies?: number;                                         // 리뷰 수
  bookmarks?: number;                                       // 북마크된 수
  mainImages?: ImageType[];                                 // 상품 대표 이미지
  seller?: Seller;                                          // 판매자 정보
  extra?: ExtraType;                                        // 커스텀
}

// prettier-ignore
export interface ExtraType {
  common: {
    productType: 'crop' | 'experience' | 'gardening';        // 상품 타입
    productCnt: number;                                      // 1회 최대 구매 가능한 수량
    dcRate: number;                                          // 할인율(%)
    composition: string;                                     // 상품 구성
    productDetailContent: string;                            // 상품 상세 설명
    detailImages: ImageType[];                               // 상세 정보 이미지
  }

  cropInfo: {
    category?: 'veggie' | 'fruit' | 'grain' | 'mushroom';   // 농산물 카테고리
  };

  experienceInfo: {
    departureDate?: string;                                 // 출발일자
    returnDate?: string;                                    // 도착일자
    experiencePlace?: string;                               // 체험 지역
    meetingPlace?: string;                                  // 출발 지역(집결지)
    includedItems?: string[];                               // 포함 상품
    unincludedItems?: string[];                             // 미포함 상품
    guideInfo?: {
      name: string;                                         // 가이드 이름
      contact: string;                                      // 가이드 연락처
      company: string                                       // 여행사
    };
  };
  
  gardeningInfo: {
    period?: PeriodType[];                                  // 업로드 게시물
  }
  
  originPlace?: string;
  productionPlace?: string;
  deliveryInfo?: string;
  likeCount?: number;
  
  region?: string;
  reoresentitiveKeyword?: [];
  schedule?: [];

  deadline?: string;
  harvestExpectedDate?: string;
  harvestExpectedCnt?: string;

  badge?: BadgeType;

  togglebookmark?: () => void;
  isbookmarked?: boolean;
}

/* 뱃지 */
export interface BadgeType {
  isNew: boolean | null;
  isInSeason: boolean | null;
  isBest: boolean | null;
  isLowStock: boolean | null;
  isSold: boolean | null;
}

/* 이미지 */
export interface ImageType {
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

export interface productRes {
  ok: number;
  item: ItemType;
}

export interface productsRes {
  ok: number;
  item: ItemType[];
}

export interface PeriodType {
  date: string;
  image: string;
  status: 'seeding' | 'sprouting' | 'growing' | 'harvested';
  title?: string;
  content: string;
}
