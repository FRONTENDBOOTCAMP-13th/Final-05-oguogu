import { getUsers } from '@/shared/data/functions/user';
import { UserSeller } from '@/shared/types/user';

/**
 * 인기 텃밭 TOP 10 컴포넌트
 */
export default async function TopRatedItem() {
  const res = await getUsers();

  /* 판매자 데이터를 추출, postViews 속성을 기준으로 정렬하여 인덱스 0 ~ 9 까지 총 10개를 추출 */
  const sellerList = res.item
    .filter((data: UserSeller) => data.type === 'seller')
    .sort((a: UserSeller, b: UserSeller) => b.postViews - a.postViews)
    .slice(0, 10);

  return (
    <div className="w-full p-4 min-h-[calc(100vh-48px)]">
      <p className="mb-4 text-lg font-medium">인기 텃밭 순위 TOP10</p>
      <ul className="grid grid-cols-2 gap-2" role="list" aria-label="인기 텃밭 순위">
        {/* 데이터 중 item.extra.businessName 데이터 소실된 경우는 미포함 */}
        {sellerList.map((item: UserSeller, index: number) => {
          // if (item.extra.businessName) {
          return (
            <li
              key={item._id}
              className="flex items-center gap-2 p-3 transition-all shadow-sm cursor-pointer bg-oguogu-white rounded-xl hover:bg-gray-50 hover:shadow-md"
            >
              <span className="ml-1.5 font-medium text-md text-oguogu-main">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </span>
              <span className="flex items-center h-6">{item.extra.businessName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
