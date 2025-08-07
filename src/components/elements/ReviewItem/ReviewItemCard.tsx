import { ReviewItemType } from '@/components/elements/ReviewItem/ReviewItem.type';
import StarRating from '@/components/elements/ReviewItem/StarRating';
import Image from 'next/image';

export default function ReviewItemCard({ name, res }: ReviewItemType) {
  const maskName = (name: string): string => {
    if (!name) return '';
    if (name.length <= 2) return name;
    if (name.length === 3) return name[0] + '*' + name[2];
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  };

  function isValidImagePath(path: string): boolean {
    if (!path || path === 'src') return false;
    return path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://');
  }

  return (
    <div className="w-full border border-oguogu-gray-2 p-4 flex flex-col gap-3 bg-[#fafafa]">
      {/* 상품 이미지 */}
      {/* 상품 이미지 - 임시값 검증 적용 */}
      {res.extra.imagePath && isValidImagePath(res.extra.imagePath) ? (
        <div className="w-full h-[140px] relative overflow-hidden">
          <Image
            src={res.extra.imagePath}
            alt={res.extra.name}
            fill
            className="object-cover border border-oguogu-gray-1"
          />
        </div>
      ) : res.product.image.path && isValidImagePath(res.product.image.path) ? (
        <div className="w-full h-[140px] relative overflow-hidden">
          <Image
            src={res.product.image.path}
            alt={res.product.image.name}
            fill
            className="object-cover border border-oguogu-gray-1"
          />
        </div>
      ) : (
        // 유효한 이미지가 없는 경우 빈 공간 또는 기본 이미지 자리
        <div className="w-full h-[140px] relative overflow-hidden bg-oguogu-gray-1 flex items-center justify-center">
          <span className="text-oguogu-gray-4 text-[12px]">이미지 없음</span>
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
      <div className="text-[12px] text-oguogu-gray-4 mt-auto">{maskName(name)} </div>
    </div>
  );
}
