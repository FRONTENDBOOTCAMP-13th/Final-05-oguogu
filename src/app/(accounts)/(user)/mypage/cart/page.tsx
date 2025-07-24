import CartClientControl from '@/features/cartClientControl/cartClientControl';

export default function UserCartList() {
  return (
    <>
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <CartClientControl />
      </main>
    </>
  );
}
