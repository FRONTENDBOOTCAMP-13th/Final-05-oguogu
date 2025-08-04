export interface ReviewImage {
  url: string;
}

export interface ReviewExtra {
  name: string; // 제목
  imagePath: string; // 이미지 배열
}

export interface ReviewUser {
  _id: number;
  name: string;
  image?: string; // 사용자 이미지 (선택적)
}

export interface ReviewProduct {
  _id: number;
  name: string;
  image: {
    path: string;
    name: string;
    originalname: string;
  };
}

export interface ReviewItem {
  _id: number;
  rating: number;
  content: string;
  user_id: number;
  product_id: number;
  extra: ReviewExtra;
  createdAt: string; // ISO date string or formatted string (e.g. '2025.07.13 14:00:21')
  user: ReviewUser;
  product: ReviewProduct;
}

export interface ReviewRes {
  ok: number;
  item: ReviewItem[]; // 여러 리뷰
}
