import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';

export interface NoticeDetailPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { _id } = await params;

  const noticeRes: responsePostReplies = await getPosts('notice');

  const detailNotice = noticeRes.item.find(item => item._id === Number(_id));

  return (
    <>
      <LinkHeader title="공지사항" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="flex justify-between gap-2 border-b border-oguogu-gray-4 pb-1 mb-2 text-[16px] items-end ">
          <div className="flex-shrink-0 w-[60px] text-oguogu-main ">{detailNotice?.tag}</div>
          <div className="truncate min-w-0 flex-1 text-oguogu-black ">{detailNotice?.title}</div>
          <div className="flex-shrink-0 w-[90px] text-oguogu-gray-4 text-[12px]">2025.08.02</div>
        </div>
        <div className="text-[12px] leading-[140%] mt-5">
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
