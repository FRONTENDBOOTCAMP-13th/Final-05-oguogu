'use client';

import QnaItem from '@/components/elements/QnaItem/QnaItem';
import { QnaSortBar } from '@/components/layouts/SortBar/Sortbar';
import { getPosts } from '@/shared/data/functions/post';
import { useAuthStore } from '@/shared/store/authStore';
import { QnaRes } from '@/shared/types/qna';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

{
  /* <BuyBoxOption type="crop" name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} maxQuantity={10} />
      <BuyBoxOption type="experience" name="감자 캐기 체험" price={10000} maxQuantity={4} />
      <BuyBoxOption type="gardening" name="초당옥수수 7월 수확" price={10000} /> */
}

interface ProductDetailPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default function ProductQna({ params }: ProductDetailPageProps) {
  const isLoggedIn: boolean = useAuthStore(state => state.isLoggedIn);
  const { _id } = use(params);
  const [res, setRes] = useState<QnaRes>();

  useEffect(() => {
    const getRes = async () => {
      const res = await getPosts('qna');
      setRes(res);
    };
    getRes();
  }, []);

  // id는 사용자 인지 검증할때 사용하기 위함. zustand에 저장한 _id 값이랑 비교 하는 과정이 필요합니다. 비밀글 때문에
  console.log(_id, res);

  const qnaList = res?.item.map(
    item =>
      item.product_id === Number(_id) && (
        <QnaItem key={item._id} state={true} isPrivate={false} viewerRole="other" res={item} />
      ),
  );
  return (
    <div className="flex flex-col">
      <QnaSortBar />
      <div className="px-4 flex flex-col gap-4 mb-6">
        {isLoggedIn ? (
          <button className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer">
            문의글 작성하기
          </button>
        ) : (
          <Link
            href="/login"
            className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
          >
            <p className="text-oguogu-main-dark pr-1 ">로그인</p> 후 문의글 작성하기
          </Link>
        )}
      </div>

      <section>{qnaList}</section>
    </div>
  );
}
