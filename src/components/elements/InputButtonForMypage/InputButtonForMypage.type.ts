export interface InputButtonForMypageType {
  name: string;
  type: string;
  title: string;
  isChecked?: boolean;
}

export interface CheckButtonForMypageType {
  name: string;
  type: string;
  title: string;
  isChecked?: boolean;
  selectAll: () => void;
}
