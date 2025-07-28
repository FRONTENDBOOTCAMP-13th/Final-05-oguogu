import OrderItemForSeller from '@/components/elements/OrderItem/OrderItemForSeller';

export default function OrdersForSeller() {
  return (
    <>
      <h1>판매자 주문내역 페이지</h1>
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
