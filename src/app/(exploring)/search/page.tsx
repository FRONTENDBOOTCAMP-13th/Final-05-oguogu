import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import TopRatedItem from '@/components/elements/TopRatedItem/TopRatedItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';

export default function Search() {
  return (
    <>
      <SearchHeader />
      {/* 검색 버튼을 클릭했을 때, 해당 컴포넌트가 안보이고 상품 배열이 나타나는 형태로 구현 */}
      <TopRatedItem />

      {/* 농산물(crop) 상품 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
        <CropItem _id={1} name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} />
      </main>
    </>
  );
}
