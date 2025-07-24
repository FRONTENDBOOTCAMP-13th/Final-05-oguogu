import TopRatedItem from '@/components/elements/TopRatedItem/TopRatedItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';

export default function Search() {
  return (
    <>
      <SearchHeader />

      {/* 검색 버튼을 클릭했을 때, 해당 컴포넌트가 안보이고 상품 배열이 나타나는 형태로 구현 */}
      {/* 인기 텃밭 Top10 : URL 에 쿼리스트링이 있으면 숨김 */}
      <TopRatedItem />

      {/* 상품 목록 : URL 에 ?keyword={finKeyword} 형태로 키워드가 있을 때 해당 데이터와 일치하는 데이터를 추출 */}
      <main className="itemGrid grid-cols-[repeat(auto-fit,minmax(140px,1fr))]"></main>
    </>
  );
}
