'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface QnaItemType {
  type: string;
  title: string;

  _id: number;
}

export default function QnaItem({ type, title, _id }: QnaItemType) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-start gap-2 text-[12px] text-oguogu-black">
        <div className="flex-shrink-0 w-[60px]">{type}</div>
        <Link href={`/board/qna/${_id}`} className="truncate min-w-0 flex-1 text-oguogu-black hover:underline">
          {pathname.includes('/board') ? <h2>{title}</h2> : <h3>{title}</h3>}
        </Link>
      </div>
    </>
  );
}
