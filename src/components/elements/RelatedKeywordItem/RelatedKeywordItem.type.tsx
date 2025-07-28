export interface RelatedKeyword {
  name: string;
  _id: number;
  type?: 'gardening' | 'experience' | 'normal'; // '텃밭' 키워드 식별용
}

export default interface RelatedKeywordItemProps {
  keywords: RelatedKeyword[];
  onKeywordClick?: (keyword: RelatedKeyword) => void;
}
