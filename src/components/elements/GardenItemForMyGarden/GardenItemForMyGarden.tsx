import { periodObject } from '@/shared/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function GardenItemForMyGarden({ name, period, id }: { name: string; period: []; id: number }) {
  const allStatus = period.map((item: periodObject) => item.status);

  /* period 의 status 값을 추출, 포함 여부를 검증하여 가장 마지막 데이터를 렌더링 */
  let lastStatus = '';
  allStatus.map((status: string) =>
    status.includes('harvest')
      ? (lastStatus = '수확 완료')
      : status.includes('growing')
        ? (lastStatus = '성장')
        : status.includes('sprouting')
          ? (lastStatus = '발아')
          : (lastStatus = '파종'),
  );

  return (
    <>
      <Link
        href={`/mypage/mygarden/${id}`}
        className="flex justify-center items-center bg-oguogu-main-light border-2 border-oguogu-main rounded-lg relative min-w-[85px] w-full min-h-[85px] h-full aspect-square"
      >
        <div className="flex flex-col items-center gap-y-1 translate-y-1.5">
          <div className="w-7 h-7 mobile-max:w-10 mobile-max:h-10 flex items-center justify-center">
            <Image src={`/svgs/sowing.svg`} alt={`sowing`} width={56} height={56} className="" />
          </div>
          <div className="flex flex-col text-center">
            <p className="text-xs mobile-max:text-base">{name}</p>
            <p className="text-[10px] mobile-max:text-sm text-oguogu-main">{lastStatus}</p>
          </div>
        </div>
        <div className="w-4 h-4 border-2 bg-oguogu-yellow border-oguogu-main-light absolute rounded-3xl bottom-0 right-0 translate-1/2 mobile-max:w-6 mobile-max:h-6 mobile-max:border-3"></div>
      </Link>
    </>
  );
}

export function EmptyGardenItemForMyGarden() {
  return (
    <div className="flex justify-center items-center bg-[linear-gradient(to_bottom_right,rgba(250,250,250,0.2),rgba(250,250,250,0.8))] border-1 border-dashed border-oguogu-main rounded-lg relative min-w-[85px] w-full min-h-[85px] h-full aspect-square"></div>
  );
}
