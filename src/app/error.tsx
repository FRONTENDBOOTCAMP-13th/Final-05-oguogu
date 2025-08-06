'use client';

import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF8F0] text-[#3C3C3C] px-4">
      {/* 귀여운 이모지 */}
      <div className="mb-4 text-7xl animate-pulse">🐔⚠️</div>

      <h1 className="mb-2 text-2xl font-semibold text-center">무언가 잘못됐어요!</h1>
      <p className="mb-6 text-center text-[#7D7D7D] text-base max-w-md">
        {error.message || '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.'}
      </p>

      {/* 홈으로 가기 */}
      <Link
        href="/"
        className="px-6 py-3 mb-3 rounded-full bg-[#A3D977] text-white text-sm font-medium shadow-md hover:bg-[#91c86c] transition"
      >
        🌱 홈으로 가기
      </Link>

      {/* 다시 시도 */}
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-[#E0E0E0] text-[#3C3C3C] text-sm font-medium shadow hover:bg-[#d5d5d5] transition"
      >
        🔄 다시 시도하기
      </button>
    </div>
  );
}
