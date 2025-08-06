'use client';

import CheckButton from '@/components/elements/CheckButton/CheckButton';
import Filter from '@/components/elements/ProductItem/Filter/Filter';
import { ProductSort } from '@/components/elements/ProductItem/Sort/Sort';
import { QnaSortBarType, ReviewSortbarType } from '@/components/layouts/SortBar/Sortbar.type';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function ProductSortbar({ cnt }: { cnt: number }) {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center h-[48px] p-4">
      <span>총 {cnt}개</span>
      <div className="flex gap-2">
        {pathname.includes('/crop') ? (
          <Filter filteredData="crop" />
        ) : pathname.includes('/result') ? (
          <Filter filteredData="result" />
        ) : (
          ''
        )}
        <ProductSort />
      </div>
    </div>
  );
}

export function ReviewSortbar({ reviewAvg }: ReviewSortbarType) {
  return (
    <div className="flex flex-row justify-between items-center h-[48px] p-[16px]">
      <div className="flex flex-row items-center gap-x-[8px]">
        <span>평점</span>
        <div className="flex flex-row gap-x-[2px]">
          <Image
            src="/images/iconImage/icon-star-filled.svg"
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="mb-[4px]"
          />
          <span>{reviewAvg}</span>
        </div>
      </div>
      {/*  <ReviewSort /> */}
    </div>
  );
}

export function QnaSortBar({ qnaCnt, isMyPost, setIsMyPost }: QnaSortBarType) {
  const handleCheckMyPost = () => {
    setIsMyPost(!isMyPost);
  };

  return (
    <div className="flex justify-between items-center h-[48px] p-[16px]">
      <span>총 {qnaCnt.toLocaleString()}개</span>
      <CheckButton size={14} gap={2} checked={isMyPost} onChange={handleCheckMyPost}>
        내가 작성한 글
      </CheckButton>
    </div>
  );
}
