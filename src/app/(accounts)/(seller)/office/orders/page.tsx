import OrderItemForSeller from '@/components/elements/OrderItem/OrderItemForSeller';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function OrdersForSeller() {
  return (
    <>
      <LinkHeader title="주문내역" />
      <OrderItemForSeller orderState="OS020" />
      <OrderItemForSeller orderState="preparingShipment" />
      <OrderItemForSeller orderState="inTransit" />
      <OrderItemForSeller orderState="delivered" />
      <OrderItemForSeller orderState="purchaseCompleted" />
      <OrderItemForSeller orderState="refundInProgress" />
      <OrderItemForSeller orderState="refundCompleted" />
    </>
  );
}
