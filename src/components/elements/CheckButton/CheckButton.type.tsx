export default interface CheckButtonType {
  children: string;
  size: number;
  gap: number;
  agreement?: 'required' | 'optional';
  checked?: boolean;
  onChange?: () => void;
}
