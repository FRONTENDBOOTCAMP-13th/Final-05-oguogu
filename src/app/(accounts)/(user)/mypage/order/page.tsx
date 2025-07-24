import LinkHeader from '@/components/layouts/Header/LinkHeader';
import OrderClientControl from '@/features/orderClientControl/orderClientControl';

export default function UserOrderList() {
  return (
    <>
      <LinkHeader title="주문/배송 내역" />
      <OrderClientControl />
    </>
  );
}
