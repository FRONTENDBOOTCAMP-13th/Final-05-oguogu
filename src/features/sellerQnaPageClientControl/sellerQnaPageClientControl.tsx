'use client';
import SellerQnaOption from '@/components/elements/OrderOption/sellerQnaOption';

import SellerQnaItem from '@/components/elements/QnaItem/SellerQnaItem';
import { getPosts } from '@/shared/data/functions/post';
import { useAuthStore } from '@/shared/store/authStore';
import { responsePostReplies } from '@/shared/types/post';

import { useEffect, useState } from 'react';

const orderOptions = [
  { label: '전체', value: 'all' },
  { label: '답변 대기중', value: 'waiting' },
  { label: '답변 완료', value: 'finish' },
];

export default function SellerQnaPageClientControl() {
  const token = useAuthStore(state => state.token);
  const seller_id = useAuthStore(state => state.userInfo?._id);

  const [qnaRes, setQnaRes] = useState<responsePostReplies>();
  const [selected, setSelected] = useState(orderOptions[0]);

  useEffect(() => {
    if (token === null) return;

    const fetch = async () => {
      const data: responsePostReplies = await getPosts('qna', token);

      if (data.ok) {
        setQnaRes(data);
      }
    };

    fetch();
  }, [token]);

  const qnaList = qnaRes?.item.filter(item => item.seller_id === seller_id);
  console.log(qnaList);

  const fillterQnaList = qnaList?.filter(item =>
    selected.value === 'all' ? item : selected.value === 'waiting' ? item.repliesCount === 0 : item.repliesCount !== 0,
  );

  return (
    <>
      <SellerQnaOption selected={selected} setSelected={setSelected} orderOptions={orderOptions} />
      {fillterQnaList?.map(item => (
        <SellerQnaItem
          key={item._id}
          state={item.repliesCount !== 0}
          isPrivate={false}
          viewerRole="other"
          itemRes={item}
        />
      ))}
    </>
  );
}
