export interface fileResponse {
  ok: number;
  item: Item[];
  message: string;
}

export interface Item {
  originalname: string;
  name: string;
  path: string;
}
