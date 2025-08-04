import QnaItem from '@/components/elements/boardItem/qnaItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문 | 오구오구',
  description: '오구오구 고객님들이 자주 찾는 질문과 답변을 확인해보세요.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/board/qna',
  },
  openGraph: {
    title: '자주 묻는 질문 | 오구오구',
    description: '배송, 주문, 회원 정보 등 자주 묻는 질문들을 모았습니다.',
    url: 'https://final-05-oguogu.vercel.app/board/qna',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '자주 묻는 질문 | 오구오구',
    description: '궁금한 점이 있다면 FAQ에서 먼저 확인해보세요!',
  },
};

export default async function QnA() {
  const qnaRes: responsePostReplies = await getPosts('faq');

  const qnaList = await qnaRes.item.map(item => (
    <QnaItem key={item._id} type={item.tag} title={item.title} _id={item._id} />
  ));

  return (
    <>
      <LinkHeader title="자주 묻는 질문" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="flex justify-between gap-2 border-b border-oguogu-gray-4 pb-1 mb-2 text-[12px] text-oguogu-gray-4">
          <div className="flex-shrink-0 w-[60px] ">구분</div>
          <div className="truncate min-w-0 flex-1 ">제목</div>
        </div>
        <div className="flex flex-col gap-2">{qnaList}</div>
      </main>
    </>
  );
}
