export type User = UserBasic | UserSeller | UserAdmin;

export interface UserBasic {
  _id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  phone?: string; // 전화번호
  address?: string; // 주소
  type: 'user'; // 사용자 유형
  loginType?: 'email' | 'kakao' | 'google' | 'github'; // 로그인 방식
  image?: string; // 프로필 이미지
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  extra: {
    birthday: string;
    membershipClass?: string;
    coupons?: {
      id: string;
      name: string;
      expiresAt: string;
    }[];
    address?: {
      id: number;
      name: string;
      value: string;
    }[];
  };
}

export interface UserSeller {
  _id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  phone?: string; // 전화번호
  address?: string; // 주소
  type: 'seller'; // 사용자 유형
  loginType?: 'email' | 'kakao' | 'google' | 'github'; // 로그인 방식
  image?: string; // 프로필 이미지
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  postViews: number; // 상품 본 수
  extra: {
    businessName: string; // 사업체명
    representativeName: string; // 대표자 이름
    businessNumber: string; // 사업자 등록번호
    tel: string; // 대표 전화번호
    fax?: string; // 팩스 번호 (선택)
    businessAddress: string; // 사업장 주소
    businessLicenseImage: string; // 사업자등록증 이미지 경로
    telecomRegistrationImage: string; // 통신판매업 신고증 이미지 경로
    certification: {
      status: 'pending' | 'approved' | 'rejected'; // 인증 상태
      requestedAt: string; // 인증 요청일
      reviewedAt?: string; // 검토일
      reviewer?: string; // 검토자 이메일 또는 ID
      reason?: string; // 검토 사유 또는 비고
    };
  };
}

export interface UserAdmin {
  _id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  phone?: string; // 전화번호
  address?: string; // 주소
  type: 'admin'; // 사용자 유형
  loginType?: 'email' | 'kakao' | 'google' | 'github'; // 로그인 방식
  image?: string; // 프로필 이미지
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
}
