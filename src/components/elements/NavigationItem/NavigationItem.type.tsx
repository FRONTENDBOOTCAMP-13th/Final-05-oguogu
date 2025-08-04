export interface NavigationItemType {
  item: string;
  link: string;
  isSelected: boolean;
  onSelect: () => void;
}
