import NoticeItem from '@/components/elements/boardItem/noticeItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';

export default async function Notice() {
  const noticeRes: responsePostReplies = await getPosts('notice');

  const noticeList = await noticeRes.item.map(item => (
    <NoticeItem key={item._id} type={item.tag} title={item.title} date={item.createdAt} _id={item._id} />
  ));
  return (
    <>
      <LinkHeader title="공지사항" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="flex justify-between gap-2 border-b border-oguogu-gray-4 pb-1 mb-2 text-[12px] text-oguogu-gray-4">
          <div className="flex-shrink-0 w-[60px] ">구분</div>
          <div className="truncate min-w-0 flex-1 ">제목</div>
          <div className="flex-shrink-0 w-[90px] ">날짜</div>
        </div>
        <div className="flex flex-col gap-2">{noticeList}</div>
      </main>
    </>
  );
}
