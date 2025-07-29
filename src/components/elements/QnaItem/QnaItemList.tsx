'use client';

import QnaItem from '@/components/elements/QnaItem/QnaItem';
import { QnaSortBar } from '@/components/layouts/SortBar/Sortbar';
import { useAuthStore } from '@/shared/store/authStore';
import { QnaRes } from '@/shared/types/qna';
import { useState } from 'react';

export default function QnaItemList({ res, _id }: { res: QnaRes; _id: string }) {
  const [isMyPost, setIsMyPost] = useState(false);
  const { userInfo } = useAuthStore();

  const qnaList = res?.item
    .filter(item => item.product_id === Number(_id))
    .map(item => (
      <QnaItem key={item._id} state={item.repliesCount !== 0} isPrivate={false} viewerRole="other" res={item} />
    ));

  const filteredQna = res.item.filter(item => item.product_id === Number(_id));
  const myQna = filteredQna.filter(item => item.user._id === userInfo?._id);

  return (
    <>
      <QnaSortBar qnaCnt={isMyPost ? myQna.length : qnaList.length} isMyPost={isMyPost} setIsMyPost={setIsMyPost} />
      <section>
        {qnaList.length ? (
          isMyPost ? (
            myQna.map(item => (
              <QnaItem key={item._id} state={item.repliesCount !== 0} isPrivate={false} viewerRole="other" res={item} />
            ))
          ) : (
            qnaList
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-oguogu-gray-3 py-20">
            <p className="text-lg mb-2">아직 등록된 문의가 없습니다.</p>
            <p className="text-sm">상품에 대해 궁금한 점을 문의해보세요!</p>
          </div>
        )}
      </section>
    </>
  );
}
