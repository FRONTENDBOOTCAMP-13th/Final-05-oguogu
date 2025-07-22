import DeleteButton from '@/components/elements/DeleteButton/DeleteButton';
import { CheckButtonForMypage } from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';

export default function UserCartList() {
  return (
    <>
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        {/* 전체선택 및 삭제 버튼 */}
        <div className="flex justify-between gap-1">
          <CheckButtonForMypage name="cartGroup" type="selectAll" title="전체 선택" isChecked={false} />
          <DeleteButton />
        </div>

        {/* 주문 상세 내역: div 하위에 삼항연산자로 코드 작성 */}
        <div className="border-t border-t-oguogu-black pt-4 flex flex-col justify-start items-center gap-8">
          {/* 아무런 데이터가 없는 경우 */}
          <IsEmptyMessage
            title="장바구니에 담긴 상품이 없습니다."
            subTxt="원하는 상품을 장바구니에 담아보세요!"
            LinkTxt="쇼핑 계속하기 🥕"
          />

          {/* 데이터가 있는 경우 */}
        </div>
      </main>
    </>
  );
}
