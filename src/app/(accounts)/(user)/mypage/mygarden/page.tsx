import GardenItemListForMyGarden from '@/components/elements/GardenItemForMyGarden/GardenItemListForMyGarden';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '텃밭 히스토리 | 오구오구',
  description: '내가 구매한 텃밭의 성장 과정을 사진과 함께 확인할 수 있는 히스토리 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/mypage/mygarden',
  },
};

export default async function UserGardeningList() {
  return (
    <>
      <LinkHeader title="텃밭 히스토리" bgColor="garden" />

      {/* 텃밭 설명 텍스트 */}
      <div className="px-6 pt-4 text-lg flex flex-col gap-y-2">
        <details className="list-none cursor-pointer">
          <summary className="flex gap-1 items-center">
            텃밭 히스토리란?
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-y-[-1px]"
            >
              <path
                d="M8 0.5C3.858 0.5 0.5 3.858 0.5 8C0.5 12.142 3.858 15.5 8 15.5C12.142 15.5 15.5 12.142 15.5 8C15.5 3.858 12.142 0.5 8 0.5ZM9.25 12.9375H6.75V6.9375H9.25V12.9375ZM8 5.5625C7.66848 5.5625 7.35054 5.4308 7.11612 5.19638C6.8817 4.96196 6.75 4.64402 6.75 4.3125C6.75 3.98098 6.8817 3.66304 7.11612 3.42862C7.35054 3.1942 7.66848 3.0625 8 3.0625C8.33152 3.0625 8.64946 3.1942 8.88388 3.42862C9.1183 3.66304 9.25 3.98098 9.25 4.3125C9.25 4.64402 9.1183 4.96196 8.88388 5.19638C8.64946 5.4308 8.33152 5.5625 8 5.5625Z"
                fill="#6a6a6a"
              />
            </svg>
          </summary>
          <div className="mt-2 text-sm text-oguogu-gray-4 flex flex-col gap-y-1">
            <p>
              <span className="text-oguogu-main">구매한 텃밭 상품</span> 을 씨앗을 심는 그 순간부터 수확까지 판매자가
              정성껏 기록해드려요!
            </p>
            <p>매주 업데이트되는 사진과 함께 당신의 농산물이 자라는 과정을 함께 지켜보세요 🌿</p>
          </div>
        </details>
      </div>

      {/* 콘텐츠 영역 */}
      <main className="px-4 pt-2 pb-4 min-h-[calc(100vh-48px)]">
        <div className="grid grid-cols-3 mobile-max:grid-cols-4 gap-4">
          <>
            <GardenItemListForMyGarden />
          </>
        </div>
      </main>
    </>
  );
}
