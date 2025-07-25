export interface QnaUser {
  _id: number;
  type?: string;
  name: string;
  email?: string;
  image: string;
}

export interface QnaReply {
  createdAt: string; // ISO or formatted date string
  updatedAt: string;
  content?: string; // 응답 내용이 있다면 포함
  user?: {
    _id: number;
    name: string;
    image?: string;
  }; // 답변한 판매자 정보 (선택적)
}

export interface ProductItem {
  name: string;
  image: {
    path: string;
    name: string;
    originalname: string;
  };
}

export interface QnaItem {
  _id: number;
  type: 'qna';
  product_id: number;
  seller_id: number;
  views: number;
  private?: boolean;

  user: QnaUser;

  title: string;
  content: string;

  createdAt: string;
  updatedAt: string;

  product: ProductItem;

  bookmarks: number;
  repliesCount: number;

  replies: QnaReply[];
}

export interface QnaRes {
  ok: number;
  item: QnaItem[]; // 단일 또는 목록 응답 모두 대응 가능
}
