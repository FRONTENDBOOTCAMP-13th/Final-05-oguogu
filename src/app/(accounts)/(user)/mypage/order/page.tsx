import FilterButtonForMypage from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import CardItem from '@/components/elements/cardItem/cardItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function UserOrderList() {
  return (
    <>
      <LinkHeader title="주문정보" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        {/* 필터링 버튼 */}
        <div className="flex gap-1">
          <FilterButtonForMypage name="orderGroup" type="crop" title="농산물" isChecked={true} />
          <FilterButtonForMypage name="orderGroup" type="experience" title="체험" />
          <FilterButtonForMypage name="orderGroup" type="gardening" title="텃밭" />
        </div>

        {/* 주문 상세 내역: div 하위에 삼항연산자로 코드 작성 */}
        <div className="border-t border-t-oguogu-black pt-4 flex flex-col justify-start items-center gap-8">
          {/* 아무런 데이터가 없는 경우 */}
          <IsEmptyMessage
            title="주문 내역이 없습니다."
            subTxt="지금 바로 다양한 농산물 상품을 만나보세요!"
            LinkTxt="쇼핑 계속하기 🥕"
          />

          {/* 데이터가 있는 경우 */}
          <CardItem />
        </div>
      </main>
    </>
  );
}
