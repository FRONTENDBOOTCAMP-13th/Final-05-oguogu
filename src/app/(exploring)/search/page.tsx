import TopRatedItem from '@/components/elements/TopRatedItem/TopRatedItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';

export default function Search() {
  return (
    <>
      <SearchHeader />

      {/* 검색 버튼을 클릭했을 때, 해당 컴포넌트가 안보이고 상품 배열이 나타나는 형태로 구현 */}
      {/* 인기 텃밭 Top10 : URL 에 쿼리스트링이 있으면 숨김 */}
      <TopRatedItem />
    </>
  );
}
