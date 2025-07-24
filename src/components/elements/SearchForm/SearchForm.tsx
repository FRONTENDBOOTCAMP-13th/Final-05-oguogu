'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import RelatedKeywordItem from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem';
import { RelatedKeyword } from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem.type';

export default function SearchForm() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [filtered] = useState<RelatedKeyword[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/result?keyword=${encodeURIComponent(input.trim())}`);
    setShowDropdown(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="contents" ref={wrapperRef}>
      <label htmlFor="searchKeyword" className="sr-only">
        검색
      </label>
      {/* 검색어 입력창 */}
      <input
        type="text"
        id="searchKeyword"
        value={input}
        onChange={e => setInput(e.target.value)}
        onFocus={() => input && setShowDropdown(true)}
        placeholder="7월은 초당옥수수가 제철!"
        className="flex-1 h-6 py-3 pl-2 ml-2 text-sm outline-none appearance-none sm:w-48 text-oguogu-black placeholder-oguogu-gray-3"
      />

      {/* 드롭다운: 검색어가 있을 경우 관련 키워드 리스트 노출 */}
      {showDropdown && (
        <div className="absolute left-0 right-0 z-10 mt-1 bg-white rounded shadow top-full">
          <RelatedKeywordItem
            keywords={filtered}
            onKeywordClick={(keyword) => {
              setInput(keyword.name);
              router.push(`/search/result?keyword=${encodeURIComponent(keyword.name)}`);
              setShowDropdown(false);
            }}
          />
        </div>
      )}
      {/* 검색 버튼 */}
      <button type="submit" className="mx-1" onClick={handleSubmit}>
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
  );
}
