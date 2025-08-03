import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';

export interface QnaDetailPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default async function QnaDetailPage({ params }: QnaDetailPageProps) {
  const { _id } = await params;

  const qnaRes: responsePostReplies = await getPosts('faq');

  const detailQna = qnaRes.item.find(item => item._id === Number(_id));

  return (
    <>
      <LinkHeader title="자주 묻는 질문" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="flex justify-between gap-2 border-b border-oguogu-gray-4 pb-1 mb-2 text-[16px] items-end ">
          <div className="flex-shrink-0 w-[60px] text-oguogu-main ">{detailQna?.tag}</div>
          <div className="truncate min-w-0 flex-1 text-oguogu-black ">{detailQna?.title}</div>
        </div>
        <div className="text-[12px] leading-[140%] mt-5">
          {detailQna?.content
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
