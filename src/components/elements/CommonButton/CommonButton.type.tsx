import { ReactNode } from 'react';

export default interface CommonButtonProps {
  feature: string;
  textSize: string;
  height: string;
  width?: string;
  bgColor?: string;
  icon?: ReactNode;
  textColor?: string;
  cursorPointer?: boolean;
  borderColor?: string;
  border?: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}
