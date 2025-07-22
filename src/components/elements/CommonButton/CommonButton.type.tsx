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
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
