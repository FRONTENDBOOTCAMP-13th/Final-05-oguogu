/* 해당 파일은 상품 타입 별로 어떤 속성이 들어가는지 참고하고자 작성한 파일입니다. */

import { UserSellerType } from '@/shared/types/user';

/* 0. 초기 데이터 타입  */
export interface productRes {
  ok: 0 | 1;
  item: ItemType | ItemType[];
}

/* 1. 상품(CropItem, ExperienceItem, GardeningItem) */
// prettier-ignore
export interface ItemType {
  _id: number; // 고유 ID
  name: string; // 제목 | 상품명
  content?: string; // 설명 | 부제목
  price: number; // 판매 가격
  seller_id?: number; // 해당 상품을 판매하는 판매자의 고유 id
  shippingFees?: number; // 배송비
  quantity?: number; // 총 판매 수량
  buyQuantity?: number; // 현재 구매된 수량
  show?: boolean; // 공개/비공개?
  active?: boolean; // 이건뭐임?
  createdAt?: string; // 생성일자 : parseISO(string) 사용
  updatedAt?: string; // 수정일자
  rating?: number; // 평균 별점
  replies?: number; // 리뷰 수
  bookmarks?: number; // 북마크된 수
  mainImages?: ImageType[]; // 상품 대표 이미지
  seller?: UserSellerType; // 판매자 정보
  extra?: ExtraType; // 커스텀

  togglebookmark?: () => void; // 북마크 토글 기능
  isbookmarked?: boolean; // 북마크 여부 검증 기능
}

/* 2. 상품 추가 속성 : 공통(common), 농산물(crop), 체험(experience), 텃밭(gardening) 별로 구분 */
// prettier-ignore
export interface ExtraType {
  common: {
    productType: 'crop' | 'experience' | 'gardening';        // 상품 타입
    productCnt: number;                                      // 1회 최대 구매 가능한 수량
    dcRate: number;                                          // 할인율(%)
    productUnit: string;                                     // 상품 구성
    detailImages: ImageType[];                               // 상세 정보 이미지
    productDetailContent: string;                            // 상품 상세 설명
  }

  cropInfo: {
    category?: 'veggie' | 'fruit' | 'grain' | 'mushroom';   // 농산물 카테고리
  };

  experienceInfo: {
    region: string;                                         // 지역
    meetingPlace: string;                                   // 출발 지역(집결지)
    departureDate: string;                                  // 출발 일자
    returnDate: string;                                     // 도착 일자
    includedItems: string[];                                // 포함 상품
    unincludedItems: string[];                              // 미포함 상품
    guideInfo: {
      name : string;                                        // 가이드 이름
      contact: string;                                      // 가이드 연락처
      company: string                                       // 여행사
    };
  };
  
  gardeningInfo: {
    region: string;                                         // 지역
    deadline?: string;                                      // 판매 마감 시간
    harvestExpectedDate?: string;                           // 예상 수확 일자 (YY-MM-DD)
    harvestExpectedCnt?: string;                            // 예상 수확량
    period?: PeriodType[];                                  // 업로드 게시물
  }

  badge?: BadgeType;                                        // 뱃지 (관리자 권한)
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

/* 텃밭 히스토리 */
export interface PeriodType {
  date: string;
  image: string;
  status: 'seeding' | 'sprouting' | 'growing' | 'harvested';
  title?: string;
  content: string;
}
