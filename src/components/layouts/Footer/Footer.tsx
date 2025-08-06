import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="w-full px-6 py-10 text-xs text-oguogu-gray-4 bg-oguogu-white">
        {/* 고객센터 */}
        <section className="mb-8">
          <h2 className="mb-2 text-base text-oguogu-gray-4">고객센터</h2>
          <ul className="space-y-1">
            <li className="flex gap-2">
              <span>운영시간:</span>
              <span>평일 09:00 ~ 18:00 (점심 11:50 ~ 13:00)</span>
            </li>
            <li className="flex gap-2">
              <span>대표전화:</span>
              <span>070-5959-5959</span>
            </li>
            <li className="flex gap-2">
              <span>문의:</span>
              <Link href="mailto:help@ogugarden.com" className="cursor-pointer hover:text-oguogu-black">
                help@ogugarden.com
              </Link>
            </li>
          </ul>
        </section>

        {/* 회사 정보 */}
        <section className="mb-8">
          <h2 className="mb-2 text-base text-oguogu-gray-4">회사정보</h2>
          <ul className="space-y-1">
            <li>
              <p>상호명: 멋사 FE 13기 파이널 프로젝트 5조 &apos;오구텃밭&apos;</p>
              <a
                href="https://github.com/FRONTENDBOOTCAMP-13th/Final-05-oguogu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition hover:text-oguogu-black"
              >
                Team Project by OGUOGU
              </a>
            </li>
            <li className="flex gap-2">
              <span>대표자명:</span>
              <span>김재현, 김지연, 정원식, 최영준</span>
            </li>
            <li className="flex gap-2">
              <span>사업자 등록번호:</span>
              <span>123-45-67890</span>
            </li>
            <li className="flex gap-2">
              <span>통신판매업신고번호:</span>
              <span>제2025-서울강남-00001호</span>
            </li>
          </ul>
        </section>

        {/* 이용약관 */}
        <section className="mb-8">
          <h2 className="mb-2 text-base text-oguogu-gray-4">이용약관 및 정책</h2>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-oguogu-black">
                이용약관
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-oguogu-black">
                개인정보처리방침
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-oguogu-black">
                전자금융거래 이용약관
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-oguogu-black">
                배송/교환/환불 정책
              </Link>
            </li>
          </ul>
        </section>

        {/* SNS */}
        <section>
          <h2 className="mb-2 text-base text-oguogu-gray-4">SNS</h2>
          <div className="flex gap-3">
            <Link href="/" aria-label="Instagram" className="hover:opacity-80">
              <Image src="/svgs/instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="/" aria-label="X (Twitter)" className="hover:opacity-80">
              <Image src="/svgs/x-logo.svg" alt="X" width={24} height={24} />
            </Link>
            <Link href="/" aria-label="KakaoTalk" className="hover:opacity-80">
              <Image src="/svgs/kakaotalk_logo.svg" alt="KakaoTalk" width={24} height={24} />
            </Link>
            <Link href="/" aria-label="YouTube" className="hover:opacity-80">
              <Image src="/svgs/youtube_logo.svg" alt="YouTube" width={24} height={24} />
            </Link>
          </div>
        </section>
      </div>

      <div className="px-10 pb-4 text-xs text-center  text-oguogu-gray-3">
        본 사이트는 멋쟁이사자처럼 프론트엔드 13기 교육 과정을 통해 제작된 포트폴리오용 프로젝트입니다. <br /> 실제
        상품의 판매 및 결제는 이루어지지 않으며, 모든 콘텐츠는 학습을 위한 목적으로 제공됩니다.
      </div>
      {/* 카피라이트 */}
      <div className="pt-4 pb-8 text-xs text-center border-t border-oguogu-gray-1 text-oguogu-gray-3">
        ⓒ 2025 OGUOGU. All rights reserved.
      </div>
    </footer>
  );
}
