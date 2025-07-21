export interface Keyword {
  name: string;
  type: string;
}

export default interface RelatedKeywordItemProps {
  keywords: Keyword[];
  onKeywordClick?: (keyword: Keyword) => void;
}