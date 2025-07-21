import { productRes } from '@/shared/types/product';

export interface BuyModalProps {
  onClose: () => void;
  type: 'crop' | 'experience' | 'gardening' | undefined;
  res: productRes;
}
