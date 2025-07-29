'use client';

import { useSearchKeywordStore } from '@/shared/store/keywordStore';
import Link from 'next/link';

export default function GetRecentSearchKeyword() {
  const keyword = useSearchKeywordStore(state => state.originKeyword);

  return (
    <div className="px-4 mt-1 mb-3 flex flex-col text-oguogu-gray-4 text-sm gap-1.5">
      <span>최근 검색어</span>
      <ul className="flex gap-1.5">
        {keyword
          .slice()
          .reverse()
          .map((keyword: string, index: number) => (
            <li key={index} className="px-2.5 py-0.5 border border-oguogu-gray-2 rounded-2xl text-xs">
              <Link href={`/search/result?keyword=${keyword}`}>{keyword}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
