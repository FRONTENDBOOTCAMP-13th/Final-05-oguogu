import { productRes } from '@/shared/types/product';

export interface BuyBoxType {
  onOpenModal: () => void;
  res: productRes;
}
