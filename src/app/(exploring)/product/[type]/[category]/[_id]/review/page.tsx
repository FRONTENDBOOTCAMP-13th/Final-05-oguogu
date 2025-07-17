import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';
import { ReviewSortbar } from '@/components/layouts/SortBar/Sortbar';

export default function ProductReview() {
  const loggined: boolean = true;
  return (
    <div>
      <ReviewSortbar />
      <section className="px-4 flex flex-col gap-4">
        {loggined ? (
          <button className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            리뷰 작성하기
          </button>
        ) : (
          <button className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            <p className="text-oguogu-main pr-1 ">로그인</p> 후 리뷰 작성하기
          </button>
        )}
        <ProductLinkItem linkTitle="전체 농산물" />
      </section>
      <section className="px-4 mt-3 flex flex-col gap-4">
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
        <ReviewItem name="김땡땡" email="abcd@gamil.com" />
      </section>
    </div>
  );
}
