'use client';

import { useState } from 'react';
import BuyBox from '@/components/elements/BuyBox/BuyBox';
import BuyModal from '@/components/elements/BuyModal/BuyModal';
import { productRes } from '@/shared/types/product';

export default function BuyModalAction({ res }: { res: productRes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productType = res.item.extra!.productType;

  return (
    <>
      {isModalOpen && <div className="fixed inset-0 bg-black/80 z-40" onClick={() => setIsModalOpen(false)} />}
      {isModalOpen && <BuyModal type={productType} onClose={() => setIsModalOpen(false)} res={res} />}
      {!isModalOpen && <BuyBox onOpenModal={() => setIsModalOpen(true)} res={res} />}
    </>
  );
}
