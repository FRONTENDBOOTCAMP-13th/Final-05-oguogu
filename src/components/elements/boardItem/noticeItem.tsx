import Link from 'next/link';

export interface NoticeItemType {
  type: string;
  title: string;
  date: string;
  _id: number;
}

export default function NoticeItem({ type, title, date = '2025.08.02', _id }: NoticeItemType) {
  return (
    <>
      <div className="flex justify-between gap-2 text-[12px] text-oguogu-black">
        <div className={`flex-shrink-0 w-[60px] ${type === '공지' && 'text-oguogu-main'} `}>{type}</div>
        <Link href={`/board/notice/${_id}`} className="truncate min-w-0 flex-1 text-left">
          {title}
        </Link>
        <div className="flex-shrink-0 w-[70px] ">{date.split(' ')[0]}</div>
      </div>
    </>
  );
}
