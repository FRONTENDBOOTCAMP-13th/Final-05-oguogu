import { TopItem, TopRatedItemProps } from '@/components/elements/TopRatedItem/TopRatedItem.type';
import { TopRatedListItem } from '@/components/elements/TopRatedItem/TopRatedListItem';

// 인기 텃밭 TOP 10의 기본 데이터
const defaultTopItems: TopItem[] = [
  { id: '1', name: '돌쇠네농산물', rank: 1 },
  { id: '2', name: '중앙청과', rank: 2 },
  { id: '3', name: '홍자매농원', rank: 3 },
  { id: '4', name: '프레델', rank: 4 },
  { id: '5', name: '야채도사', rank: 5 },
  { id: '6', name: '프룻대디', rank: 6 },
  { id: '7', name: '마르쉐', rank: 7 },
  { id: '8', name: '오롯유통', rank: 8 },
  { id: '9', name: '투지팜', rank: 9 },
  { id: '10', name: '큰고을농원', rank: 10 },
];

/**
 * 인기 텃밭 TOP 10 컴포넌트
 * @param items - 표시할 텃밭 리스트
 * @param title - 컴포넌트 제목
 * @param maxItems - 최대 표시 항목 수
 */
export default function TopRatedItem({
  items = defaultTopItems,
  title = '인기 텃밭 TOP 10',
  maxItems = 10,
}: TopRatedItemProps) {
  // 최대 maxItems 만큼만 표시
  const totalItems = items.slice(0, maxItems);

  // 리스트를 좌/우로 분할
  const midPoint = Math.ceil(totalItems.length / 2);
  const leftItems = totalItems.slice(0, midPoint);
  const rightItems = totalItems.slice(midPoint);

  return (
    <div className="w-full p-3 mx-auto ">
      <h2 className="mb-4 text-lg font-medium">{title}</h2>
      <div className="grid grid-cols-2 gap-2" role="list" aria-label="인기 텃밭 순위">
        {/* 왼쪽 리스트 */}
        <ul className="space-y-2">
          {leftItems.map((item: TopItem) => (
            <TopRatedListItem key={item.id} item={item} />
          ))}
        </ul>
        {/* 오른쪽 리스트 */}
        <ul className="space-y-2">
          {rightItems.map((item: TopItem) => (
            <TopRatedListItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
