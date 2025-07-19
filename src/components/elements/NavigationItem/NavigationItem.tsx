import { NavigationItemType } from '@/components/elements/NavigationItem/NavigationItem.type';
import Link from 'next/link';

export default function NavigationItem({ item, type, isSelected = false }: NavigationItemType) {
  return (
    <li>
      <Link href={`/${type}`}>
        {isSelected ? (
          <span className="text-oguogu-white bg-oguogu-main-dark px-2 py-1.5 rounded-2xl">{item}</span>
        ) : (
          item
        )}
      </Link>
    </li>
  );
}
