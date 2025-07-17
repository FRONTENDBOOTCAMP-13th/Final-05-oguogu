export interface ProductLinkType {
  keywordParams?: string;
  typeParams?: string;
  linkTitle: string;
  type: 'watch' | 'direct' | 'do' | 'buy';
  src: string;
}
