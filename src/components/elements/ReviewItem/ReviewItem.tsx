import StarRating from '@/components/elements/ReviewItem/StarRating';
import type { ReviewItem } from '@/shared/types/review';

import Image from 'next/image';

export default function ReviewItem({ name, email, res }: { name: string; email: string; res: ReviewItem }) {
  // 이름 마스킹 (첫 글자만 남기고 나머지는 *)
  function maskName(name: string): string {
    if (!name) return '';
    const first = name[0];
    return first + '*'.repeat(name.length - 1);
  }

  // 이메일 마스킹 (앞 3글자 + *)
  function maskEmail(email: string): string {
    if (!email) return '';

    const atIndex = email.indexOf('@');
    const prefix = atIndex !== -1 ? email.slice(0, atIndex) : email;

    const visibleLength = 3;
    const visible = prefix.slice(0, visibleLength);
    const hidden = '*'.repeat(Math.max(prefix.length - visibleLength, 1));

    return visible + hidden;
  }

  return (
    <>
      <div className="h-[207px] flex flex-col gap-3">
        <div className="flex justify-between">
          <span>
            <StarRating rating={res.rating} />
          </span>
          <span className="text-[12px] text-oguogu-gray-4">{res.createdAt.split(' ')[0]}</span>
        </div>
        <div className="flex gap-2">
          <Image
            className="w-[90px] h-[90px] object-cover rounded-[4px]"
            src="/images/crop/crop-001.png"
            alt="상품명"
            width={90}
            height={90}
          />
          <Image
            className="w-[90px] h-[90px] object-cover rounded-[4px]"
            src="/images/crop/crop-001.png"
            alt="상품명"
            width={90}
            height={90}
          />
          <Image
            className="w-[90px] h-[90px] object-cover rounded-[4px]"
            src="/images/crop/crop-001.png"
            alt="상품명"
            width={90}
            height={90}
          />
        </div>
        <div>
          <p className="text-[16px] text-oguogu-black">{res.extra.name}</p>
          <p className="text-[12px] text-oguogu-gray-4">{res.content}</p>
        </div>
        <div className="flex gap-3">
          <p className="text-[12px] text-oguogu-black">구매자이름 {maskName(name)}</p>
          <p className="text-[12px] text-oguogu-black">이메일 앞부분 {maskEmail(email)}</p>
        </div>
      </div>
    </>
  );
}
