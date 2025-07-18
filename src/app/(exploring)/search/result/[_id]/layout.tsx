import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">
      <CategoryHeader />
      <TextCategoryForDetailPage />
      {children}
    </div>
  );
}
