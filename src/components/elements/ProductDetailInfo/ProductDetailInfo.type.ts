import { Item } from '@/shared/types/product';

export interface ProductDetailInfoType {
  type: 'crop' | 'experience' | 'gardening';
  item: Item;
}
