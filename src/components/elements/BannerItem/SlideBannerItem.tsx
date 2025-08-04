import { SlideBannerItemType } from '@/components/elements/BannerItem/SlideBannerItem.type';
import Image from 'next/image';
import Link from 'next/link';

/**
 * 슬라이드 배너 내 개별 아이템을 렌더링하는 컴포넌트입니다.
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 객체 props
 * @param {string} props.order - 첨부 이미지 파일명 중 순서
 * @param {'sm' | 'md' | 'lg'} props.size - 첨부 이미지 파일명 중 크기
 * @param {string} props.productName - 상품 이름
 * @param {string} props.farmName - 판매자 이름
 * @param {string} props.className - 기본 클래스 외 추가로 지정할 CSS 스타일
 * @returns {JSX.Element} 슬라이드 배너 아이템 JSX 요소
 */
export default function SlideBannerItem({
  order,
  size,
  productName,
  farmName,
  className,
  keyword,
}: SlideBannerItemType) {
  return (
    // CHECKLIST
    // [ ] 링크 연결
    <Link href={`/search/result?keyword=${keyword}`}>
      <figure className={`relative w-[210px] h-[280px] overflow-hidden rounded-[12px] transform ${className}`}>
        <Image
          src={`/images/main-banner-${order}-${size}.webp`}
          alt={`${productName}${farmName}`}
          width={210}
          height={280}
          className="w-full h-full object-cover scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <figcaption className="absolute bottom-0 left-0 w-full text-oguogu-white text-center py-2">
          <p className="text-[20px] font-bold">{productName}</p>
          <p className="text-[14px]">{farmName}</p>
        </figcaption>
      </figure>
    </Link>
  );
}
