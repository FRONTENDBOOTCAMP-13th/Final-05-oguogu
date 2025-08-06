import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';
import { Metadata } from 'next';

export async function generateMetadata({ params }: NoticeDetailPageProps): Promise<Metadata> {
  const { _id } = await params;
  const noticeRes: responsePostReplies = await getPosts('notice');
  const notice = noticeRes.item.find(item => item._id === Number(_id));

  if (!notice) {
    return {
      title: '공지사항을 찾을 수 없습니다 | 오구텃밭',
      description: '존재하지 않는 공지글입니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { title, content } = notice;
  const desc = content.slice(0, 80).replace(/\n/g, ' ').trim();

  return {
    title: `${title} | 공지사항 - 오구텃밭`,
    description: desc,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://final-05-oguogu.vercel.app/board/notice/${_id}`,
    },
    openGraph: {
      title: `${title} | 공지사항 - 오구텃밭`,
      description: desc,
      type: 'article',
      url: `https://final-05-oguogu.vercel.app/board/notice/${_id}`,
    },
    twitter: {
      card: 'summary',
      title: `${title} | 오구텃밭`,
      description: desc,
    },
  };
}

export interface NoticeDetailPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { _id } = await params;

  const noticeRes: responsePostReplies = await getPosts('notice');
  /* const notice = noticeRes.item.find(item => item._id === Number(_id)); */
  /* const formattedDate = format(notice!.createdAt, 'yyyy.MM.dd'); */

  const detailNotice = noticeRes.item.find(item => item._id === Number(_id));

  return (
    <>
      <LinkHeader title="공지사항" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="flex flex-col border-b border-oguogu-gray-4 pb-3 mb-2 text-base">
          <div className="flex-shrink-0  text-oguogu-main ">{detailNotice?.tag}</div>
          <div className="flex items-end">
            <h2 className="truncate min-w-0 flex-1 text-oguogu-black ">{detailNotice?.title}</h2>
            <div className="flex-shrink-0 text-oguogu-gray-4 text-[12px]">
              &nbsp;&nbsp;{detailNotice?.createdAt.split(' ')[0]}
            </div>
          </div>
        </div>
        <div className="text-base leading-[140%] mt-6">
          {detailNotice?.content
            .split('.')
            .filter(Boolean)
            .map((line, i) => (
              <div key={i}>
                <p className="whitespace-pre-wrap break-word text-oguogu-black">{line.trim()}.</p>
                <br />
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
