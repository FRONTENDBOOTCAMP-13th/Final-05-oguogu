export type OrderStatus =
  | 'paymentCompleted'
  | 'preparingShipment'
  | 'inTransit'
  | 'delivered'
  | 'purchaseCompleted'
  | 'refundInProgress'
  | 'refundCompleted';

export interface OrderItemType {
  orderState: OrderStatus;
}
