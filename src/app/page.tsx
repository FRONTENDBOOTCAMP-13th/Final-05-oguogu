import Header from '@/components/layouts/Header/Header';
import Navigation from '@/components/layouts/Navigation/Navigation';
import SlideBanner from '@/components/layouts/Banner/SlideBanner';
import { ImageCategory } from '@/components/layouts/Category/Category';
import Title from '@/components/elements/CommonTitleItem/Title';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import ProductItemList from '@/components/elements/ProductItem/List/ProductItemList';
import Footer from '@/components/layouts/Footer/Footer';
import NoticeItem from '@/components/elements/boardItem/noticeItem';
import { responsePostReplies } from '@/shared/types/post';
import { getPosts } from '@/shared/data/functions/post';
import QnaItem from '@/components/elements/boardItem/qnaItem';
import { ReviewRes } from '@/shared/types/review';
import { getALLReplies } from '@/shared/data/functions/replies';
import ReviewItemCard from '@/components/elements/ReviewItem/ReviewItemCard';

export default async function Home() {
  const noticeRes: responsePostReplies = await getPosts('notice');
  const qnaRes: responsePostReplies = await getPosts('faq');

  const noticeList = await noticeRes.item
    .slice(0, 6)
    .map(item => <NoticeItem key={item._id} type={item.tag} title={item.title} date={item.createdAt} _id={item._id} />);

  const qnaList = await qnaRes.item
    .slice(0, 6)
    .map(item => <QnaItem key={item._id} type={item.tag} title={item.title} _id={item._id} />);

  const reviewRes: ReviewRes = await getALLReplies();
  const ReviewList = reviewRes?.item
    .slice(0, 6)
    .map(review => <ReviewItemCard key={review._id} name={review.user.name} email="abcd@gamil.com" res={review} />);
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
            linkTitle="체험 상품"
            subTxt="보러 가기"
          />
        </article>

        {/* 추천 카테고리 2 */}
        <article id="link2" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-y-8">
            <Title title="톡! 터지는 여름의 맛" description="제철 과일과 함께 시원한 여름을 즐겨보세요 🍉" />
            <ProductItemList type="crop" />
          </div>
          <ProductLinkItem link="/product/crop?category=fruit" linkTitle="제철 과일" subTxt="구매하러 가기" />
        </article>

        {/* 추천 카테고리 3 */}
        <article id="link3" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-y-8">
            <Title title="씨앗을 심는 그 순간부터 수확까지" description="구매한 농산물이 자라는 과정을 함께 해요 🌾" />
            <ProductItemList type="gardening" />
          </div>
          <ProductLinkItem link="/product/gardening" linkTitle="텃밭 상품" subTxt="구경하러 가기" />
        </article>

        {/* 이주의 리뷰 미리보기 */}
        <article id="link4" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-5 ">
            <Title title="이주의 리뷰" description="이번 주 인기 폭발 후기들🔥" />
            {ReviewList?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{ReviewList}</div>
            ) : (
              <p className="text-sm text-gray-400">등록된 리뷰가 없습니다.</p>
            )}
          </div>
        </article>

        {/* 공지사항 미리보기 */}
        <article id="link5" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-5">
            <Title title="공지사항" description="이용에 참고 부탁드립니다" />
            <div className="flex flex-col gap-2">{noticeList}</div>
          </div>
          <ProductLinkItem link="/board/notice" linkTitle="공지사항" subTxt="더보기" />
        </article>

        {/* 자주하는 질문 미리보기 */}
        <article id="link6" className="titleWithProductItem scroll-mt-[130px]">
          <div className="px-4 flex flex-col gap-5">
            <Title title="자주하는 질문" description="FAQ | 고객님들이 가장 많이 찾는 질문" />
            <div className="flex flex-col gap-2">{qnaList}</div>
          </div>
          <ProductLinkItem link="/board/qna" linkTitle="자주하는 질문" subTxt="더보기" />
        </article>
      </main>
      {/* 푸터 */}
      <Footer />
    </>
  );
}
