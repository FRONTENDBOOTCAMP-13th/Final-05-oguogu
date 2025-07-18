import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';
import { ReviewSortbar } from '@/components/layouts/SortBar/Sortbar';
import { Link } from 'lucide-react';

export default function ProductReview() {
  const loggined: boolean = true;

  return (
    <div>
      <ReviewSortbar />
      <div className="px-4 flex flex-col gap-4 mb-6">
        {loggined ? (
          <button className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center">
            리뷰 작성하기
          </button>
        ) : (
          <Link
            href="/login"
            className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
          >
            <p className="text-oguogu-main pr-1 ">로그인</p> 후 리뷰 작성하기
          </Link>
        )}
      </div>

      <section className="px-4 flex flex-col gap-8">
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
