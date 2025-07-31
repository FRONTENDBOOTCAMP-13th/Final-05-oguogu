'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function GoBackIcon() {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoBack = () => {
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 1) {
      /* 현재 경로가 메인 페이지에서 한 단계 이동한 상태일 때, 뒤로 가기 버튼을 클릭하면 홈으로 이동하도록 로직 변경 */
      router.push('/');
    } else if (segments.length === 2) {
      /* 공지사항 기본 페이지가 없는 경우, 뒤로 가기로 로직 변경 */
      if (segments[0] === 'board' || segments[0] === 'product' || segments[0] === 'garden') {
        router.back();
      }

      /* 현재 경로에서 마지막 경로를 삭제하고, 이전 경로로 이동하는 로직 */
      segments.pop();
      const newPathname = '/' + segments.join('/');

      router.push(newPathname);
    } else {
      /* 이외의 경우, 뒤로 가도록 기능 수정 */
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
