import { NavigationItemType } from '@/components/elements/NavigationItem/NavigationItem.type';
import Link from 'next/link';

export default function NavigationItem({ item, link, isSelected, onSelect }: NavigationItemType) {
  return (
    <li>
      <Link href={link === '/' ? `/` : `#${link}`} onClick={onSelect}>
        {isSelected ? (
          <span className="text-oguogu-white bg-oguogu-main-dark px-2 py-1.5 rounded-2xl">{item}</span>
        ) : (
          <span className="text-oguogu-black px-2 py-1.5 rounded-2xl">{item}</span>
        )}
      </Link>
    </li>
  );
}
