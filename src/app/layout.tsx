import './globals.css';
import ToasterWrapper from '@/components/elements/ToasterWrapper/ToastWrapper';
import InitAuthStore from '@/features/initAuthStore/initAuthStore';
import ScrollToTopOnRouteChange from '@/features/resetScrollStatus/ResetScrollStatus';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
