'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import RelatedKeywordItem from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem';
import { RelatedKeyword } from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem.type';
import getConsonants from '@/utils/getConsonants/getConsonants';
import { getProducts } from '@/shared/data/functions/product';
import { Item } from '@/shared/types/product';

export default function SearchForm() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState<RelatedKeyword[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);
  const [allKeywords, setAllKeywords] = useState<RelatedKeyword[]>([]);

  /* input 의 defaultValue 를 설정하기 위해 URL 쿼리스트링에서 키워드 값을 추출 */
  const keywordParam = useSearchParams();
  const keyword = keywordParam.get('keyword');

  // 전체 키워드 초기 로딩
  useEffect(() => {
    async function fetchAllKeywords() {
      const res = await getProducts();
      const keywords = res.item.map((item: Item) => ({
        _id: item._id,
        name: item.name,
        type: item.extra?.productType || 'general',
      }));
      setAllKeywords(keywords);
    }

    fetchAllKeywords();
  }, []);

  // 입력값 변경 시 관련 키워드 필터링
  useEffect(() => {
    if (!input.trim()) {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const chosung = getConsonants(input.trim());
    const matched = allKeywords.filter(k => getConsonants(k.name).includes(chosung)).slice(0, 10);

    setFiltered(matched);
    setShowDropdown(true);
  }, [input]);

  // 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    /* 해당 키워드를 쿼리스트링으로 사용, 검색 결과 페이지로 이동 */
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
            onKeywordClick={keyword => {
              setInput(keyword.name);
              console.log(keyword);
              router.push(`/search/result/${keyword._id}/detail`);
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
