import Header from '@/components/layouts/Header/Header';
import Navigation from '@/components/layouts/Navigation/Navigation';
import SlideBanner from '@/components/layouts/Banner/SlideBanner';
import { ImageCategory } from '@/components/layouts/Category/Category';
import Title from '@/components/elements/CommonTitleItem/Title';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import ProductItemList from '@/components/elements/ProductItem/List/ProductItemList';
import Footer from '@/components/layouts/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오구오구 - 산지직송 농산물과 특별한 농촌 체험',
  description:
    '신선한 농산물, 직접 키우는 텃밭, 가족과 함께하는 농촌 체험까지! 오구오구에서 건강한 즐거움을 만나보세요.',
  keywords: ['산지직송', '신선한 농산물', '농촌 체험', '텃밭', '옥수수', '유기농', '무농약', '농부 직거래', '오구오구'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://final-05-oguogu.vercel.app/',
  },
  openGraph: {
    title: '오구오구 - 산지직송 농산물과 특별한 농촌 체험',
    description:
      '지금 오구오구에서 제철 농산물과 특별한 체험 상품을 만나보세요. 텃밭 성장 히스토리까지 기록해드립니다!',
    url: 'https://final-05-oguogu.vercel.app/',
    type: 'website',
    /* images: [
      {
        url: 'https://final-05-oguogu.vercel.app/images/main-og-image.png',
        width: 1200,
        height: 630,
        alt: '오구오구 대표 이미지',
      },
    ], */
  },
  twitter: {
    card: 'summary_large_image',
    title: '오구오구 - 산지직송 농산물과 특별한 농촌 체험',
    description: '신선함과 즐거움이 가득한 오구오구. 지금 만나보세요!',
    /*  images: ['https://final-05-oguogu.vercel.app/images/main-og-image.png'], */
  },
};

export default function Home() {
  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 네비게이션 */}
      <Navigation />

      {/* 메인 슬라이드배너 */}
      <SlideBanner />

      {/* 보조 네비게이션(aside) */}
      <aside className="flex flex-col pt-6 gap-y-2 mobile-max:gap-y-4 mobile-max:pt-8 ">
        <ImageCategory />
        <ProductLinkItem link="/product/crop" linkTitle="전체 농산물" subTxt="보러 가기" />
      </aside>

      {/* 메인 */}
      <main className="flex flex-col pt-8 gap-y-8 mobile-max:gap-y-12 mobile-max:pt-12 ">
        {/* 추천 카테고리 1 */}
        <article id="link1" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-y-8">
            <Title title="이번 주말엔 농장으로!" description="당일치기부터 1박2일까지, 온 가족이 함께 즐겨요 🧑🏻‍🌾" />
            <ProductItemList type="experience" />
          </div>
          <ProductLinkItem
            keywordParams=""
            typeParams=""
            link="/product/experience"
            linkTitle="전체 체험 상품"
            subTxt="보러 가기"
          />
        </article>

        {/* 추천 카테고리 2 */}
        <article id="link2" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-y-8">
            <Title title="톡! 터지는 옥수수의 반전 매력" description="7월 제철 농산물 찰옥수수를 만나보세요 🌽" />
            <ProductItemList type="crop" />
          </div>
          <ProductLinkItem link="/search/result" linkTitle="옥수수" subTxt="구매하러 가기" />
        </article>

        {/* 추천 카테고리 3 */}
        <article id="link3" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-y-8">
            <Title title="씨앗을 심는 그 순간부터 수확까지" description="구매한 농산물이 자라는 과정을 함께 해요 🌾" />
            <ProductItemList type="gardening" />
          </div>
          <ProductLinkItem link="/product/gardening" linkTitle="텃밭 상품" subTxt="구경하러 가기" />
        </article>
      </main>
      {/* 푸터 */}
      <Footer />
    </>
  );
}
