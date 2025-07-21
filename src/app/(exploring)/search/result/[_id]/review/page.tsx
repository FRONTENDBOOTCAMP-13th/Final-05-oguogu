'use client';
import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';
import { ReviewSortbar } from '@/components/layouts/SortBar/Sortbar';
import { getProductReplies } from '@/shared/data/functions/replies';
import { useAuthStore } from '@/shared/store/authStore';
import { ReviewRes } from '@/shared/types/review';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

interface ProductDetailPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default function ProductReview({ params }: ProductDetailPageProps) {
  const isLoggedIn: boolean = useAuthStore(state => state.isLoggedIn);
  const { _id } = use(params);
  const [res, setRes] = useState<ReviewRes>();

  useEffect(() => {
    const getRes = async () => {
      const res = await getProductReplies(Number(_id));
      setRes(res);
    };
    getRes();
  }, [_id]);

  console.log('res', res);

  const ReviewList = res?.item.map(review => (
    <ReviewItem key={review._id} name={review.user.name} email="abcd@gamil.com" res={review} />
  ));
  return (
    <div>
      <ReviewSortbar />
      <div className="px-4 flex flex-col gap-4 mb-6">
        {isLoggedIn ? (
          <button className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center">
            리뷰 작성하기
          </button>
        ) : (
          <Link
            href="/login"
            className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
          >
            <p className="text-oguogu-main pr-1 ">로그인</p> 후 리뷰 작성하기
          </Link>
        )}
      </div>

      <section className="px-4 flex flex-col gap-8">{ReviewList}</section>
    </div>
  );
}
