import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import { getPosts } from '@/shared/data/functions/post';
import { getProductReplies } from '@/shared/data/functions/replies';
import { QnaRes } from '@/shared/types/qna';
import { ReviewRes } from '@/shared/types/review';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ _id: string }>;
}

/**
 * 상품 상세 페이지의 루트 레이아웃 컴포넌트
 *
 * - QnA 및 리뷰 데이터를 가져와 카테고리 헤더 및 카운트 정보를 제공합니다.
 * - 하위 섹션(children)을 포함합니다.
 *
 * @param {LayoutProps} props - 레이아웃 컴포넌트의 props
 * @param {Promise<{ _id: string }>} props.params - URL 파라미터 (_id)
 * @param {React.ReactNode} props.children - 내부 콘텐츠
 */

export default async function RootLayout({ children, params }: LayoutProps) {
  const { _id } = await params;

  // QnA 데이터 요청
  const qnaRes: QnaRes = await getPosts('qna');

  // 리뷰 데이터 요청
  const reviewRes: ReviewRes = await getProductReplies(Number(_id));

  // 해당 상품의 QnA 개수 계산
  const qnaCnt = (qnaRes?.item || []).filter(item => item.product_id === Number(_id)).length;

  // 리뷰 개수
  const reviewCnt = reviewRes.item.length;

  return (
    <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">
      <CategoryHeader _id={_id} />
      <TextCategoryForDetailPage _id={Number(_id)} reviewCnt={reviewCnt} qnaCnt={qnaCnt} />
      {children}
    </div>
  );
}
