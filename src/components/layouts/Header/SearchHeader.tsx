'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchKeywordStore } from '@/shared/store/keywordStore';
import RelatedKeywordItem from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem';
import { getConsonants } from '@/components/layouts/Header/utils/getConsonants';
import { Keyword } from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem.type';
import GoBackIcon from '@/features/goBackIcon/goBackIcon';
import CartItemCountIcon from '@/features/cartItemCountIcon/CartItemCountIcon';


export default function SearchHeader() {
  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { originKeyword, saveKeyword } = useSearchKeywordStore();
  const router = useRouter();

  /* 검색 버튼을 클릭했을 때, 해당 검색어 상태를 저장하고 페이지를 이동시키는 기능 */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    /* 작성한 키워드의 앞/뒤 공백을 제거 */
    const finKeyword = keyword.trim();

    /* 작성된 텍스트가 공란인 경우 미동작, 입력 유도 알림 후 포커스 유지 */
    if (finKeyword === '') {
      alert('검색어를 입력해주세요!');
      inputRef.current?.focus();
      return;
    }

    /* 현재 input 에 작성된 키워드를 상태로 저장 */
    saveKeyword(finKeyword);

    /* 쿼리스트링 경로로 이동 */
    router.push(`/search?keyword=${finKeyword}`);
  };

  /* 검색바에 포커스가 되면 데이터가 클리어되는 기능 */
  const handleFocus = () => {
    /* useState 로 저장된 keyword 와 Zustand 에 저장된 originKeyword 가 동일한 경우, 즉 검색한 경우 */
    if (originKeyword && keyword === originKeyword) {
      setKeyword('');
    }
  };

  // 검색어와 자음이 일치하는 키워드만 추출
  const filteredKeywords = keyword
    ? allKeywords.filter(k => getConsonants(k.name).includes(getConsonants(keyword)))
    : [];

  // 클릭 시 동작할 함수
  const handleKeywordClick = (keyword: Keyword) => {
    router.push(`/search/result?keyword=${encodeURIComponent(keyword.name)}`);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-12 p-3 bg-oguogu-white">
      <div className="flex items-center w-full gap-1">
        {/* 뒤로가기 */}
        <GoBackIcon />

        {/* 검색창 */}
        <SearchForm />
        
        {/* 장바구니 아이콘 + 뱃지 */}
        <CartItemCountIcon />
      </div>
    </header>
  );
}
