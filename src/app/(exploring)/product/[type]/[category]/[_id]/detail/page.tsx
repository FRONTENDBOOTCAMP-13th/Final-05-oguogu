'use client';

import BuyBox from '@/components/elements/BuyBox/BuyBox';
import BuyModal from '@/components/elements/BuyModal/BuyModal';
import ProductDetailInfo from '@/components/elements/ProductDetailInfo/ProductDetailInfo';
import { getProduct } from '@/shared/data/functions/product';
import { Item } from '@/shared/types/product';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

{
  /* 
      <BuyBoxOption type="experience" name="감자 캐기 체험" price={10000} maxQuantity={4} />
      <BuyBoxOption type="gardening" name="초당옥수수 7월 수확" price={10000} /> */
}

const item: Item = {
  _id: 1,
  seller_id: 2,
  name: "남다른 쫀득함! 신품종 전남 해남 25년 '햇' 오색촬옥수수",
  content: '씹으면 씹을수록 느껴지는 달짝지근함과 쫀득쫀득한 찰진 식감',
  price: 29900,
  shippingFees: 3000,
  quantity: 1000,
  buyQuantity: 500,
  show: true,
  active: true,
  mainImages: [
    {
      // seller-${seller_id}-${productType}${_id}-${numbering}
      path: `/images/crop/crop-001.png`,
      name: 'image-1.jpg',
      originalname: '상품이미지-1.jpg',
    },
  ],
  createdAt: '2025.07.13 04:16:58',
  updatedAt: '2025.07.13 04:16:58',
  extra: {
    // 상품 타입 : 'crop' | 'experience' | 'gardening'
    productType: 'crop',

    // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
    category: 'veggie',

    // 3차 카테고리
    filter: ['옥수수'],

    // 원산지
    originPlace: '국산',

    // 생산지
    productionPlace: '전라남도 해남군',

    // 상품 구성
    composition: '30개입 * 1개',

    // 배송 관련 추가 정보
    deliveryInfo: '평일 1~2일 소요',

    // 찜 수
    likeCount: 12499,

    // 할인율
    dcRate: 35,

    // 최대 구매 가능 수량
    productCnt: 10,

    // 뱃지용
    isNew: false, // 신상품
    isInSeason: true, // 제철 상품 (농산물 전용)
    isBest: true, // 인기 상품
    isLowStock: false, // 품절 임박 상품
    isSold: false, // 품절 상품
  },
};

interface ProductDetailPageProps {
  params: Promise<{
    type: string;
    category: string;
    _id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [res, setRes] = useState<Item>();

  const { _id } = use(params);

  console.log('상품 ID:', _id);

  useEffect(() => {
    const getRes = async () => {
      const res = await getProduct(Number(_id));
      setRes(res);
    };
    getRes();
  }, []);
  console.log(res);

  if (!res) {
    return <div>상품 정보를 불러오는 중입니다...</div>; // ✅ 안전한 로딩 처리
  }

  const productType = res?.extra?.productType;
  console.log(productType);

  return (
    <div>
      <Image
        className="w-[320px] h-[320px] object-cover aspect-square"
        src={item.mainImages[0].path}
        alt={item.mainImages[0].originalname}
        width={320}
        height={320}
      />
      <section id="userInfo">
        <ProductDetailInfo type={productType} item={item} />
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
