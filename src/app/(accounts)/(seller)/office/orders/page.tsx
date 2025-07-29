import OrderItemForSeller from '@/components/elements/OrderItem/OrderItemForSeller';
import OrderDropdown from '@/components/elements/OrderOption/OrderOption';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function OrdersForSeller() {
  return (
    <>
      <LinkHeader title="주문내역" />
      <main className="px-4 py-4 flex flex-col gap-5 min-h-[calc(100vh-48px)] items-center">
        <OrderDropdown />
        <OrderItemForSeller orderState="OS020" />
        <OrderItemForSeller orderState="preparingShipment" />
        <OrderItemForSeller orderState="inTransit" />
        <OrderItemForSeller orderState="delivered" />
        <OrderItemForSeller orderState="purchaseCompleted" />
        <OrderItemForSeller orderState="refundInProgress" />
        <OrderItemForSeller orderState="refundCompleted" />
      </main>
    </>
  );
}
