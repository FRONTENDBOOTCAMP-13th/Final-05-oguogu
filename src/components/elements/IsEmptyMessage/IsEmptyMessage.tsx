import { IsEmptyMessageType } from '@/components/elements/IsEmptyMessage/IsEmptyMessage.type';
import Link from 'next/link';

/**
 * 빈 데이터(주문 내역 없음 등)를 사용자에게 안내하는 메시지 컴포넌트
 * @param {string} props.title - 사용자에게 보여줄 주요 메시지 (예: "주문 내역이 없습니다.")
 * @param {string} props.subTxt - 추가 설명 메시지 (예: "지금 바로 다양한 상품을 만나보세요!")
 * @param {string} props.LinkTxt - 버튼에 표시할 텍스트 (예: "쇼핑 계속하기 🥕")
 * @param {IsEmptyMessageType} props - 컴포넌트에 전달되는 props
 */
export default function IsEmptyMessage({ title, subTxt, LinkTxt, link = '/product/crop' }: IsEmptyMessageType) {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center mt-12">
        <div className="flex flex-col items-center">
          <p className="text-base mobile-max:text-xl">{title}</p>
          <p className="text-xs mobile-max:text-sm text-oguogu-gray-4">{subTxt}</p>
        </div>
        <Link
          href={link}
          className="text-xs py-1 px-8 mobile-max:text-sm border border-oguogu-main rounded-sm bg-oguogu-white"
        >
          {LinkTxt}
        </Link>
      </div>
    </>
  );
}
