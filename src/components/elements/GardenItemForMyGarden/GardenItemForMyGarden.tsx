import { periodObject } from '@/shared/types/product';
import getDaysFromToday from '@/utils/getDaysFromToday/getDaysFromToday';
import Image from 'next/image';
import Link from 'next/link';

export default function GardenItemForMyGarden({
  name,
  period,
  id,
}: {
  name: string;
  period: periodObject[];
  id: number;
}) {
  /* period 의 status 값을 추출, 포함 여부를 검증하여 가장 마지막 데이터를 렌더링 */
  const allStatus = period?.map((item: periodObject) => item.status);

  let lastStatus = '파종';
  allStatus?.map((status: string) =>
    status.includes('harvest')
      ? (lastStatus = '수확 완료')
      : status.includes('growing')
        ? (lastStatus = '성장')
        : status.includes('sprouting')
          ? (lastStatus = '발아')
          : (lastStatus = '파종'),
  );

  /* 판매자가 업로드한 최근 게시물의 날짜가 오늘 기준 3일 이내일 때 색으로 표시하는 기능 */
  // const lastDate = ['2025-07-31']; // -> 테스트용
  const lastDate = period?.map((item: periodObject) => item.date) ?? 1;
  const getDaysFromLastDate = Number(getDaysFromToday(lastDate).pop()) ?? 1;

  let isRecent = false;
  if (getDaysFromLastDate < 0) {
    isRecent = false;
  } else if (getDaysFromLastDate === 0 && getDaysFromLastDate < 5) {
    isRecent = true;
  } else {
    isRecent = false;
  }

  return (
    <>
      <Link
        href={`/mypage/mygarden/${id}`}
        className="flex justify-center items-center bg-oguogu-main-light border-2 border-oguogu-main rounded-lg relative min-w-[85px] w-full min-h-[85px] h-full aspect-square"
      >
        <div className="flex flex-col items-center gap-y-1 translate-y-1">
          <div className="w-7 h-7 mobile-max:w-10 mobile-max:h-10 flex items-center justify-center">
            <Image
              src={`/svgs/${lastStatus === '수확 완료' ? 'harvested' : lastStatus === '성장' ? 'growing' : lastStatus === '발아' ? 'sprouting' : 'seeding'}.svg`}
              alt={`${lastStatus}`}
              width={56}
              height={56}
              className=""
            />
          </div>
          <div className="flex flex-col text-center">
            <p className="text-xs mobile-max:text-base">{name}</p>
            <p className="text-[10px] mobile-max:text-sm text-oguogu-main">{lastStatus}</p>
          </div>
        </div>
        <div
          className={`w-5 h-5 border-2 bg-oguogu-${isRecent ? 'yellow' : 'gray-2'} border-oguogu-main-light absolute rounded-3xl top-0 right-0 translate-y-[-10px] translate-x-1/2 mobile-max:border-3`}
        ></div>
      </Link>
    </>
  );
}

export function EmptyGardenItemForMyGarden() {
  return (
    <div className="flex justify-center items-center bg-[linear-gradient(to_bottom_right,rgba(250,250,250,0.2),rgba(250,250,250,0.8))] border-1 border-dashed border-oguogu-gray-2 rounded-lg relative min-w-[85px] w-full min-h-[85px] h-full aspect-square"></div>
  );
}
