import { BuyBoxOptionExtraItemType } from '@/components/elements/BuyBoxForMobile/BuyBoxOptionExtraItem.type';

/**
 * 체험형 상품의 날짜 및 시간 선택용 라디오 버튼 아이템 컴포넌트
 * 남은 자리가 있으면 선택 가능하고, 없으면 비활성화 상태로 렌더링
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {string} props.date - 표시할 날짜 문자열 (예: '7월 27일 (토)')
 * @param {string} props.time - 표시할 시간 문자열 (예: '10:00')
 * @param {number} props.count - 남은 예약 가능 수량 (0이면 품절 처리)
 * @returns {JSX.Element} 날짜/시간 선택용 라디오 버튼 요소
 */
export default function BuyBoxOptionExtraItem({ date, time, count }: BuyBoxOptionExtraItemType) {
  return (
    <>
      {count > 0 ? (
        <label className="cursor-pointer">
          <input type="radio" name="timeOption" value={`${date} ${time}`} className="peer hidden" />
          <div className="w-[100px] border peer-checked:border-oguogu-main-dark  border-oguogu-gray-2 rounded-lg p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-oguogu-black">{date}</p>
              <p className="text-xs text-oguogu-gray-4">{time}</p>
            </div>
            <p className="text-sm">{count} 자리 남음</p>
          </div>
        </label>
      ) : (
        <label className="cursor-not-allowed">
          <input type="radio" name="timeOption" value="2025-07-27-10" className="hidden" disabled />
          <div className="w-[100px] border border-oguogu-gray-2 bg-oguogu-gray-1 rounded-lg p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-oguogu-black">{date}</p>
              <p className="text-xs text-oguogu-gray-4">{time}</p>
            </div>
            <p className="text-sm">품절</p>
          </div>
        </label>
      )}
    </>
  );
}
