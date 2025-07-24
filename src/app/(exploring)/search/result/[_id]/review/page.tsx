import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';
import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ReviewSortbar } from '@/components/layouts/SortBar/Sortbar';
import ReviewClientControl from '@/features/reviewClientControl/reviewClientControl';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { getPosts } from '@/shared/data/functions/post';
import { getProduct } from '@/shared/data/functions/product';
import { getProductReplies } from '@/shared/data/functions/replies';
import { QnaRes } from '@/shared/types/qna';
import { ReviewRes } from '@/shared/types/review';
import { Metadata } from 'next';

/**
 * 특정 상품의 리뷰 목록을 렌더링하는 서버 컴포넌트입니다.
 * 상품 ID를 기준으로 해당 리뷰 데이터를 불러오고, 리스트로 출력합니다.
 *
 * @param {Object} props
 * @param {{ _id: string }} props.params - 동적 라우트에서 전달된 상품 ID
 * @returns  리뷰 목록 UI
 */

export const metadata: Metadata = {
  title: '상품 리뷰 | OguOgu',
  description: '상품에 대한 실제 구매자들의 리뷰를 확인하고 평가할 수 있는 리뷰 페이지입니다.',
  keywords: ['상품', '리뷰', '평점', '고객 후기', 'OguOgu'],
};

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

  const productRes = await getProduct(Number(_id));
  const productName = await productRes.item.name;

  // QnA 데이터 요청
  const qnaRes: QnaRes = await getPosts('qna');

  // 해당 상품의 QnA 개수 계산
  const qnaCnt = (qnaRes?.item || []).filter(item => item.product_id === Number(_id)).length;

  // 리뷰 개수
  const reviewCnt = res.item.length;

  return (
    <div>
      <CategoryHeader title={productName} />
      <TextCategoryForDetailPage _id={Number(_id)} reviewCnt={reviewCnt} qnaCnt={qnaCnt} />
      <ReviewSortbar reviewAvg={average} />
      <div className="px-4 flex flex-col gap-4 mb-6">
        <ReviewClientControl />
      </div>

      <section className="px-4 flex flex-col gap-8">{ReviewList}</section>
    </div>
  );
}
