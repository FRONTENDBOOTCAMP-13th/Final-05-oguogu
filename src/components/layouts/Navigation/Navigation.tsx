'use client';

import NavigationItem from '@/components/elements/NavigationItem/NavigationItem';
import { useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

const navItems = [
  { item: '홈', link: '/' },
  { item: '주말 농장 체험', link: 'link1' },
  { item: '제철 농산물', link: 'link2' },
  { item: '마감 임박 텃밭', link: 'link3' },
  { item: '이주의 리뷰', link: 'link4' },
  { item: '공지 사항', link: 'link5' },
  { item: '자주하는 질문', link: 'link6' },
];

export default function Navigation() {
  const [selectedItem, setSelectedItem] = useState<string | null>('홈');

  // draggable-scroll 라이브러리 사용
  // 드래그로 가로 스크롤이 가능한 영역을 만들기 위한 ref와 이벤트 바인딩
  const scrollRef = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(scrollRef as React.RefObject<HTMLElement>);

  return (
    <nav
      ref={scrollRef}
      {...events}
      className="sticky top-12 z-50 bg-gradient-to-b from-oguogu-white via-oguogu-white/90 to-oguogu-white/100 h-12 overflow-x-scroll cursor-grab px-2.5 py-3 text-[14px] select-none no-scrollbar mobile-max:flex mobile-max:justify-center"
    >
      <ul className="flex flex-row gap-2 w-max">
        {navItems.map(({ item, link }, index) => {
          return (
            <NavigationItem
              key={index}
              link={link}
              item={item}
              isSelected={selectedItem === item}
              onSelect={() => setSelectedItem(item)}
            />
          );
        })}
      </ul>
    </nav>
  );
}
