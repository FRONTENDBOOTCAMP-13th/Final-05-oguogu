'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import RelatedKeywordItem from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem';
import { RelatedKeyword } from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem.type';
import getConsonants from '@/utils/getConsonants/getConsonants';
import { getProducts } from '@/shared/data/functions/product';
import { Item } from '@/shared/types/product';
import { useSearchKeywordStore } from '@/shared/store/keywordStore';

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordFromURL = searchParams.get('keyword');

  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState<RelatedKeyword[]>([]);
  const [allKeywords, setAllKeywords] = useState<RelatedKeyword[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLFormElement>(null);

  // URL 쿼리에서 키워드 가져와 초기 input 값 설정
  useEffect(() => {
    if (keywordFromURL) setInput(keywordFromURL);
  }, [keywordFromURL]);

  // 전체 키워드 초기 로딩
  useEffect(() => {
    async function fetchKeywords() {
      const res = await getProducts();
      const keywords = res.item.map((item: Item) => ({
        _id: item._id,
        name: item.name,
        type: item.extra?.productType || 'general',
      }));
      // console.log('전체 키워드 목록:', keywords); // 확인용
      setAllKeywords(keywords);
    }
    fetchKeywords();
  }, []);

  // 입력값 변경 시 관련 키워드 필터링
  useEffect(() => {
    if (!input.trim()) {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const keywordInput = input.trim();
    const inputChosung = getConsonants(keywordInput); // 초성 필터링

    const matched = allKeywords
      .filter(k => {
        const name = k.name;
        const nameChosung = getConsonants(name);

        return (
          // 일반 문자열로 앞에서부터 일치
          name.startsWith(keywordInput) ||
          // 초성 기준으로 앞에서부터 일치
          nameChosung.startsWith(inputChosung)
        );
      })
      .slice(0, 10);

    setFiltered(matched);
    setShowDropdown(true);
    setHighlightedIndex(-1); // 입력 변경 시 초기화
  }, [input, allKeywords]);

  // Zustand 로 키워드 상태 저장하기
  const keywordStorage = useSearchKeywordStore();

  // 검색 제출 처리 (검색 결과 페이지로 이동)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    keywordStorage.saveKeyword(input);
    router.push(`/search/result?keyword=${encodeURIComponent(input.trim())}`);
    setShowDropdown(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 키보드 이벤트 처리 (방향키 탐색 + 선택)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
        // 드롭다운에서 항목 선택
        const selected = filtered[highlightedIndex];
        setInput(selected.name);
        router.push(`/search/result/${selected._id}/detail`);
        setShowDropdown(false);
      } else {
        // 일반 검색
        handleSubmit(e);
      }
    }
  };

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
        onFocus={() => {
          setIsFocused(true);
          if (input.trim()) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        onKeyDown={handleKeyDown}
        placeholder="8월 더운 여름에는 제철 과일과 함께!"
        className="flex-1 h-6 py-3 pl-2 ml-2 text-sm outline-none appearance-none sm:w-48 text-oguogu-black placeholder-oguogu-gray-3"
      />

      {showDropdown && isFocused && (
        <div className="absolute left-0 right-0 z-10 bg-white rounded shadow top-full">
          <RelatedKeywordItem
            keywords={filtered}
            highlightedIndex={highlightedIndex}
            onKeywordClick={keyword => {
              setInput(keyword.name);
              router.push(`/search/result/${keyword._id}/detail`);
              setShowDropdown(false);
            }}
          />
        </div>
      )}
      {/* 검색 버튼 */}
      <button type="submit" className="mx-1">
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
