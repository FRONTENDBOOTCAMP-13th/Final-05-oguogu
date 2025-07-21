import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { TextCategory } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';

// INFO DB 반영 시 상품 타입에 사용되는 Props 통일 필요

/**
 * 1차 카테고리 분류 항목으로 구성된 상품 탐색 목록 페이지
 * @description /product/[type]
 * @example /product/crop
 * @example /product/experience
 * @example /product/gardening
 */
export default function ProductListByType() {
  return (
    <>
      <CategoryHeader cartItemCount={100} />
      <TextCategory />
      <ProductSortbar />

      {/* 농산물(crop) 상품 */}
      <main className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-2 gap-y-8 px-4">
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
      </main>

      {/* 체험(experience) 상품 */}
      <main className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-x-2 gap-y-8 px-4">
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
      </main>

      {/* 텃밭(gardening) 상품 */}
      <main className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-x-2 gap-y-8 px-4">
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
      </main>
    </>
  );
}
