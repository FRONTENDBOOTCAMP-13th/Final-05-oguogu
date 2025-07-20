import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {/* 반응형 스타일링을 root layout 에서 관리하고, 각 컴포넌트는 w-full 또는 w-[특정값]으로 조절하기 */}
        <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">{children}</div>
      </body>
    </html>
  );
}
