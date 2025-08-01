import ProductDetailInfo from '@/components/elements/ProductDetailInfo/ProductDetailInfo';
import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';
import BuyModalAction from '@/features/buyModal/buyModalAction';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { getPosts } from '@/shared/data/functions/post';
import { getProduct } from '@/shared/data/functions/product';
import { getProductReplies } from '@/shared/data/functions/replies';
import { QnaRes } from '@/shared/types/qna';
import { ReviewRes } from '@/shared/types/review';
import { Metadata } from 'next';
import Image from 'next/image';

// SEO 최적화를 위한 메타데이터 동적 생성 (임시)
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { _id } = await params;
  const product = await getProduct(Number(_id));

  if (!product) {
    return {
      title: '상품 정보를 찾을 수 없습니다 | 오구오구',
      description: '존재하지 않는 상품이거나, 정보를 불러오는 중입니다.',
    };
  }

  const { name, content, image_url } = product.item;

  return {
    title: `${name} | 오구오구`,
    description: content || `${name} 상품의 자세한 정보를 확인해보세요.`,
    openGraph: {
      title: `${name} | 오구오구`,
      description: content || `${name} 상품의 자세한 정보를 확인해보세요.`,
      images: [
        {
          url: image_url || '/images/default-og-image.png', // 이미지 경로 수정 필요
          width: 800,
          height: 600,
          alt: `${name} 이미지`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | 오구오구`,
      description: content || `${name} 상품의 자세한 정보를 확인해보세요.`,
      images: [image_url || '/images/default-og-image.png'], //이미지 경로 수정 필요
    },
  };
}

/**
 * 상품 상세 페이지 컴포넌트입니다.
 * 서버 사이드에서 데이터를 불러와 상품 정보를 렌더링합니다.
 *
 * @param {Object} res
 * @param {{ _id: string }} res.params - URL에서 추출된 상품 ID
 * @returns 상품 상세 페이지 요소
 */

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res = await getProduct(Number(_id));

  if (!res) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
    // notFound();
  }

  // QnA 데이터 요청
  const qnaRes: QnaRes = await getPosts('qna');

  // 리뷰 데이터 요청
  const reviewRes: ReviewRes = await getProductReplies(Number(_id));

  // 해당 상품의 QnA 개수 계산
  const qnaCnt = (qnaRes?.item || []).filter(item => item.product_id === Number(_id)).length;

  // 리뷰 개수
  const reviewCnt = reviewRes.item.length;

  // 상품 타입
  const productType = await res.item.extra.productType;

  // 상품명
  const productName = await res.item.name;

  return (
    <>
      <CategoryHeader title={productName} />
      <TextCategoryForDetailPage _id={Number(_id)} reviewCnt={reviewCnt} qnaCnt={qnaCnt} />
      <Image
        className="w-full max-h-[480px] object-cover aspect-square"
        src="/images/crop/crop-001.png"
        alt="상품명"
        width={320}
        height={320}
      />
      <section id="userInfo">
        <ProductDetailInfo type={productType} item={res.item} />
      </section>
      <main className="flex items-center justify-center h-[1500px] bg-oguogu-gray-1">상품 상세 이미지</main>

      <BuyModalAction res={res} />
    </>
  );
}
