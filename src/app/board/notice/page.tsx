import NoticeItem from '@/components/elements/boardItem/noticeItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '공지사항 | 오구텃밭',
  description: '오구텃밭에서 알려드리는 중요한 소식과 안내를 확인하세요.',
  keywords: ['오구텃밭', '공지사항', '알림', '소식'],
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/board/notice',
  },
  openGraph: {
    title: '공지사항 | 오구텃밭',
    description: '오구텃밭에서 알려드리는 중요한 소식과 안내를 확인하세요.',
    url: 'https://final-05-oguogu.vercel.app/board/notice',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: '공지사항 | 오구텃밭',
    description: '오구텃밭에서 알려드리는 중요한 소식과 안내를 확인하세요.',
  },
};

export default async function Notice() {
  const noticeRes: responsePostReplies = await getPosts('notice');

  const noticeList = noticeRes.item.map(item => {
    return <NoticeItem key={item._id} type={item.tag} title={item.title} date={item.createdAt} _id={item._id} />;
  });

  return (
    <>
      <LinkHeader title="공지사항" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="flex justify-between gap-2 border-b border-oguogu-gray-4 pb-1 mb-2 text-[12px] text-oguogu-gray-4">
          <div className="flex-shrink-0 w-[60px] ">구분</div>
          <div className="truncate min-w-0 flex-1 ">제목</div>
          <div className="flex-shrink-0 w-[70px] ">날짜</div>
        </div>
        <div className="flex flex-col gap-4">{noticeList}</div>
      </main>
    </>
  );
}
