export interface responsePostReplies {
  ok: number;
  item: responsePostRepliesItem[];
  message: string;
}

export interface responsePostRepliesItem {
  _id: number;
  user: {
    _id: number;
    name: string;
    email: string;
  };
  seller_id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  repliesCount: number;
  tag: string;
}
