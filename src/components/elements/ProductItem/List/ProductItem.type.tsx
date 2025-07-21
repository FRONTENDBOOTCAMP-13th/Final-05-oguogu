export interface ProductItemListType {
  type: 'crop' | 'experience' | 'gardening';
  count?: number; // 받아올 개별 아이템 개수
  // props 로 데이터 관련 속성을 받아 특정 요건에 맞는 데이터 추출
}
