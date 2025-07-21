export interface ItemExtraType {
  likeCount: string;
  isBest: boolean;
  isNew: boolean;
}

export interface ItemType {
  _id: number;
  name: string;
  originPrice: number;
  seller_id?: string;
  dcRate?: string;
  finPrice?: string;
  extra?: CropItemExtraType;
}
