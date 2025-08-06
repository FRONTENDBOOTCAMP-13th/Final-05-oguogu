import { ReviewItemType } from '@/components/elements/ReviewItem/ReviewItem.type';
import StarRating from '@/components/elements/ReviewItem/StarRating';

import type { ReviewItem } from '@/shared/types/review';

import Image from 'next/image';

/**
 * 상품 리뷰 한 건을 렌더링하는 컴포넌트입니다.
 * 별점, 작성일, 상품 이미지, 상품명, 리뷰 내용, 작성자 정보를 표시합니다.
 *
 * @component
 * @param {ReviewItemType} props - 리뷰 정보 및 작성자 이름/이메일
 */

export default function ReviewItem({ name, email, res }: ReviewItemType) {
  /**
   * 이름 마스킹 처리 함수
   * 예: 홍길동 → 홍**
   *
   * @param {string} name - 원본 이름
   * @returns {string} 마스킹된 이름
   */
  // 이름 *표로 변환해주는 함수
  function maskName(name: string): string {
    if (!name) return '';
    if (name.length <= 2) return name; // 두 글자 이하면 마스킹 생략

    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  }

  // 이메일 *표로 변환해주는 함수
  function maskEmail(email: string): string {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    const prefix = atIndex !== -1 ? email.slice(0, atIndex) : email;
    const visible = prefix.slice(0, 3);
    const hidden = '*'.repeat(Math.max(prefix.length - 3, 1));
    return visible + hidden;
  }

  function isValidImagePath(path: string): boolean {
    if (!path || path === 'src') return false;
    return path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://');
  }

  return (
    <>
      <div className=" flex flex-col gap-2 py-5 border-t border-oguogu-gray-1">
        <div className="flex justify-between">
          <span>
            <StarRating rating={res.rating} />
          </span>
          <span className="text-[12px] text-oguogu-gray-4">{res.createdAt.split(' ')[0]}</span>
        </div>
        {/* 리뷰 이미지 창 */}
        <div className="flex gap-2">
          <div className="flex gap-2">
            {res.extra.imagePath && isValidImagePath(res.extra.imagePath) && (
              <Image
                className="w-[90px] h-[90px] object-cover rounded-[4px]"
                src={res.extra.imagePath}
                alt="상품 이미지"
                width={90}
                height={90}
              />
            )}
          </div>
        </div>
        <div>
          <p className="text-[16px] text-oguogu-black">{res.extra.name}</p>
          <p className="text-[12px] text-oguogu-gray-4">{res.content}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-[12px] text-oguogu-black">{maskName(name)}</p>
          <p className="text-[12px] text-oguogu-black">({maskEmail(email!)})</p>
        </div>
      </div>
    </>
  );
}
