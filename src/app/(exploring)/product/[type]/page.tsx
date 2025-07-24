import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import ProductListClientControl from '@/features/productListClientControl/productListClientControl';
import { getProducts } from '@/shared/data/functions/product';
import { Item, productsRes } from '@/shared/types/product';
import { notFound } from 'next/navigation';

/**
 * product 상품 타입별 정적 페이지 생성
 */
/* export async function generateStaticParams() {
  const productParams = [{ type: 'crop' }, { type: 'experience' }, { type: 'gardening' }];
  return productParams;
}
 */

/**
 * 1차 카테고리 분류 항목으로 구성된 상품 탐색 목록 페이지
 * @example /product/crop
 * @example /product/experience
 * @example /product/gardening
 */
export default async function ProductListByType({ params }: { params: Promise<{ type: ProductType }> }) {
  const { type } = await params;
  const productsRes: productsRes = await getProducts();
  // console.log('products', productsRes);

  const productList = productsRes.item.filter((item: Item) => item.extra!.productType === type);
  const productCnt: number = productList.length;

  if (!['crop', 'experience', 'gardening'].includes(type)) {
    return notFound();
  }

  return (
    <>
      <ProductListClientControl productList={productList} productCnt={productCnt} type={type} />
    </>
  );
}
