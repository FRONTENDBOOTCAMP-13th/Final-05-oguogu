import LinkHeader from '@/components/layouts/Header/LinkHeader';
import SellerQnaPageClientControl from '@/features/sellerQnaPageClientControl/sellerQnaPageClientControl';

export default function QnasSeller() {
  return (
    <>
      <LinkHeader title="상품 문의 내역" />

      <main className="p-4 flex flex-col gap-4">
        <SellerQnaPageClientControl />
      </main>
    </>
  );
}
