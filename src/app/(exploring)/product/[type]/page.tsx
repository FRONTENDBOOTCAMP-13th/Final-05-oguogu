import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';
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

  return (
    <>
      {/* 헤더 */}
      <CategoryHeader cartItemCount={100} />

      {/* 네비게이션 */}
      <TextCategory />

      {/* 정렬 */}
      <ProductSortbar />

      {type === 'crop' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        </main>
      ) : type === 'experience' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        </main>
      ) : type === 'gardening' ? (
        <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
          <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        </main>
      ) : (
        notFound()
      )}
    </>
  );
}
