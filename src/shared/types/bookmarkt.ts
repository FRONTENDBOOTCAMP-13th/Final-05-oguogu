import { Item } from '@/shared/types/product';

export interface BookmarkItem {
  _id: number; // 북마크 ID
  user_id: number;
  extra?: {
    type: string;
  };
  createdAt: string;
  product: Item; // 상품 정보
}

// API 전체 응답
export interface BookmarkResponse {
  item: BookmarkItem[];
  ok: number;
}

export interface BookmarkPostResponse {
  ok: number;
  item: BookmarkPostItem;
}

export interface BookmarkPostItem {
  type: string;
  user_id: number;
  target_id: number;
  memo: string;
  _id: number;
  createdAt: string;
}
