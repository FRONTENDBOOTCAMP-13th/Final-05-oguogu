import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';
import { getProducts } from '@/shared/data/functions/product';
import { productsRes } from '@/shared/types/product';
import { notFound } from 'next/navigation';

/**
 * product 상품 타입별 정적 페이지 생성
 */
export async function generateStaticParams() {
  const productParams = [{ type: 'crop' }, { type: 'experience' }, { type: 'gardening' }];
  return productParams;
}

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

  const productList = productsRes.item.filter(item => item.extra!.productType === type);
  const productCnt: number = productList.length;

  return (
    <>
      {/* 헤더 */}
      <CategoryHeader
        cartItemCount={100}
        title={type === 'crop' ? '농산물' : type === 'experience' ? '체험' : type === 'gardening' ? '텃밭' : '오구텃밭'}
      />

      {/* 네비게이션 */}
      <TextCategory />

      {/* 정렬 */}
      <ProductSortbar cnt={productCnt} />

      {type === 'crop' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          {productList.map(item => (
            <CropItem
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price * (1 - item.extra!.dcRate / 100)}
              rating={item.rating}
              replies={item.replies}
              extra={item.extra}
              seller={item.seller}
              bookmarks={item.bookmarks}
            />
          ))}
        </main>
      ) : type === 'experience' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
          {productList.map(item => (
            <ExperienceItem
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price * (1 - item.extra!.dcRate / 100)}
              item={item}
            />
          ))}
        </main>
      ) : type === 'gardening' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          {productList.map(item => (
            <GardenItem
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price * (1 - item.extra!.dcRate / 100)}
              item={item}
            />
          ))}
        </main>
      ) : (
        notFound()
      )}
    </>
  );
}
