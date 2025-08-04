import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';
import { Metadata } from 'next';

export async function generateMetadata({ params }: QnaDetailPageProps): Promise<Metadata> {
  const { _id } = await params;
  const qnaRes: responsePostReplies = await getPosts('faq');
  const qna = qnaRes.item.find(item => item._id === Number(_id));

  if (!qna) {
    return {
      title: '질문을 찾을 수 없습니다 | 오구오구',
      description: '존재하지 않거나 삭제된 질문입니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { title, content } = qna;
  const desc = content.slice(0, 80).replace(/\n/g, ' ').trim();

  return {
    title: `${title} | 자주 묻는 질문 - 오구오구`,
    description: desc,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://final-05-oguogu.vercel.app/board/qna/${_id}`,
    },
    openGraph: {
      title: `${title} | 자주 묻는 질문 - 오구오구`,
      description: desc,
      type: 'article',
      url: `https://final-05-oguogu.vercel.app/board/qna/${_id}`,
    },
    twitter: {
      card: 'summary',
      title: `${title} | 오구오구`,
      description: desc,
    },
  };
}

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
          <div className="flex-shrink-0 w-[80px] text-oguogu-main ">{detailQna?.tag}</div>
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
