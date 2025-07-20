import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';

export default function Title({
  title = '제목',
  content = '부제목',
  type,
}: {
  title?: string;
  content?: string;
  type?: string;
}) {
  let itemType;

  if (type === 'crop') {
    itemType = (
      <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice={11800} />
      </div>
    );
  } else if (type === 'basic') {
    return (
      <div>
        <p className="text-[20px] text-oguogu-black">{title}</p>
        <p className={`text-[14px] text-oguogu-gray-4`}>{content}</p>
      </div>
    );
  } else if (type === 'experience') {
    itemType = (
      <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
        <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" originPrice={10000} />
      </div>
    );
  } else {
    itemType = <GardenItem _id={1} name="초당옥수수 7월 수확" originPrice={10000} />;
  }

  return (
    <article className="flex flex-col justify-center px-4 py-7 mobile-max:pt-12">
      <div className="pb-6 mobile-max:text-center">
        <p className="text-xl text-oguogu-black mobile-max:text-2xl">{title}</p>
        <p className="text-sm text-oguogu-gray-4 mobile-max:text-base">{content}</p>
      </div>
      {itemType}
    </article>
  );
}
