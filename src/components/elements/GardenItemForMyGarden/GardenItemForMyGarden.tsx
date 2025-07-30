import Image from 'next/image';
import Link from 'next/link';

export default function GardenItemForMyGarden() {
  return (
    <>
      <Link
        href={`/mypage/mygarden/id`}
        className="flex justify-center items-center bg-oguogu-main-light border-2 border-oguogu-main rounded-lg relative min-w-[85px] w-full min-h-[85px] h-full aspect-square"
      >
        <div className="flex flex-col items-center gap-y-2 translate-y-1.5">
          <Image src={`/svgs/sowing.svg`} alt={`sowing`} width={28} height={28} />
          <div className="flex flex-col text-center">
            <p className="text-xs">브로콜리</p>
            <p className="text-[10px] text-oguogu-main">파종</p>
          </div>
        </div>
        <div className="w-4 h-4 border-2 bg-oguogu-yellow border-oguogu-main-light absolute rounded-3xl bottom-0 right-0 translate-1/2"></div>
      </Link>
    </>
  );
}
