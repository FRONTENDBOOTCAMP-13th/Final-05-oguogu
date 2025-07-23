export interface keywordState {
  originKeyword: string | null;

  saveKeyword: (keyword: string) => void;
  clearKeyword: () => void;
}
