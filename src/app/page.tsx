import Header from '@/components/layouts/Header/Header';
import Navigation from '@/components/layouts/Navigation/Navigation';
import SlideBanner from '@/components/layouts/Banner/SlideBanner';
import { ImageCategory } from '@/components/layouts/Category/Category';
import Title from '@/components/elements/CommonTitleItem/Title';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import Link from 'next/link';

// CHECKLIST
// sticky header 가 고정되지 않는 이슈 해결 필요
export default async function Home() {
  return (
    <div className="min-w-[320px] max-w-[768px] mx-auto relative">
      {/* 헤더가 고정되지 않고 흔들리는 이슈 해결 필요 */}
      <Header cartItemCount={100} />
      <Navigation />
      <SlideBanner />
      <ImageCategory />
      <main className="flex flex-col">
        <Title title="온 가족이 함께 즐기는 텃밭 체험" content="7월 한 달 간 체험 상품 20% 할인!" type="experience" />
        <ProductLinkItem keywordParams="" typeParams="" linkTitle="전체 체험 상품" />
        <Title title="톡! 터지는 옥수수의 반전 매력" content="7월 제철 채소 옥수수🌽" type="crop" />
        <ProductLinkItem keywordParams="옥수수" linkTitle="옥수수" />
        {/* <Title title="톡! 터지는 옥수수의 반전 매력" content="7월 제철 채소 옥수수🌽" type="gardening" /> */}
      </main>
      <footer>
        <Link href="/product/crop/veggie/1/detail">상세페이지로 이동하기 (임시)</Link>
      </footer>
    </div>
  );
}
