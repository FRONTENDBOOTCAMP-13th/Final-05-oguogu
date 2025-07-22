import { IsEmptyMessageType } from '@/components/elements/IsEmptyMessage/IsEmptyMessage.type';
import Link from 'next/link';

export default function IsEmptyMessage({ title, subTxt, LinkTxt }: IsEmptyMessageType) {
  return (
    <>
      {/* 아무런 데이터가 없는 경우 */}
      <div className="flex flex-col gap-4 items-center justify-center mt-12">
        <div className="flex flex-col items-center">
          <p className="text-base mobile-max:text-xl">{title}</p>
          <p className="text-xs mobile-max:text-sm text-oguogu-gray-4">{subTxt}</p>
        </div>
        <Link
          href="/product/crop"
          className="text-xs py-1 px-8 mobile-max:text-sm border border-oguogu-main rounded-sm bg-oguogu-white"
        >
          {LinkTxt}
        </Link>
      </div>
    </>
  );
}
