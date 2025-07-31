import { getUsers } from '@/shared/data/functions/user';
import { UserSeller } from '@/shared/types/user';
import Link from 'next/link';

/**
 * 인기 텃밭 TOP 10 컴포넌트
 */
export default async function TopRatedItem() {
  const res = await getUsers();

  /* 판매자 데이터를 추출, postViews 속성을 기준으로 정렬하여 인덱스 0 ~ 9 까지 총 10개를 추출 */
  const sellerList = res.item
    .filter((data: UserSeller) => data.type === 'seller')
    .filter((data: UserSeller) => data.extra.businessInfo?.companyName)
    .sort((a: UserSeller, b: UserSeller) => b.postViews - a.postViews)
    .slice(0, 10);

  const sellerListTop5 = sellerList.slice(0, 5);
  const sellerListRest5 = sellerList.slice(5, 10);

  return (
    <div className="w-full p-4 min-h-[calc(100vh-48px)]">
      <p className="mb-4 text-lg font-medium">인기 텃밭 순위 TOP10</p>
      <div className="grid grid-cols-2 gap-2" role="list" aria-label="인기 텃밭 순위">
        {/* Top 1~5 */}
        <ul className="flex flex-col gap-2">
          {sellerListTop5.map((item: UserSeller, index: number) => {
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
                {/* 해당 아이템의 _id 와 매칭하는 판매자 채널로 경로 설정 */}
                <Link href={`/gardening/${item._id}`} className="flex items-center h-6">
                  {item.extra.businessInfo?.companyName ?? ''}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Top 6~10 */}
        <ul className="flex flex-col gap-2">
          {sellerListRest5.map((item: UserSeller, index: number) => {
            // if (item.extra.businessName) {
            return (
              <li
                key={item._id}
                className="flex items-center gap-2 p-3 transition-all shadow-sm cursor-pointer bg-oguogu-white rounded-xl hover:bg-gray-50 hover:shadow-md"
                role="listitem"
                tabIndex={0}
                // onClick={handleClick}
              >
                <span className="ml-1.5 font-medium text-md text-oguogu-main">{index + 6}</span>
                <Link href={`/gardening/${item._id}`} className="flex items-center h-6">
                  {item.extra.businessInfo?.companyName ?? ''}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
