import RelatedKeywordItemProps from '@/components/elements/RelatedKeywordItem/RelatedKeywordItem.type';
import { Search } from 'lucide-react';

/**
 * 자동완성 관련 키워드 리스트 UI 컴포넌트
 * 
 * @param keywords - 자동완성으로 보여줄 키워드 배열 (객체 배열: { name, type })
 * @description type이 'garden'이면 텃밭 뱃지 표시
 */
export default function RelatedKeywordItem({ keywords, onKeywordClick }: RelatedKeywordItemProps) {
  return (
    <div className="w-full p-2 mx-auto">
      <ul className="space-y-2">
        {/* 키워드가 없을 때 안내 메시지 */}
        {keywords.length === 0 ? (
          <li className="px-2 py-1 text-sm text-oguogu-gray-4">관련 키워드가 없습니다.</li>
        ) : (
          keywords.map((keyword) => (
            <li 
              key={keyword.name}
              className="flex items-center gap-2 px-2 py-1 text-left transition rounded cursor-pointer text-oguogu-black hover:bg-oguogu-gray-1 focus:bg-oguogu-gray-1 focus:outline-none"
              tabIndex={0}
              onClick={() => onKeywordClick?.(keyword)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onKeywordClick?.(keyword);
                }
              }}
            >
              <Search className="w-4 h-4 ml-1 text-oguogu-gray-3" />
              <span className="ml-1 text-sm">{keyword.name}</span>
              {/* type이 'garden'이면 텃밭 뱃지 표시 */}
              {keyword.type === 'garden' && (
                <span className="px-1.5 ml-1 text-[11px] border rounded-full bg-oguogu-white text-oguogu-main border-oguogu-main leading-tight">
                  텃밭
                </span>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
