import { getPosts } from '@/shared/data/functions/post';
import QnaItem from '@/components/elements/QnaItem/QnaItem';
import { QnaSortBar } from '@/components/layouts/SortBar/Sortbar';
import QnaClientControls from '@/features/qnaClientControl/qnaClientControl';
import { QnaRes } from '@/shared/types/qna';
import { ProductDetailPageProps } from '@/features/types/productDetail';

/**
 * 특정 상품의 Q&A 목록을 표시하는 서버 컴포넌트입니다.
 * 상품 ID를 기반으로 Q&A 데이터를 필터링하여 렌더링합니다.
 *
 * @param {Object} props
 * @param {{ _id: string }} props.params - URL에서 전달된 상품 ID
 * @returns  Q&A 목록 UI
 */

export default async function ProductQna({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res: QnaRes = await getPosts('qna');

  const qnaList = res?.item
    .filter(item => item.product_id === Number(_id))
    .map(item => <QnaItem key={item._id} state={true} isPrivate={false} viewerRole="other" res={item} />);

  return (
    <div className="flex flex-col">
      <QnaSortBar qnaCnt={qnaList.length} />
      <QnaClientControls />
      <section>{qnaList}</section>
    </div>
  );
}
