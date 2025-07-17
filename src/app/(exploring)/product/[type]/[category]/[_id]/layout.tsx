import { TextCategoryItem } from '@/components/elements/CategoryItem/CategoryItem';
import SearchHeader from '@/components/layouts/Header/SearchHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="max-w-[320px] min-w-[320px] mx-auto">
          <SearchHeader />
          <nav className="flex min-w-[320px] max-w-[768px]">
            <TextCategoryItem params="crop" subParams="veggie/1/detail" title="상품 정보" isClick={true} />
            <TextCategoryItem params="crop" subParams="veggie/1/review" title="리뷰(1,280)" isClick={false} />
            <TextCategoryItem params="crop" subParams="veggie/1/qna" title="문의(9,999)" isClick={false} />
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
