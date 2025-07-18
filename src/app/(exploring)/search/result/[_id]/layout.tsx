import { TextCategoryItem } from '@/components/elements/CategoryItem/CategoryItem';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">
      <CategoryHeader />
      <nav className="flex secondHeader">
        <TextCategoryItem type="search" _id={1} params="detail" title="상품 정보" isClick={true} />
        <TextCategoryItem type="search" _id={1} params="review" title="리뷰(1,280)" isClick={false} />
        <TextCategoryItem type="search" _id={1} params="qna" title="문의(9,999)" isClick={false} />
      </nav>
      {children}
    </div>
  );
}
