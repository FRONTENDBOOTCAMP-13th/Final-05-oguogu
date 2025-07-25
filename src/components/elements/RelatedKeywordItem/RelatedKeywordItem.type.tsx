export interface RelatedKeyword {
  name: string;
  type?: 'gardening' | 'experience' | 'normal'; // '텃밭' 키워드 식별용
}

export default interface RelatedKeywordItemProps {
  keywords: RelatedKeyword[];
  onKeywordClick?: (keyword: RelatedKeyword) => void;
}