import QnaItem from '@/components/elements/boardItem/qnaItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { getPosts } from '@/shared/data/functions/post';
import { responsePostReplies } from '@/shared/types/post';

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
