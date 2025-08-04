import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import ProductListClientControl from '@/features/productListClientControl/productListClientControl';
import { getProducts } from '@/shared/data/functions/product';
import { Item, productsRes } from '@/shared/types/product';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

/* export async function generateMetadata({ params }: { params: { type: ProductType } }): Promise<Metadata> {
  const { type } = params; 

  const base = {
    crop: {
      title: '농산물 상품 | 오구오구',
      description: '산지에서 신선하게 배송되는 제철 농산물을 확인해보세요.',
      keywords: ['농산물', '제철 채소', '산지직송', '신선식품'],
      url: 'https://final-05-oguogu.vercel.app/product/crop',
    },
    experience: {
      title: '농촌 체험 상품 | 오구오구',
      description: '온 가족이 즐길 수 있는 1일 농장 체험부터 수확 체험까지 확인해보세요.',
      keywords: ['농촌 체험', '주말 나들이', '농장 방문', '아이들과 체험'],
      url: 'https://final-05-oguogu.vercel.app/product/experience',
    },
    gardening: {
      title: '텃밭 분양 상품 | 오구오구',
      description: '씨앗부터 수확까지, 텃밭 히스토리를 통해 나만의 농작물을 키워보세요.',
      keywords: ['텃밭', '도시농부', '주말농장', '자급자족', '식물 키우기'],
      url: 'https://final-05-oguogu.vercel.app/product/gardening',
    },
  };

  const meta = base[type];

  // 혹시 잘못된 type이 들어왔을 경우 방어처리
  if (!meta) {
    return {
      title: '상품 | 오구오구',
      description: '다양한 농산물과 체험 상품을 둘러보세요.',
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords, '오구오구'],
    alternates: {
      canonical: meta.url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}
 */
/**
 * product 상품 타입별 정적 페이지 생성
 */
export async function generateStaticParams() {
  const productParams = [{ type: 'crop' }, { type: 'experience' }, { type: 'gardening' }];
  return productParams;
}

/**
 * 1차 카테고리 분류 항목으로 구성된 상품 탐색 목록 페이지
 * @example /product/crop
 * @example /product/experience
 * @example /product/gardening
 */
export default async function ProductListByType({ params }: { params: Promise<{ type: ProductType }> }) {
  const { type } = await params;
  const productsRes: productsRes = await getProducts();

  const productList = productsRes.item.filter((item: Item) => item.extra!.productType === type);
  const productCnt: number = productList.length;

  if (!['crop', 'experience', 'gardening'].includes(type)) {
    return notFound();
  }

  return (
    <>
      <Suspense>
        <ProductListClientControl productList={productList} productCnt={productCnt} type={type} />
      </Suspense>
    </>
  );
}
