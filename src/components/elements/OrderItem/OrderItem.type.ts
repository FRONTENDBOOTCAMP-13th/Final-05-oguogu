import { Order } from '@/shared/types/order';

export type OrderStatus =
  | 'paymentCompleted'
  | 'preparingShipment'
  | 'inTransit'
  | 'delivered'
  | 'purchaseCompleted'
  | 'refundInProgress'
  | 'refundCompleted'
  | 'OS020';

export interface OrderItemType {
  orderState: string;
  item: Order;
  updateOrderStatus: (order_id: number, newState: string) => void;
}
