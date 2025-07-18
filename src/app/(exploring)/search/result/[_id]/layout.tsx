import { TextCategoryItem } from '@/components/elements/CategoryItem/CategoryItem';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CategoryHeader />
      <nav className="flex min-w-[320px] max-w-[768px]">
        <TextCategoryItem params="crop" subParams="veggie/1/detail" title="상품 정보" isClick={true} />
        <TextCategoryItem params="crop" subParams="veggie/1/review" title="리뷰(1,280)" isClick={false} />
        <TextCategoryItem params="crop" subParams="veggie/1/qna" title="문의(9,999)" isClick={false} />
      </nav>
      {children}
    </div>
  );
}
