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
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}
