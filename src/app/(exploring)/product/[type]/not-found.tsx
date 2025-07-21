import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-oguogu-white text-oguogu-black">
      <h1 className="text-center text-2xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
      <p className="text-center text-md text-gray-500 mb-6">요청하신 페이지가 존재하지 않거나 이동되었어요.</p>
      <Link href="/" className="px-6 py-3 bg-oguogu-main text-white rounded-full hover:bg-opacity-80 transition">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
