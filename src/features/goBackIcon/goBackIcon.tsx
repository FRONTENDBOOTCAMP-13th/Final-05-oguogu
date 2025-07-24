'use client';

import { useRouter } from 'next/navigation';

export default function GoBackIcon() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleGoBack} className="w-6 cursor-pointer">
      <svg width="18" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.5L1 9.22973L9 17.5" stroke="black" />
      </svg>
    </button>
  );
}
