'use client';

import { useState } from 'react';
import Link from 'next/link';
import handleGoBack from '@/components/layouts/Header/utils/handleGoBack';
import { SearchHeaderProps } from '@/components/layouts/Header/types/Header.type';

export default function SearchHeader({ cartItemCount = 0 }: SearchHeaderProps) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (keyword.trim()) {
      console.log('검색:', keyword); // 또는 router.push(`/search?keyword=${keyword}`)
    }
  };

  return (
    <header className="header">
      {/* 검색 + 버튼 */}
      <div className="flex gap-1 items-center w-full">
        <button type="button" onClick={handleGoBack} className="w-6 cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0.5L1 9.22973L9 17.5" stroke="black" />
          </svg>
        </button>

        {/* 검색창 */}
        <form className="contents">
          <label htmlFor="searchKeyword" className="sr-only">
            검색
          </label>
          <input
            type="search"
            id="searchKeyword"
            placeholder="7월은 초당옥수수가 제철!"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="flex-1 h-6 sm:w-48 ml-2 pl-2 py-3 text-sm text-oguogu-black placeholder-oguogu-gray-3 outline-none appearance-none focus:ring-oguogu-main"
          />

          {/* 검색 버튼 */}
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              handleSearch();
            }}
            className="mx-1 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        {/* 홈 버튼 */}
        <Link href="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1053 14.2652 12 14 12H10C9.73478 12 9.48043 12.1053 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21M3 9.99997C2.99993 9.70904 3.06333 9.42159 3.18579 9.15768C3.30824 8.89378 3.4868 8.65976 3.709 8.47197L10.709 2.47297C11.07 2.16788 11.5274 2.00049 12 2.00049C12.4726 2.00049 12.93 2.16788 13.291 2.47297L20.291 8.47197C20.5132 8.65976 20.6918 8.89378 20.8142 9.15768C20.9367 9.42159 21.0001 9.70904 21 9.99997V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99997Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
