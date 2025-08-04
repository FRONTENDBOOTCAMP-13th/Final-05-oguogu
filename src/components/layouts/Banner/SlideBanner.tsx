'use client';

import SlideBannerItem from '@/components/elements/BannerItem/SlideBannerItem';
import { SlideBannerItemType } from '@/components/elements/BannerItem/SlideBannerItem.type';
import { useEffect, useState } from 'react';

// CHECKLIST
// [x] 1차 마크업
// [x] 슬라이드 무한 루프
// [x] 버튼 눌렀을 때 해당 슬라이드로 이동 및 정지 기능
// [ ] 드래그와 스크롤 기능
// [ ] 슬라이드 될 때 마다 리렌더링이 되고 있음 -> 메모이제이션 필요하면 적용

// 현재 UI 수정시 적용이 되지 않는 버그가 있음 체크 해보기
// -> 추후 리팩토링 필요 .. 전체를 고쳐야할지도

export default function SlideBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const bannerItems: SlideBannerItemType[] = [
    { order: '01', size: 'lg', productName: '프리미엄 초당 옥수수', farmName: '돌쇠네 농산물', keyword: '옥수수' },
    { order: '02', size: 'lg', productName: '프리미엄 퇴천 토마토', farmName: '대성농장 농산물', keyword: '토마토' },
    { order: '03', size: 'lg', productName: '프리미엄 인제 감자', farmName: '두메산골 농산물', keyword: '감자' },
  ];

  // 슬라이드 무한 루프
  const prevIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
  const nextIndex = (currentIndex + 1) % bannerItems.length;

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % bannerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoSlide, bannerItems.length]);

  // 버튼 누르고 있을 때 해당 슬라이드로 이동 및 정지

  const handlePress = (index: number) => {
    setAutoSlide(false);
    setCurrentIndex(index);
  };

  // 버튼 떼면 다시 자동 슬라이드 시작
  const handleRelease = () => {
    setAutoSlide(true);
  };

  return (
    <div className="flex flex-col items-center gap-3 overflow-hidden pt-2">
      <div className="relative w-full h-[300px] overflow-hidden">
        <ul className="flex items-center justify-center transition-transform duration-500">
          {/* 이전 슬라이드 */}
          <li className="w-[210px] shrink-0">
            <SlideBannerItem
              {...bannerItems[prevIndex]}
              className="transition-transform duration-500 scale-85 opacity-70"
            />
          </li>

          {/* 현재 슬라이드 */}
          <li className="w-[210px] shrink-0">
            <SlideBannerItem
              {...bannerItems[currentIndex]}
              className="transition-transform duration-500 scale-100 shadow-lg shadow-oguogu-gray-2 border-3 border-oguogu-main"
            />
          </li>

          {/* 다음 슬라이드 */}
          <li className="w-[210px] shrink-0">
            <SlideBannerItem
              {...bannerItems[nextIndex]}
              className="transition-transform duration-500 scale-85 opacity-70"
            />
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-2">
        {bannerItems.map((_item, index) => (
          <button
            key={index}
            onMouseDown={() => handlePress(index)}
            onMouseUp={handleRelease}
            onTouchEnd={handleRelease}
            onTouchStart={() => handlePress(index)}
            className={`w-2 h-2 rounded-full border cursor-pointer ${
              currentIndex === index
                ? 'bg-oguogu-white border-[var(--color-oguogu-gray-3)]'
                : 'bg-oguogu-gray-2 border-none'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
