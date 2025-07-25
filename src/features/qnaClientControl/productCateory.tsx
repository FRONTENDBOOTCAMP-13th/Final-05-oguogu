'use client';
import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import { getPosts } from '@/shared/data/functions/post';
import { useAuthStore } from '@/shared/store/authStore';
import { QnaRes } from '@/shared/types/qna';
import { useEffect, useState } from 'react';

export default function ProductCategory({ _id, reviewCnt }: { _id: string; reviewCnt: number }) {
  const token = useAuthStore(state => state.token);

  const [qnaCnt, setQnaCnt] = useState(0);

  useEffect(() => {
    if (!token) return;
    const fetch = async () => {
      // QnA 데이터 요청
      const qnaRes: QnaRes = await getPosts('qna', token);
      const qnaCnt = (qnaRes?.item || []).filter(item => item.product_id === Number(_id)).length;
      setQnaCnt(qnaCnt);
    };
    fetch();
  }, [token, _id]);

  return (
    <>
      <TextCategoryForDetailPage _id={Number(_id)} reviewCnt={reviewCnt} qnaCnt={qnaCnt} />
    </>
  );
}
