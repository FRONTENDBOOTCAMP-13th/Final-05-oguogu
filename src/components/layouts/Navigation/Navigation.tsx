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
      className="h-12 overflow-x-scroll cursor-grab px-2.5 py-3 text-[14px] select-none no-scrollbar mobile-max:flex mobile-max:justify-center"
    >
      <ul className="flex flex-row gap-4 w-max">
        <NavigationItem type="/" item="홈" isSelected />
        <NavigationItem type="popular" item="인기" />
        <NavigationItem type="garden" item="텃밭구독" />
        <NavigationItem type="gardenExp" item="텃밭체험" />
        <NavigationItem type="seasonalCalendar" item="제철달력" />
        <NavigationItem type="uglyFruit" item="못난이" />
        <NavigationItem type="dummy1" item="더미1" />
        <NavigationItem type="dummy2" item="더미2" />
      </ul>
    </nav>
  );
}
