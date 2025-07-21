'use client';

import { useState } from 'react';
import Link from 'next/link';
import handleGoBack from '@/utils/handleGoBack/handleGoBack';
import { getConsonants } from '@/components/layouts/Header/utils/getConsonants';
import RelatedKeywordItem from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem';
import { useRouter } from 'next/navigation';
import { SearchHeaderProps } from '@/components/layouts/Header/types/Header.type';
import { Keyword } from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem.type';


// 예시 키워드 데이터
const allKeywords = [
  { name: '옥수수', type: 'crop' },  
  { name: '야채도사', type: 'garden' },
  { name: '오롯유통', type: 'garden' },
  { name: '양배추', type: 'crop' },
  { name: '초당옥수수', type: 'crop' },
  { name: '옥수유통', type: 'garden' },
];

export default function SearchHeader({ cartItemCount = 99 }: SearchHeaderProps) {
  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // 검색어와 자음이 일치하는 키워드만 추출
  const filteredKeywords = keyword
    ? allKeywords.filter(k => getConsonants(k.name).includes(getConsonants(keyword)))
    : [];
 

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/(exploring)/search/result?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  // 클릭 시 동작할 함수
  const handleKeywordClick = (keyword: Keyword) => {
    router.push(`/search/result?keyword=${encodeURIComponent(keyword.name)}`);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-12 p-3 bg-oguogu-white">
      <div className="flex items-center w-full gap-1">
        {/* 뒤로가기 */}
        <button type="button" onClick={handleGoBack}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0.5L1 9.22973L9 17.5" stroke="black" />
          </svg>
        </button>
        {/* 검색창 */}
        <form
          className="contents"
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <label htmlFor="searchKeyword" className="sr-only">
            검색
          </label>
          <input
            type="search"
            id="searchKeyword"
            placeholder="7월은 초당옥수수가 제철!"
            value={keyword}
            onChange={e => {
              setKeyword(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="flex-1 h-6 py-3 pl-2 ml-2 text-sm outline-none appearance-none sm:w-48 text-oguogu-black placeholder-oguogu-gray-3"
            autoComplete="off"
          />
          <button
            type="submit"
            className="mx-1"
            onClick={handleSearch}
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

        {/* 드롭다운: 검색어 입력 시 자음 일치 키워드 노출 */}
        {showDropdown && (
          <div className="absolute left-0 right-0 z-10 mt-1 bg-white rounded shadow top-full">
            <RelatedKeywordItem
              keywords={filteredKeywords}
              onKeywordClick={handleKeywordClick}
            />
          </div>
        )}

        {/* 장바구니 아이콘 + 뱃지 */}
        <div>
          <Link href="/mypage/cart" className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 11L14 20M19 11L15 4M2 11H22M3.5 11L5.1 18.4C5.1935 18.8586 5.44485 19.2698 5.81028 19.5621C6.17572 19.8545 6.63211 20.0094 7.1 20H16.9C17.3679 20.0094 17.8243 19.8545 18.1897 19.5621C18.5552 19.2698 18.8065 18.8586 18.9 18.4L20.6 11M4.5 15.5H19.5M5 11L9 4M9 11L10 20"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartItemCount > 0 ? (
              <span className="absolute bottom-0 right-0 bg-oguogu-main text-oguogu-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                {cartItemCount > 99 ? '99' : cartItemCount}
              </span>
            ) : ('')}
          </Link>
        </div>
      </div>
    </header>
  );
}
