'use client';

import { useAuthStore } from '@/shared/store/authStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';

export default function ToggleOfficePageForSeller() {
  const LoggedInUserType: string | undefined = useAuthStore(state => state.userInfo?.type);
  const pathname = usePathname();

  /* const dragRef = useRef<HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 40, y: 80 });
  const [dragging, setDragging] = useState(false);
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [dragMoved, setDragMoved] = useState(false); */

  /* 마우스 이벤트 */
  /* useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startMouse.x;
      const dy = e.clientY - startMouse.y;

      setDragMoved(true);
      setPosition({
        x: startPosition.x + dx,
        y: startPosition.y + dy,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, startMouse, startPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    setDragMoved(false);
    setDragging(true);
    setStartMouse({ x: e.clientX, y: e.clientY });
    setStartPosition(position);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }; */

  const isOnMypage = pathname.includes('/mypage');
  const href = isOnMypage ? '/office' : '/mypage';
  const content = isOnMypage ? (
    <>
      <span>판매자</span>
      <span>관리페이지</span>
    </>
  ) : (
    '마이페이지'
  );

  return (
    <>
      {LoggedInUserType === 'seller' ? (
        <Link
          href={href}
          /* ref={dragRef} */
          /* onMouseDown={handleMouseDown} */
          /* onClick={handleClick} */
          className="fixed w-20 h-20 bottom-18 right-6 border-3 border-oguogu-main rounded-[100px] bg-oguogu-white shadow-sm shadow-oguogu-gray-2 text-sm flex flex-col items-center justify-center"
          /* style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
        }} */
        >
          {content}
        </Link>
      ) : (
        ''
      )}
    </>
  );
}
