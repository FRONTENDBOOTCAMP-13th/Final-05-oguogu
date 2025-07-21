'use client';
import { TopItem } from "@/components/elements/TopRatedItem/TopRatedItem.type";

// 랭크별 아이콘 반환 함수
const getRankIcon = (rank: number): string => {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '';
  }
};

/**
 * 개별 텃밭 항목 렌더링 컴포넌트
 * @param item - 텃밭 정보
 */
export function TopRatedListItem({ item }: { item: TopItem }) {
  const handleClick = () => {
    console.log(`클릭된 텃밭: ${item.name}`);
    // 상세 페이지 이동 추가 작업
  };

  // 1,2,3위는 숫자 숨기고 아이콘만 표시
  const showRankNumber = ![1, 2, 3].includes(item.rank);

  return (
    <li
      className="flex items-center gap-2 p-3 transition-all shadow-sm cursor-pointer bg-oguogu-white rounded-xl hover:bg-gray-50 hover:shadow-md"
      role="listitem"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="flex items-center gap-1">
        {showRankNumber && (
          <span className="ml-1.5 font-medium text-md text-oguogu-main" aria-label={`${item.rank}위`}>
            {item.rank}
          </span>
        )}
        <span className="flex items-center h-6">{getRankIcon(item.rank)}</span>
      </span>
      <span className="text-xs truncate">{item.name}</span>
    </li>
  );
}
