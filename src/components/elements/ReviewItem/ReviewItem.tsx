'use client';
import { ReviewItemType } from '@/components/elements/ReviewItem/ReviewItem.type';
import StarRating from '@/components/elements/ReviewItem/StarRating';
import { getfileName } from '@/shared/data/functions/file';
import type { ReviewItem } from '@/shared/types/review';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  function maskName(name: string): string {
    if (!name) return '';
    const first = name[0];
    return first + '*'.repeat(name.length - 1);
  }

  /**
   * 이메일 마스킹 처리 함수
   * 예: abcdef@gmail.com → abc***
   *
   * @param {string} email - 원본 이메일
   * @returns {string} 마스킹된 이메일 접두사
   */
  function maskEmail(email: string): string {
    if (!email) return '';

    const atIndex = email.indexOf('@');
    const prefix = atIndex !== -1 ? email.slice(0, atIndex) : email;

    const visibleLength = 3;
    const visible = prefix.slice(0, visibleLength);
    const hidden = '*'.repeat(Math.max(prefix.length - visibleLength, 1));

    return visible + hidden;
  }

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  console.log(res.extra.imagePath);
  useEffect(() => {
    if (!res.extra.imagePath) return;
    const fetchImage = async () => {
      try {
        const data = await getfileName(res.extra.imagePath);

        // getfileName이 에러 객체를 반환하는 경우는 무시하고
        // 성공한 경우(문자열)만 상태에 설정
        if (typeof data === 'string') {
          setImageUrl(data);
        }
        // 에러인 경우 그냥 imageUrl을 null로 유지 (렌더링 안함)
      } catch (err) {
        console.error('Image fetch error:', err);
        // 에러 발생시에도 그냥 렌더링 안함
      }
    };

    fetchImage();
  }, [res.extra.imagePath]);

  // 컴포넌트 언마운트 시 blob URL 정리
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <>
      <div className=" flex flex-col gap-5 py-5 border-t border-oguogu-gray-1">
        <div className="flex justify-between">
          <span>
            <StarRating rating={res.rating} />
          </span>
          <span className="text-[12px] text-oguogu-gray-4">{res.createdAt.split(' ')[0]}</span>
        </div>
        {/* 리뷰 이미지 창 */}
        <div className="flex gap-2">
          {imageUrl && (
            <div className="flex gap-2">
              <Image
                className="w-[90px] h-[90px] object-cover rounded-[4px]"
                src={imageUrl}
                alt="상품 이미지"
                width={90}
                height={90}
              />
            </div>
          )}
        </div>
        <div>
          <p className="text-[16px] text-oguogu-black">{res.extra.name}</p>
          <p className="text-[12px] text-oguogu-gray-4">{res.content}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-[12px] text-oguogu-black">{maskName(name)}</p>
          <p className="text-[12px] text-oguogu-black">({maskEmail(email)})</p>
        </div>
      </div>
    </>
  );
}
