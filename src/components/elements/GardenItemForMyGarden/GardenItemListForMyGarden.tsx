'use client';

import GardenItemForMyGarden, {
  EmptyGardenItemForMyGarden,
} from '@/components/elements/GardenItemForMyGarden/GardenItemForMyGarden';
import { getOrders } from '@/shared/data/functions/order';
import { useAuthStore } from '@/shared/store/authStore';
import { Order, OrderedProduct } from '@/shared/types/order';
import { useEffect, useState } from 'react';

export default function GardenItemListForMyGarden() {
  const [gardenProducts, setGardenProducts] = useState<OrderedProduct[]>([]);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    if (token === null) return;

    const getGardeningOrders = async () => {
      const res = await getOrders(token);
      const data = res.item.filter(
        (item: Order) => item.state !== 'refundInProgress' && item.state !== 'refundCompleted',
      );

      console.log('data', data);

      /* OrderProduct 배열만 추출해서 별도 배열로 저장 */
      const newData = data.map((item: Order) => item.products);

      /* OrderProduct 를 담을 빈 배열 선언 */
      const allProducts: OrderedProduct[] = [];

      /* for ... of 문으로 OrderProduct 를 하나의 배열로 담기 */
      for (const productArray of newData) {
        for (const product of productArray) {
          allProducts.push(product);
        }
      }

      /* allProducts 에서 productType 이 'gardening'인 경우만 추출 */
      const allGardeningProducts = allProducts.filter((item: OrderedProduct) => item.extra.productType === 'gardening');

      setGardenProducts(allGardeningProducts);
    };

    getGardeningOrders();
  }, [token]);

  return (
    <>
      {gardenProducts.length < 60 && (
        <>
          {gardenProducts.map((item: OrderedProduct, index: number) => (
            <GardenItemForMyGarden key={index} id={item._id} name={item.name} period={item.extra.period!} />
          ))}
          {Array.from({ length: Math.max(0, 60 - gardenProducts.length) }).map((_, idx) => (
            <EmptyGardenItemForMyGarden key={`empty-${idx}`} />
          ))}
        </>
      )}
    </>
  );
}
