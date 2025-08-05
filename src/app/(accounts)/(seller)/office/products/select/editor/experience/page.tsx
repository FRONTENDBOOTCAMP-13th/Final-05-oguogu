import LinkHeader from '@/components/layouts/Header/LinkHeader';
import ExperienceProductPostClientControl from '@/features/ProductPostClientControl/ExperienceProductPostClientControl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '체험 상품 등록/수정 | 판매자 센터 - 오구텃밭',
  description: '판매자가 체험 상품을 등록하거나 수정할 수 있는 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/office/products/select/editor/experience',
  },
};

export default function ExperienceProductEditor() {
  return (
    <>
      <LinkHeader title="체험 상품 등록/수정" />
      <main className="p-4 flex flex-col gap-4">
        <ExperienceProductPostClientControl />
      </main>
    </>
  );
}
