import CropItem from '@/components/elements/ProductItem/CropItem/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/ExperienceItem/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/SubscribeItem/GardenItem';

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
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" originPrice="11800" />
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
        <ExperienceItem />
        <ExperienceItem />
        <ExperienceItem />
        <ExperienceItem />
        <ExperienceItem />
      </div>
    );
  } else {
    itemType = <GardenItem />;
  }

  return (
    <article className="flex flex-col justify-center px-4 py-7">
      <div className="pb-6">
        <p className="text-[20px] text-oguogu-black">{title}</p>
        <p className={`text-[14px] text-oguogu-gray-4`}>{content}</p>
      </div>
      {itemType}
    </article>
  );
}
