'use client';

import BuyBox from '@/components/elements/BuyBox/BuyBox';
import BuyModal from '@/components/elements/BuyModal/BuyModal';
import ProductDetailInfo from '@/components/elements/ProductDetailInfo/ProductDetailInfo';
import { getProduct } from '@/shared/data/functions/product';
import { res } from '@/shared/types/product';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

interface ProductDetailPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [res, setRes] = useState<res>();

  /*   // 전역관리 테스트
  const { setToken, setUserInfo } = useAuthStore.getState(); */

  const { _id } = use(params);

  useEffect(() => {
    const getRes = async () => {
      const res = await getProduct(Number(_id));
      setRes(res);
    };
    getRes();
  }, [_id]);

  if (!res) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  const product = res;
  const productType = res.item.extra.productType;
  console.log('product', product);
  console.log('product.extra.type', res.item.extra.productType);
  console.log('product.name', res.item.name);

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
      {isModalOpen && <div className="fixed inset-0 bg-black/80 z-40" onClick={() => setIsModalOpen(false)} />}

      {/* 모달 */}
      {isModalOpen && <BuyModal type={productType} onClose={() => setIsModalOpen(false)} res={res} />}
      {!isModalOpen && <BuyBox onOpenModal={() => setIsModalOpen(true)} />}
    </>
  );
}
