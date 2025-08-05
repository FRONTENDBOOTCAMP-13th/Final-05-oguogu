import { SelectProductItem } from '@/components/elements/CategoryItem/CategoryItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상품 등록 | 판매자 센터 - 오구텃밭',
  description: '판매자가 등록할 상품의 유형을 선택하는 페이지입니다. 농산물, 체험, 텃밭 중에서 선택하세요.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office/products/select',
  },
};

export default function SelectProductType() {
  return (
    <>
      <LinkHeader title="상품 등록" />
      <main className="w-[320px] mx-auto p-4 h-[calc(100vh-48px)] flex items-center overflow-y-hidden">
        <div className="flex flex-col self-center w-full gap-3">
          <SelectProductItem params="crop" title="농산물" />
          <SelectProductItem params="experience" title="체험" />
          <SelectProductItem params="gardening" title="텃밭" />
        </div>
      </main>
    </>
  );
}
