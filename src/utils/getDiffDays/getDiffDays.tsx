import { Item } from '@/shared/types/product';

/**
 * 현재 날짜와 마감 날짜의 차이를 계산하여 number 타입의 값으로 반환하는 함수
 * @returns {number}
 */
export default function getDiffDays(item: Item) {
  const deadline = item.extra!.deadline;
  const today = new Date();

  if (!deadline) {
    return <span>마감일 정보 없음</span>;
  }
  const endDate = new Date(deadline);

  // 하루 = 1000ms * 60s * 60min * 24h
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
