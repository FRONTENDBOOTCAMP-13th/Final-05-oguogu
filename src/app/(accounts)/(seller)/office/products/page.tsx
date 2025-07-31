import LinkHeader from '@/components/layouts/Header/LinkHeader';
import SellerProductClientControl from '@/features/sellerProductClientControl/sellerProductClientControl';

export default function ProductsForSeller() {
  return (
    <>
      <LinkHeader title="상품 관리" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <SellerProductClientControl />
      </main>
    </>
  );
}
