import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';
import { ReviewSortbar } from '@/components/layouts/SortBar/Sortbar';
import ReviewClientControl from '@/features/reviewClientControl/reviewClientControl';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { getProductReplies } from '@/shared/data/functions/replies';
import { ReviewRes } from '@/shared/types/review';

/**
 * 특정 상품의 리뷰 목록을 렌더링하는 서버 컴포넌트입니다.
 * 상품 ID를 기준으로 해당 리뷰 데이터를 불러오고, 리스트로 출력합니다.
 *
 * @param {Object} props
 * @param {{ _id: string }} props.params - 동적 라우트에서 전달된 상품 ID
 * @returns  리뷰 목록 UI
 */

export default async function ProductReview({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res: ReviewRes = await getProductReplies(Number(_id));

  // 리뷰 리스트
  const ReviewList = res?.item.map(review => (
    <ReviewItem key={review._id} name={review.user.name} email="abcd@gamil.com" res={review} />
  ));

  // 리뷰 평점 계산
  const ratings = res.item.map(item => item.rating); // 평점만 추출 → [5, 4, 3, ...]
  const total = ratings.reduce((acc, cur) => acc + cur, 0); // 전체 합산
  const average = ratings.length > 0 ? total / ratings.length : 0;

  return (
    <div>
      <ReviewSortbar reviewAvg={average} />
      <div className="px-4 flex flex-col gap-4 mb-6">
        <ReviewClientControl />
      </div>

      <section className="px-4 flex flex-col gap-8">{ReviewList}</section>
    </div>
  );
}
