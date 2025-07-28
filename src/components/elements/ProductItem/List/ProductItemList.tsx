'use client';
import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { ProductItemListType } from '@/components/elements/ProductItem/List/ProductItem.type';
import { getProducts } from '@/shared/data/functions/product';
import { Item, productsRes } from '@/shared/types/product';
import { useEffect, useState } from 'react';

export default function ProductItemList({ type }: ProductItemListType) {
  const [res, setRes] = useState<productsRes>();

  // 상품 api 초기 렌더링
  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setRes(data);
    };

    fetch();
  }, [type]);

  const cropData = res?.item
    .filter((item: Item) => item.name.includes('옥수수'))
    .filter((item: Item) => item.extra?.productType === 'crop')
    .sort((a: Item, b: Item) => b.extra!.likeCount - a.extra!.likeCount);

  const expData = res?.item
    .filter((item: Item) => item.extra?.productType === 'experience')
    .sort((a: Item, b: Item) => b.extra!.likeCount - a.extra!.likeCount);

  const gardeningData = res?.item
    .filter((item: Item) => item.extra?.productType === 'gardening')
    .sort((a: Item, b: Item) => b.extra!.likeCount - a.extra!.likeCount);

  return (
    <>
      {type === 'crop' ? (
        <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
          {cropData &&
            cropData
              .map((item: Item) => (
                <CropItem
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  bookmarks={item.bookmarks}
                  extra={item.extra}
                  seller={item.seller}
                  replies={item.replies}
                />
              ))
              .slice(0, 10)}
        </div>
      ) : type === 'experience' ? (
        <div className="flex gap-3  cursor-grab overflow-auto hide-scrollbar">
          {expData &&
            expData.map((item: Item) => (
              <ExperienceItem
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                bookmarks={item.bookmarks}
                extra={item.extra}
                seller={item.seller}
                replies={item.replies}
              />
            ))}
        </div>
      ) : type === 'gardening' ? (
        <div className="flex gap-3 cursor-grab overflow-auto hide-scrollbar">
          {gardeningData &&
            gardeningData.map((item: Item) => (
              <GardenItem
                key={item._id}
                _id={item._id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                bookmarks={item.bookmarks}
                extra={item.extra}
                seller={item.seller}
                replies={item.replies}
                quantity={item.quantity}
                buyQuantity={item.buyQuantity}
              />
            ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
