'use client';

import { ShareIconType } from '@/components/elements/ShareIcon/ShareIcon.type';
import { handleCopyUrl } from '@/utils/handleCopyCurrentUrl/handleCopyCurrentUrl';

export default function ShareIcon({ type }: ShareIconType) {
  return (
    <>
      {type === 'share' ? (
        <button
          type="button"
          onClick={handleCopyUrl}
          className="cursor-pointer flex items-center gap-2 border border-oguogu-gray-1 px-4 py-1 rounded-3xl hover:border-oguogu-main-dark"
        >
          <p>공유하기</p>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        ''
      )}
    </>
  );
}
