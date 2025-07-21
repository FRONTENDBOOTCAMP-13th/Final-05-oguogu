import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';
import { ProductSortbar } from '@/components/layouts/SortBar/Sortbar';

export default function SearchResult() {
  return (
    <>
      {/* 헤더 */}
      <SearchHeader _id="1" cartItemCount={99} />

      {/* 정렬 */}
      <ProductSortbar />

      {/* 농산물(crop) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
      </main>

      {/* 체험(experience) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
      </main>

      {/* 텃밭(gardening) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
        <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />
      </main>
    </>
  );
}
