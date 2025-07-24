export interface InputButtonForMypageType {
  name: string;
  type: string;
  title: string;
  isChecked?: boolean;
  onClick?: () => void;
}

export interface CheckButtonForMypageType {
  name: string;
  type: string;
  title: string;
  isChecked?: boolean;
  selectAll: () => void;
}
