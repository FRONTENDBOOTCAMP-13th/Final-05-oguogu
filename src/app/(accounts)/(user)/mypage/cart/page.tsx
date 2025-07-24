import LinkHeader from '@/components/layouts/Header/LinkHeader';
import CartClientControl from '@/features/cartClientControl/cartClientControl';

export default function UserCartList() {
  return (
    <>
      <LinkHeader title="장바구니" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <CartClientControl />
      </main>
    </>
  );
}
