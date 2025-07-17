import { TextCategoryItem } from '@/components/elements/CategoryItem/CategoryItem';
import ProductHeader from '@/components/layouts/Header/ProductHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[320px] min-w-[320px] mx-auto">
      <ProductHeader title="쫀득쫀득 대학 미백 찰옥수수 30개입" />
      <nav className="flex min-w-[320px] max-w-[768px]">
        <TextCategoryItem params="crop" subParams="veggie/1/detail" title="상품 정보" isClick={true} />
        <TextCategoryItem params="crop" subParams="veggie/1/review" title="리뷰(1,280)" isClick={false} />
        <TextCategoryItem params="crop" subParams="veggie/1/qna" title="문의(9,999)" isClick={false} />
      </nav>
      {children}
    </div>
  );
}
