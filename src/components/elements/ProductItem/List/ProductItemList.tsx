import CropItem from '@/components/elements/ProductItem/Item/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/Item/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/Item/GardenItem';
import { ProductItemListType } from '@/components/elements/ProductItem/List/ProductItem.type';
import { getProducts } from '@/shared/data/functions/product';
import { Item } from '@/shared/types/product';

export default async function ProductItemList({ type }: ProductItemListType) {
  const res = await getProducts();
  const filteredData = res.item
    .filter((item: Item) => item.name.includes('옥수수'))
    .filter((item: Item) => item.extra?.productType === 'crop')
    .sort((a: Item, b: Item) => a.extra!.likeCount < b.extra!.likeCount);
  console.log(filteredData);

  return (
    <>
      {type === 'crop' ? (
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          {filteredData
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
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
          <ExperienceItem _id={1} name="[7/25] 감자캐기 체험" price={10000} />
        </div>
      ) : type === 'gardening' ? (
        <div className="flex gap-3 overflow-x-scroll cursor-grab select-none no-scrollbar">
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
          <GardenItem _id={1} name="초당옥수수 7월 수확" price={10000} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
