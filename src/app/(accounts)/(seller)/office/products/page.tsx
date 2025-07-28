import ProductItemListForSeller from '@/components/elements/ProductItem/List/ProductItemListForSeller';

export default function ProductsForSeller() {
  return (
    <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
      <h1>판매자 상품 관리 페이지</h1>
      <ProductItemListForSeller />
      <ProductItemListForSeller />
      <ProductItemListForSeller />
      <ProductItemListForSeller />
    </main>
  );
}
