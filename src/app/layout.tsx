import './globals.css';
import ToasterWrapper from '@/components/elements/ToasterWrapper/ToastWrapper';
import InitAuthStore from '@/features/initAuthStore/initAuthStore';
import ScrollToTopOnRouteChange from '@/features/resetScrollStatus/ResetScrollStatus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오구텃밭 - 산지직송 농산물과 특별한 농촌 체험',
  description: '신선한 농산물, 즐거운 농촌 체험, 직접 키우는 텃밭 상품까지! 오구텃밭에서 지금 바로 주문하세요.',
  keywords: [
    '오구텃밭',
    '농산물',
    '농촌',
    '체험',
    '텃밭',
    '과일',
    '채소',
    '버섯',
    '곡류',
    '주말농장',
    '산지직송',
    '유기농',
    '무농약',
    '농부',
  ],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://final-05-oguogu.vercel.app/'),
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/',
  },
  authors: [
    { name: 'Jaehyun Kim', url: 'https://github.com/jaehyun0620' },
    { name: 'Jiyeon Kim', url: 'https://github.com/ji-yeoni' },
    { name: 'Wonsik Jung', url: 'https://github.com/jwe0516' },
    { name: 'Youngjune Choi', url: 'https://github.com/jjmullan' },
  ],
  publisher: 'team OguOgu, LikeLion Frontend Bootcamp 13th',
  openGraph: {
    title: '오구텃밭 - 산지직송 농산물과 특별한 농촌 체험',
    description: '신선한 농산물, 즐거운 농촌 체험, 직접 키우는 텃밭 상품까지! 오구텃밭에서 건강한 즐거움을 만나보세요.',
    url: 'https://final-05-oguogu.vercel.app/',
    siteName: '오구텃밭',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/metadata_og.png',
        width: 1000,
        height: 525,
        alt: '오구텃밭 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오구텃밭 - 산지직송 농산물과 특별한 농촌 체험',
    description: '신선함과 즐거움이 가득한 오구텃밭. 지금 만나보세요!',
    images: ['/metadata_og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <head>
        <link rel="icon" href="/images/meta/favicon.png" />
      </head>
      <body>
        {/* 스크롤을 최상단으로 강제 이동하는 코드 */}
        <ScrollToTopOnRouteChange />
        {/* 반응형 스타일링을 root layout 에서 관리하고, 각 컴포넌트는 w-full 또는 w-[특정값]으로 조절하기 */}
        <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">
          <InitAuthStore />
          {children}
          <ToasterWrapper />
        </div>
      </body>
    </html>
  );
}
