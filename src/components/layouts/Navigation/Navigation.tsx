'use client';

import NavigationItem from '@/components/elements/NavigationItem/NavigationItem';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

export default function Navigation() {
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
      <ul className="flex flex-row gap-4 w-max">
        <NavigationItem link="/" item="홈" isSelected />
        <NavigationItem link="link1" item="체험상품" />
        <NavigationItem link="link2" item="제철농산물" />
        <NavigationItem link="link3" item="마감임박" />
      </ul>
    </nav>
  );
}
