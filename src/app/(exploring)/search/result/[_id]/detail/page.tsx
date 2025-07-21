import ProductDetailInfo from '@/components/elements/ProductDetailInfo/ProductDetailInfo';
import BuyModalAction from '@/features/buyModal/buyModalAction';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { getProduct } from '@/shared/data/functions/product';
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
 * @param {Object} props
 * @param {{ _id: string }} props.params - URL에서 추출된 상품 ID
 * @returns 상품 상세 페이지 요소
 */

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res = await getProduct(Number(_id));

  if (!res) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  const productType = await res.item.extra.productType;

  return (
    <>
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
      <div className="flex items-center justify-center h-[1500px] bg-oguogu-gray-1">상품 상세 이미지</div>

      {/* 블러 및 오버레이 */}
      <BuyModalAction res={res} />
    </>
  );
}
