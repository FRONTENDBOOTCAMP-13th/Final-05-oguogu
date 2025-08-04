/* 0. 초기 데이터 타입 */
export interface UserResType {
  ok: 0 | 1;
  item: UserCommonType | UserSellerType;
}

/* 1. 일반(user) */
// prettier-ignore
export interface UserCommonType {
  _id: number;                                              // 고유 ID
  email: string;                                            // 이메일
  password: string;                                         // 비밀번호
  name: string;                                             // 사용자 이름
  phone: string;                                            // 전화번호
  address: string;                                          // 주소
  type: 'user';                                             // 유형
  loginType: 'email' | 'kakao' | 'google' | 'github';       // 로그인 방식
  image: string;                                            // 프로필 이미지
  createdAt: string;                                        // 생성일자
  updatedAt: string;                                        // 수정일자
  extra: UserCommonExtraType                                // 커스텀
}

// prettier-ignore
export interface UserCommonExtraType {
  birthday: string;                                         // 생년월일
  agreement: {                                              // 가입 동의
    agreeTerms: boolean;                                    // 이용약관 동의
    agreePrivacy: boolean;                                  // 개인정보 수집 이용 동의
    isAdult: boolean;                                       // 만 14세 이상
    agreeMarketing: boolean;                                // 마케팅 광고 동의
  }
}

/* 2. 판매자(seller) */
// prettier-ignore
export interface UserSellerType {
  _id: number;                                              // 고유 ID
  email: string;                                            // 이메일
  password: string;                                         // 비밀번호
  name: string;                                             // 판매자 이름
  phone: string;                                            // 전화번호
  address: string;                                          // 주소
  type: 'seller';                                           // 사용자 유형
  loginType: 'email' | 'kakao' | 'google' | "github";       // 로그인 방식
  image: string;                                            // 프로필 이미지
  createdAt: string;                                        // 생성일자
  updatedAt: string;                                        // 수정일자
  post: number;                                             // 사용자가 작성한 게시글 수
  postViews: number;                                        // 사용자가 작성한 모든 게시글 조회 수
  bookmark: {
    products: number;                                       // 사용자가 북마크한 상품 수
    users: number;                                          // 사용자가 북마크한 사용자 수
    posts: number;                                          // 사용자가 북마크한 게시글 수
  }
  bookmarkedBy: {
    users: number;                                          // 사용자를 북마크한 사용자 수
  }
  extra: UserSellerExtraType;                               // 커스텀
}

// prettier-ignore
export interface UserSellerExtraType {
  businessInfo?: {
    companyName: string; // 상호명
    ownerName: string; // 대표자명
    businessTel: string; // 사업자 대표 전화
    businessNumber: string; // 사업자 등록번호
  };

  accountInfo?: {
    settlementBank: string; // 정산 은행
    settlementOwner: string; // 계좌 소유주
    settlementAccount: string; // 계좌 번호
  };

  agreement?: {
    sellerAgreeTerms: boolean; // 이용약관 동의
    sellerFinTerms: boolean; // 전자금융거래 이용악관 동의
    sellerAgreePrivacy: boolean; // 개인정보 수집이용 동의
    sellerProvidePrivacy: boolean; // 개인정보 제공 동의
    sellerAgreeMarketing: boolean; // 마케팅 광고 동의
  };
}
