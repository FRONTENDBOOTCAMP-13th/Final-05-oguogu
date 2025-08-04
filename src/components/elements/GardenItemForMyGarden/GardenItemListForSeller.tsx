'use client';

import { EmptyGardenItemForMyGarden } from '@/components/elements/GardenItemForMyGarden/GardenItemForMyGarden';
import GardenItemForSeller from '@/components/elements/GardenItemForMyGarden/GardenItemForSeller';
import { getProducts } from '@/shared/data/functions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { Item } from '@/shared/types/product';
import { useEffect, useState } from 'react';

export default function GardenItemListForSeller() {
  const [gardenProducts, setGardenProducts] = useState<Item[]>([]);
  const token = useAuthStore(state => state.token);
  const userId = useAuthStore(state => state.userInfo?._id);

  useEffect(() => {
    if (token === null) return;

    const getGardeningList = async () => {
      const res = await getProducts();

      /* type 이 'gardening'인 상품만 추출해서 별도 배열로 저장 */
      const newData = res.item
        .filter((item: Item) => item.seller_id === userId)
        .filter((item: Item) => item.extra?.productType === 'gardening');

      setGardenProducts(newData);
    };

    getGardeningList();
  }, [token]);

  return (
    <>
      {gardenProducts.length < 60 && (
        <>
          {gardenProducts.map((item: Item, index: number) => (
            <GardenItemForSeller key={index} id={item._id} name={item.name} period={item.extra?.period ?? []} />
          ))}
          {Array.from({ length: Math.max(0, 60 - gardenProducts.length) }).map((_, idx) => (
            <EmptyGardenItemForMyGarden key={`empty-${idx}`} />
          ))}
        </>
      )}
    </>
  );
}
