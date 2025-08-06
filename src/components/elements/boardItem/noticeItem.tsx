'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NoticeItemType {
  type: string;
  title: string;
  date: string;
  _id: number;
}


export default function NoticeItem({ type, title, date, _id }: NoticeItemType) {
  const pathname = usePathname();


  return (
    <>
      <div className="flex justify-between gap-2 text-[12px] text-oguogu-black">
        <div className={`flex-shrink-0 w-[60px] ${type === '공지' && 'text-oguogu-main'} `}>{type}</div>
        <Link href={`/board/notice/${_id}`} className="truncate min-w-0 flex-1 text-left">
          {pathname.includes('/board') ? <h2>{title}</h2> : <h3>{title}</h3>}
        </Link>
        <div className="flex-shrink-0 w-[70px] ">{date.split(' ')[0]}</div>
      </div>
    </>
  );
}
