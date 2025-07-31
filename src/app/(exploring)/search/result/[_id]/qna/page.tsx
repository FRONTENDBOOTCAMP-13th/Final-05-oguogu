import { QnaRes } from '@/shared/types/qna';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { Metadata } from 'next';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { getProduct } from '@/shared/data/functions/product';
import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import { getProductReplies } from '@/shared/data/functions/replies';
import { ReviewRes } from '@/shared/types/review';
import { getPosts } from '@/shared/data/functions/post';
import QnaItemList from '@/components/elements/QnaItem/QnaItemList';

/**
 * 특정 상품의 Q&A 목록을 표시하는 서버 컴포넌트입니다.
 * 상품 ID를 기반으로 Q&A 데이터를 필터링하여 렌더링합니다.
 *
 * @param {Object} props
 * @param {{ _id: string }} props.params - URL에서 전달된 상품 ID
 * @returns  Q&A 목록 UI
 */

export const metadata: Metadata = {
  title: '상품 Q&A | OguOgu',
  description: '상품에 대한 고객 문의 및 답변을 확인하고 작성할 수 있는 Q&A 페이지입니다.',
  keywords: ['상품', 'Q&A', '문의', '고객지원', 'OguOgu'],
};

export default async function ProductQna({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res: QnaRes = await getPosts('qna');
  const productRes = await getProduct(Number(_id));
  const productName = await productRes.item.name;

  // 리뷰 데이터 요청
  const reviewRes: ReviewRes = await getProductReplies(Number(_id));

  // 해당 상품의 QnA 개수 계산
  const qnaCnt = (res?.item || []).filter(item => item.product_id === Number(_id)).length;

  // 리뷰 개수
  const reviewCnt = reviewRes.item.length;

  return (
    <div className="flex flex-col min-h-screen bg-oguogu-white">
      <CategoryHeader title={productName} />
      <TextCategoryForDetailPage _id={Number(_id)} reviewCnt={reviewCnt} qnaCnt={qnaCnt} />
      <QnaItemList res={res} _id={_id} />
    </div>
  );
}
