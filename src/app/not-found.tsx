import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF8F0] text-[#3C3C3C] px-4">
      {/* 귀여운 농장 이모지 */}
      <div className="mb-4 text-7xl animate-bounce">🐥🌾</div>

      <h1 className="mb-2 text-2xl font-semibold text-center">이곳엔 아무것도 없어요!</h1>
      <p className="mb-6 text-center text-[#7D7D7D] text-base">
        페이지가 존재하지 않거나
        <br className="sm:hidden" />
        길을 잃은 것 같아요.
      </p>

      {/* 홈으로 버튼 */}
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#A3D977] text-white text-sm font-medium shadow-md hover:bg-[#91c86c] transition"
      >
        🌱 홈으로 돌아가기
      </Link>
    </div>
  );
}
