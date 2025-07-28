export interface keywordState {
  originKeyword: string[];

  saveKeyword: (keyword: string) => void;
  clearKeyword: () => void;
}
