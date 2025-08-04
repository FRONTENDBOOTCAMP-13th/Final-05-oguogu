import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';
import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { ReviewSortbar } from '@/components/layouts/SortBar/Sortbar';
// import ReviewClientControl from '@/features/reviewClientControl/reviewClientControl';
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

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { _id } = await params;
  const productRes = await getProduct(Number(_id));

  if (!productRes) {
    return {
      title: '상품 리뷰 | 오구오구',
      description: '해당 상품의 리뷰 정보를 불러올 수 없습니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { name, content } = productRes.item;
  const url = `https://final-05-oguogu.vercel.app/search/result/${_id}/review`;
  const image_url = productRes.item.mainImages?.[0]?.path || '/images/default-og-image.png';

  return {
    title: `${name} 리뷰 | 오구오구`,
    description: content
      ? `${name}에 대한 리뷰를 확인해보세요.`
      : `실제 고객들이 평가한 ${name} 리뷰를 확인하고 구매에 참고하세요.`,
    keywords: [name, '리뷰', '평점', '후기', '고객 리뷰', '오구오구'],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${name} 리뷰 | 오구오구`,
      description: content
        ? `${name} 상품에 대한 리뷰입니다.`
        : `실제 구매자들의 ${name} 사용 후기와 평점을 확인하세요.`,
      url,
      type: 'article',
      images: [
        {
          url: image_url,
          width: 800,
          height: 600,
          alt: `${name} 대표 이미지`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} 리뷰 | 오구오구`,
      description: content
        ? `${name} 상품 리뷰를 확인해보세요.`
        : `${name}에 대해 고객들이 어떻게 평가했는지 확인해보세요.`,
      images: [image_url],
    },
  };
}

export default async function ProductReview({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res: ReviewRes = await getProductReplies(Number(_id));

  const ReviewList = res?.item.map(review => (
    <ReviewItem key={review._id} name={review.user.name} email="abcd@gamil.com" res={review} />
  ));

  /*  // 이미지 바이너리 소스 요청하기
  const imageResponse = getfileName(); */

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
    <div className="min-h-screen bg-oguogu-white flex flex-col">
      <CategoryHeader title={productName} />
      <TextCategoryForDetailPage _id={Number(_id)} reviewCnt={reviewCnt} qnaCnt={qnaCnt} />
      <ReviewSortbar reviewAvg={average.toFixed(1)} />
      <div className="px-4 flex flex-col gap-4 mb-2">{/* <ReviewClientControl /> */}</div>

      <section className="px-4 flex flex-col">
        {ReviewList.length ? (
          ReviewList
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20 text-oguogu-gray-3">
            <p className="text-lg mb-2">아직 작성된 리뷰가 없습니다.</p>
            <p className="text-sm">상품을 사용해 보신 후 리뷰를 남겨주세요!</p>
          </div>
        )}
      </section>
    </div>
  );
}
