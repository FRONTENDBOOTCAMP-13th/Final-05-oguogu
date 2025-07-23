import OrderItem from '@/components/elements/OrderItem/OrderItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function UserOrderList() {
  return (
    <>
      <LinkHeader title="주문정보" />
      <main className="px-4">
        {/* 여기에 내용 작성 */}
        <OrderItem orderState="delivered" />
      </main>
    </>
  );
}
