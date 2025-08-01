'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function GoBackIcon() {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoBack = () => {
    const segments = pathname.split('/').filter(Boolean);
    console.log('현재 경로', segments);

    /* 라우팅 경로가  */
    if (segments.length === 0) {
      router.refresh();
    } else if (segments.length === 1) {
      router.push('/');
    } else if (segments.length === 2) {
      switch (segments[0]) {
        case 'board':
        case 'product':
        case 'garden':
          router.push('/');
          break;
        default:
          router.push(`/${segments[0]}`);
      }
    } else {
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
