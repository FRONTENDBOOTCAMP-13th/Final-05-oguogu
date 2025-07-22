export interface HeaderProps {
  cartItemCount?: number;
}

export interface SearchHeaderProps extends HeaderProps {
  _id: string;
}

export interface EtcHeaderProps {
  title: string;
}
