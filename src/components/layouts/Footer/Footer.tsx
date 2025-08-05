import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col w-full gap-3 p-4 text-xs text-oguogu-gray-4 ">
      <p className="pt-2 text-base text-oguogu-black">고객센터</p>
      <div className="flex flex-col gap-y-0.5">
        <div className="flex gap-1">
          <p>운영시간 :</p>
          <div className="flex gap-1">
            <p>평일 09:00 ~ 18:00</p>
            <p>(점심시간 11:50 ~ 13:00)</p>
          </div>
        </div>
        <div className="flex gap-1">
          <p>대표전화 :</p>
          <p>070-5959-5959</p>
        </div>
        <div className="flex gap-1">
          <p>문의 :</p>
          <Link href="mailto:help@ogugarden.com" className="cursor-pointer hover:text-oguogu-black">
            help@ogugarden.com
          </Link>
        </div>
      </div>

      <p className="pt-2 text-base text-oguogu-black">회사정보</p>
      <div className="flex flex-col gap-y-0.5">
        <div className="flex gap-1">
          <p>상호명 :</p>
          <p>멋사 프론트엔드 13기 파이널 프로젝트 5조 &apos;오구텃밭&apos;</p>
          <a
            href="https://github.com/FRONTENDBOOTCAMP-13th/Final-05-oguogu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-oguogu-black"
          >
            Team Project by OGUOGU
          </a>
        </div>
        <div className="flex gap-1">
          <p>대표자명 :</p>
          <p>김재현, 김지연, 정원식, 최영준</p>
        </div>
        <div className="flex gap-1">
          <p>사업자 등록번호 :</p>
          <p>123-45-67890</p>
        </div>
        <div className="flex gap-1">
          <p>통신판매업신고번호 :</p>
          <p>제2025-서울강남-00001호</p>
        </div>
      </div>

      <p className="pt-2 text-base text-oguogu-black">이용약관 및 정책</p>
      <div className="flex flex-col gap-y-0.5">
        <Link href="/">이용약관</Link>
        <Link href="/">개인정보처리방침</Link>
        <Link href="/">전자금융거래 이용약관</Link>
        <Link href="/">배송/교환/환불 정책</Link>
      </div>

      <p className="pt-2 text-base text-oguogu-black">SNS</p>
      <div className="flex gap-1">
        <Link href="/" className="flex">
          <Image src="/svgs/instagram.svg" alt="instagram" width={24} height={24} />
        </Link>
        <Link href="/" className="flex">
          <Image src="/svgs/x-logo.svg" alt="twitter" width={24} height={24} />
        </Link>
        <Link href="/" className="flex">
          <Image src="/svgs/kakaotalk_logo.svg" alt="kakaotalk" width={24} height={24} />
        </Link>
        <Link href="/" className="flex">
          <Image src="/svgs/youtube_logo.svg" alt="youtube" width={24} height={24} />
        </Link>
      </div>
      <div className="py-4 text-xs text-center border-t border-oguogu-gray-1 text-oguogu-gray-3">
        ⓒ 2025 OGUOGU. All rights reserved.
      </div>
    </footer>
  );
}
