import { TextCategoryForDetailPage } from '@/components/layouts/Category/Category';
import CategoryHeader from '@/components/layouts/Header/CategoryHeader';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ _id: string }>;
}
export default async function RootLayout({ children, params }: LayoutProps) {
  const { _id } = await params;
  console.log('layout', _id);
  return (
    <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">
      <CategoryHeader _id={_id} />
      <TextCategoryForDetailPage _id={Number(_id)} />
      {children}
    </div>
  );
}
