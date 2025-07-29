import LinkHeader from '@/components/layouts/Header/LinkHeader';
import ProductItemListForSeller from '@/components/elements/ProductItem/List/ProductItemListForSeller';

export default function ProductsForSeller() {
  return (
    <LinkHeader title="상품 관리" />;
    <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
      <h1>판매자 상품 관리 페이지</h1>
      <ProductItemListForSeller />
      <ProductItemListForSeller />
      <ProductItemListForSeller />
      <ProductItemListForSeller />
    </main>
  );
}
