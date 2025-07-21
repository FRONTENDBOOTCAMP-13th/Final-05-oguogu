import { ProductLinkType } from '@/components/elements/ProductLink/ProductLink.type';
import Link from 'next/link';

export default function ProductLinkItem({
  keywordParams,
  typeParams,
  link = '/',
  linkTitle = '전체 상품',
  subTxt = '보러가기',
  mode,
}: ProductLinkType) {
  // eslint 무시를 위해 강제 삽입
  console.log(keywordParams, typeParams);

  return (
    <div className="flex justify-center border-b-1 border-b-oguogu-gray-2 pt-2 pb-4">
      <Link href={link} className="flex items-center gap-2 text-xs mobile-max:text-base">
        <span className="content-center">
          {mode === 'login' ? (
            <>
              <span>{subTxt}</span>
              <span className="text-oguogu-main">&nbsp;{linkTitle}</span>
              <span>&nbsp;하기</span>
            </>
          ) : (
            <>
              <span className="text-oguogu-main">{linkTitle}</span>
              &nbsp;{subTxt}
            </>
          )}
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
