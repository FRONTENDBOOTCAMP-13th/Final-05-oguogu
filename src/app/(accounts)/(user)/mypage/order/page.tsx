import CardItem from '@/components/elements/cardItem/cardItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function UserOrderList() {
  return (
    <>
      <LinkHeader title="주문정보" />
      <main className="px-4">
        <CardItem />
      </main>
    </>
  );
}
