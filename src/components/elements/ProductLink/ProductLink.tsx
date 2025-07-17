import { ProductLinkType } from '@/components/elements/ProductLink/ProductLink.type';
import Link from 'next/link';

export default function ProductLinkItem({
  linkTitle = '전체 상품',
  type = 'direct',
  src = '/search',
}: ProductLinkType) {
  let text;

  switch (type) {
    case 'watch':
      text = '보러 가기';
      break;
    case 'buy':
      text = '구매하러 가기';
      break;
    case 'direct':
      text = '바로 가기';
      break;
    case 'do':
      text = '하러 가기';
      break;
  }

  return (
    <div className="flex justify-center border-b-1 border-b-oguogu-gray-2 pt-2 pb-4">
      <Link href={src} className="flex items-center gap-2 text-xs">
        <span className="content-center">
          <span className="text-oguogu-main">{linkTitle}</span> {text}
        </span>
        <svg
          width="5"
          height="11"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <path d="M9 0.5L1 9.22973L9 17.5" stroke="black" />
        </svg>
      </Link>
    </div>
  );
}
