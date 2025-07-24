import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { ProductItemListType } from '@/components/elements/ProductItem/List/ProductItem.type';
import { getProducts } from '@/shared/data/functions/product';
import { Item } from '@/shared/types/product';

export default async function ProductItemList({ type }: ProductItemListType) {
  const res = await getProducts();

  const cropData = res.item
    .filter((item: Item) => item.name.includes('옥수수'))
    .filter((item: Item) => item.extra?.productType === 'crop')
    .sort((a: Item, b: Item) => a.extra!.likeCount < b.extra!.likeCount);
  console.log(cropData);

  const expData = res.item
    .filter((item: Item) => item.extra?.productType === 'experience')
    .sort((a: Item, b: Item) => a.extra!.likeCount < b.extra!.likeCount);
  console.log(expData);

  const gardeningData = res.item
    .filter((item: Item) => item.extra?.productType === 'gardening')
    .sort((a: Item, b: Item) => a.extra!.likeCount < b.extra!.likeCount);
  console.log(gardeningData);

  return (
    <>
      {type === 'crop' ? (
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          {cropData
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
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          {expData.map((item: Item) => (
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
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          {gardeningData.map((item: Item) => (
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
