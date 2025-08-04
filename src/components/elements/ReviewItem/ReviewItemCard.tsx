import { ReviewItemType } from '@/components/elements/ReviewItem/ReviewItem.type';
import StarRating from '@/components/elements/ReviewItem/StarRating';
import Image from 'next/image';

export default function ReviewItemCard({ name, email, res }: ReviewItemType) {
  const maskName = (name: string): string => {
    if (!name) return '';
    if (name.length <= 2) return name;
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  };

  const maskEmail = (email: string): string => {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    const prefix = atIndex !== -1 ? email.slice(0, atIndex) : email;
    const visible = prefix.slice(0, 3);
    const hidden = '*'.repeat(Math.max(prefix.length - 3, 1));
    return visible + hidden;
  };

  console.log(res);

  return (
    <div className="w-full border border-oguogu-gray-2 p-4 flex flex-col gap-3 bg-[#fafafa]">
      {/* 상품 이미지 */}
      {res.extra.imagePath ? (
        <div className="w-full h-[140px] relative overflow-hidden">
          <Image
            src={res.extra.imagePath}
            alt={res.extra.name}
            fill
            className="object-cover border border-oguogu-gray-1"
          />
        </div>
      ) : (
        <div className="w-full h-[140px] relative overflow-hidden">
          <Image
            src={res.product.image.path}
            alt={res.product.image.name}
            fill
            className="object-cover border border-oguogu-gray-1"
          />
        </div>
      )}

      {/* 상품명 및 별점 */}
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-medium text-oguogu-black">{res.extra.name}</p>
        <StarRating rating={res.rating} />
      </div>

      {/* 리뷰 내용 */}
      <p className="text-[13px] text-oguogu-gray-5 leading-snug line-clamp-3">“{res.content}”</p>

      {/* 작성자 */}
      <div className="text-[12px] text-oguogu-gray-4 mt-auto">
        {maskName(name)} ({maskEmail(email)})
      </div>
    </div>
  );
}
