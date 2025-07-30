import Image from 'next/image';
import Link from 'next/link';

export default function GardenItemForMyGarden() {
  return (
    <>
      <Link
        href={`/mypage/mygarden/id`}
        className="flex justify-center items-center bg-oguogu-main-light border-2 border-oguogu-main rounded-lg relative min-w-[85px] w-full min-h-[85px] h-full aspect-square"
      >
        <div className="flex flex-col items-center gap-y-1 translate-y-1.5">
          <div className="w-7 h-7 mobile-max:w-10 mobile-max:h-10 flex items-center justify-center">
            <Image src={`/svgs/sowing.svg`} alt={`sowing`} width={56} height={56} className="" />
          </div>
          <div className="flex flex-col text-center">
            <p className="text-xs mobile-max:text-base">브로콜리</p>
            <p className="text-[10px] mobile-max:text-sm text-oguogu-main">파종</p>
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
