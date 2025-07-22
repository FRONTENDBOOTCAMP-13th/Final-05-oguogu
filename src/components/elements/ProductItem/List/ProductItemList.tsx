import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { ProductItemListType } from '@/components/elements/ProductItem/List/ProductItem.type';

export default function ProductItemList({ type }: ProductItemListType) {
  return (
    <>
      {type === 'crop' ? (
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
          <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
        </div>
      ) : type === 'experience' ? (
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
        </div>
      ) : type === 'gardening' ? (
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
