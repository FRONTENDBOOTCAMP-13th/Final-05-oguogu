import { ProductLinkType } from '@/components/elements/ProductLink/ProductLink.type';
import Link from 'next/link';

export default function ProductLinkItem({
  link = '/',
  linkTitle = '전체 상품',
  subTxt = '보러가기',
  mode,
}: ProductLinkType) {
  // 모드에 따라 스타일 조정 ( 로그인 페이지 , 회원가입 페이지 )
  const isLoginPage = mode === 'loginPage';
  const isRegisterPage = mode === 'registerPage';
  return (
    <div className={`flex justify-center pt-2 pb-4 ${isLoginPage ? '' : 'border-b-1 border-b-oguogu-gray-2'}`}>
      <Link href={link} className="flex items-center gap-2 text-xs mobile-max:text-base" aria-label="상품 전체 보기">
        <span className="content-center">
          {isRegisterPage ? (
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
