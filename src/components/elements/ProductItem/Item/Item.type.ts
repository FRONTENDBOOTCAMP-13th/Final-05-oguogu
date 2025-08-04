import { Item } from '@/shared/types/product';

export interface ItemExtraType {
  likeCount: string;
  isBest: boolean;
  isNew: boolean;
}

export interface ItemType {
  _id: number;
  name: string;
  price: number;
  seller_id?: string;
  dcRate?: number;
  finPrice?: string;
  extra?: ItemExtraType;
  rating?: number;
  replies?: number;
  bookmark?: number;
  item?: Item;
  isbookmarked?: boolean;
  togglebookmark?: () => void;
}

export interface functionItemType {
  _id: number;
  name: string;
  price: number;
  seller_id?: string;
  dcRate?: number;
  finPrice?: string;
  extra?: ItemExtraType;
  rating?: number;
  replies?: number;
  bookmark?: number;
  item?: Item;
}
