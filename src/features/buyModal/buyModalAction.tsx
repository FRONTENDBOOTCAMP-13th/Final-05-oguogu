'use client';

import { useState } from 'react';
import BuyBox from '@/components/elements/BuyBox/BuyBox';
import BuyModal from '@/components/elements/BuyModal/BuyModal';
import { productRes } from '@/shared/types/product';
import CartSuccessModal from '@/components/layouts/Modal/CartSuccessModal';

export default function BuyModalAction({ res }: { res: productRes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const productType = res.item.extra!.productType;

  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <>
      {/* 장바구니 담기 성공 모달 */}
      <CartSuccessModal open={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />

      {isModalOpen && <div className="fixed inset-0 bg-black/80 z-40" onClick={() => setIsModalOpen(false)} />}
      {isModalOpen && (
        <BuyModal type={productType} onClose={() => setIsModalOpen(false)} res={res} onSuccess={handleSuccess} />
      )}
      {!isModalOpen && <BuyBox onOpenModal={() => setIsModalOpen(true)} res={res} />}
    </>
  );
}
