'use client';

import BuyBox from '@/components/elements/BuyBox/BuyBox';
import BuyModal from '@/components/elements/BuyModal/BuyModal';
import ProductDetailInfo from '@/components/elements/ProductDetailInfo/ProductDetailInfo';
import Image from 'next/image';
import { useState } from 'react';

{
  /* 
      <BuyBoxOption type="experience" name="감자 캐기 체험" price={10000} maxQuantity={4} />
      <BuyBoxOption type="gardening" name="초당옥수수 7월 수확" price={10000} /> */
}

export default function ProductDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productType = 'gardening';
  return (
    <div>
      <Image
        className="w-[320px] h-[320px] object-cover aspect-square"
        src="/images/crop/crop-001.png"
        alt="상품명"
        width={320}
        height={320}
      />
      <section id="userInfo">
        <ProductDetailInfo type={productType} />
      </section>
      <div className="flex items-center justify-center h-[1500px] bg-oguogu-gray-1">상품 상세 이미지</div>

      {/* 블러 및 오버레이 */}
      {isModalOpen && <div className="fixed inset-0 bg-black/80 z-40" onClick={() => setIsModalOpen(false)} />}

      {/* 모달 */}
      {isModalOpen && <BuyModal type={productType} onClose={() => setIsModalOpen(false)} />}
      {!isModalOpen && <BuyBox onOpenModal={() => setIsModalOpen(true)} />}
    </div>
  );
}
