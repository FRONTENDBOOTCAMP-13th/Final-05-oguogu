import { getProducts } from '@/shared/data/functions/product';
import { getUsers } from '@/shared/data/functions/user';
import { Item } from '@/shared/types/product';
import { UserSellerType } from '@/shared/types/user';
import Link from 'next/link';

/**
 * 인기 텃밭 TOP 10 컴포넌트
 */
export default async function TopRatedItem() {
  // const userData = await getUsers();
  const productData = await getProducts();

  /* 판매자 데이터를 추출, postViews 속성을 기준으로 정렬하여 인덱스 0 ~ 9 까지 총 10개를 추출 */
  // const sellerList = userData.item
  //   .filter((data: UserSellerType) => data.type === 'seller')
  //   .filter((data: UserSellerType) => data.extra.businessInfo?.companyName)
  //   .sort((a: UserSellerType, b: UserSellerType) => b.postViews - a.postViews)
  //   .slice(0, 10);

  // const sellerListTop5 = sellerList.slice(0, 5);
  // const sellerListRest5 = sellerList.slice(5, 10);

  /* 상품 데이터를 추출, 판매량 기준으로 정렬하여 인덱스 0 ~ 9 까지 총 10개를 추출 */
  const productList = productData.item.sort((a: Item, b: Item) => b.buyQuantity! - a.buyQuantity!).slice(0, 10);

  return (
    <div className="w-full p-4 min-h-[calc(100vh-48px)]">
      <div className="mb-4">
        <p className="text-xl font-medium">판매량 급상승 농산물</p>
        <p className="text-sm text-oguogu-gray-4">지난 7일 동안 판매량이 급상승했어요!</p>
      </div>
      <div className="flex w-full gap-2" role="list" aria-label="인기 텃밭 순위">
        {/* Top 1~5 */}
        <ul className="flex flex-col gap-2">
          {/* {sellerListTop5.map((item: UserSellerType, index: number) => {
            return (
              <li
                key={item._id}
                className="flex items-center gap-2 p-3 transition-all shadow-sm cursor-pointer bg-oguogu-white rounded-xl hover:bg-gray-50 hover:shadow-md"
                role="listitem"
                tabIndex={0}
                // onClick={handleClick}
              >
                <span className="ml-1.5 font-medium text-md text-oguogu-main">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </span>
                <Link href={`/gardening/${item._id}`} className="flex items-center h-6">
                  {item.extra.businessInfo?.companyName ?? ''}
                </Link>
              </li>
            );
          })} */}
          {productList.map((item: Item, index: number) => {
            return (
              <li
                key={item._id}
                className="flex w-full items-center gap-2 p-3 transition-all shadow-sm cursor-pointer bg-oguogu-white rounded-lg hover:bg-gray-50 hover:shadow-md"
                role="listitem"
                tabIndex={0}
              >
                <span className="font-medium text-base text-oguogu-main w-6 text-center leading-none">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </span>
                {/* 해당 아이템의 _id 와 매칭하는 판매자 채널로 경로 설정 */}
                <div className="flex flex-col">
                  <span className="w-10 text-oguogu-gray-4 text-xs">
                    {item.extra?.productType === 'crop'
                      ? '농산물'
                      : item.extra?.productType === 'experience'
                        ? '체험'
                        : '텃밭'}
                  </span>
                  <Link href={`/search/result/${item._id}/detail`} className="line-clamp-1 text-base">
                    {item.name ?? ''}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Top 6~10 */}
        {/* <ul className="flex flex-col gap-2">
          {sellerListRest5.map((item: UserSellerType, index: number) => {
            return (
              <li
                key={item._id}
                className="flex items-center gap-2 p-3 transition-all shadow-sm cursor-pointer bg-oguogu-white rounded-xl hover:bg-gray-50 hover:shadow-md"
                role="listitem"
                tabIndex={0}
              >
                <span className="ml-1.5 font-medium text-md text-oguogu-main">{index + 6}</span>
                <Link href={`/gardening/${item._id}`} className="flex items-center h-6">
                  {item.extra.businessInfo?.companyName ?? ''}
                </Link>
              </li>
            );
          })}
        </ul> */}
      </div>
    </div>
  );
}
