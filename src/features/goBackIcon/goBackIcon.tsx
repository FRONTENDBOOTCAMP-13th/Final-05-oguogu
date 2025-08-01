'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function GoBackIcon() {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoBack = () => {
    const segments = pathname.split('/').filter(Boolean);
    console.log(segments);

    switch (segments.length) {
      case 1:
        /* 현재 URL 경로가 루트에서 한 단계로만 이동한 경우 루트로 이동 */
        router.push('/');
        return;
      case 2:
        /* 현재 URL 경로에서 첫 번째 요소에 page.tsx 가 없는 경우 루트로 이동 */
        switch (segments[0]) {
          case 'board':
          case 'product':
          case 'garden':
            router.push('/');
          default:
            router.back();
        }
        return;
      default:
        router.back();
    }
  };

  return (
    <button type="button" onClick={handleGoBack} className="w-6 cursor-pointer">
      <svg width="18" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.5L1 9.22973L9 17.5" stroke="black" />
      </svg>
    </button>
  );
}
