// 'use client';

import { deleteBookmark } from '@/shared/data/actions/bookmarks';
import { createCart } from '@/shared/data/actions/cart';
import { BookmarkItem } from '@/shared/types/bookmarkt';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation'; // 필요하면 라우팅 구조 사용하기

export default function PickListItem({
  item,
  token,
  onDeleted,
}: {
  item: BookmarkItem;
  token: string;
  onDeleted: (deletedId: number) => void;
}) {
  // const router = useRouter();

  /* 찜하기 제거하기 버튼 */
  const handleDeleteBookmark = async () => {
    if (token === null) return;

    try {
      await deleteBookmark(
        item._id,
        {
          target_id: 'any',
        },
        token,
      );

      console.log('삭제된 북마크', item.product.name);
      onDeleted(item._id);
    } catch (err) {
      console.log('찜하기 제거 오류', err);
    }
  };

  /* 장바구니 추가 버튼 */
  const handleAddCart = async () => {
    if (token === null) return;

    try {
      await createCart({ product_id: item.product._id, quantity: 1 }, token);

      toast.success('장바구니 추가 완료');
      console.log('북마크에서 장바구니 추가', item.product.name);
      // router.push('/mypage/cart');
    } catch (err) {
      console.log('장바구니 추가 버튼 에러', err);
    }
  };

  return (
    <>
      <div className="flex text-base gap-2 min-h-20">
        {/* 이미지 */}
        <Link
          href={`/search/result/${item.product._id}/detail`}
          className="flex items-center justify-center min-w-[80px] h-[80px] overflow-hidden rounded-sm"
        >
          <Image src="/images/crop/crop-001.png" alt={item.product.name} width={100} height={100} />
        </Link>

        {/* 텍스트 */}
        <div className="px-2 py-1 flex flex-col justify-between w-full text-base">
          <div className="flex flex-col justify-between h-full">
            {/* 판매자명 & 상품명 */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <Image src="/images/product-hatIcon.svg" alt="농사꾼 모자 아이콘" width={16} height={16} />
                <span className="leading-tight line-clamp-1 text-xs">{item.product.seller?.name ?? '오구텃밭'}</span>
              </div>
              <span className="leading-tight line-clamp-1">{item.product.name}</span>
            </div>

            {/* 판매가격 */}
            <span className="leading-tight">
              {(item.product.price * (1 - item.product.extra!.dcRate! / 100)).toLocaleString()}&nbsp;원
            </span>
          </div>
        </div>

        {/* 상호작용 버튼 */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className="text-xs border border-oguogu-main rounded-sm w-[28px] h-full flex items-center justify-center"
            onClick={handleAddCart}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 11L14 20M19 11L15 4M2 11H22M3.5 11L5.1 18.4C5.1935 18.8586 5.44485 19.2698 5.81028 19.5621C6.17572 19.8545 6.63211 20.0094 7.1 20H16.9C17.3679 20.0094 17.8243 19.8545 18.1897 19.5621C18.5552 19.2698 18.8065 18.8586 18.9 18.4L20.6 11M4.5 15.5H19.5M5 11L9 4M9 11L10 20"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-xs border border-oguogu-gray-2 rounded-sm w-[28px] h-full flex items-center justify-center gap-1 cursor-pointer"
            onClick={handleDeleteBookmark}
          >
            <svg width="12" height="12" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.57694 2.46314C6.75174 2.48005 6.87937 2.63066 6.86198 2.79968L6.50568 6.24519C6.47925 6.5014 6.45805 6.71124 6.42655 6.88101C6.39439 7.05433 6.34725 7.20943 6.25793 7.35296L6.25835 7.35337C6.11808 7.57916 5.91175 7.76005 5.66548 7.8726C5.50905 7.9439 5.34416 7.97307 5.16252 7.98678C4.98489 8.00017 4.76692 8 4.50047 8H3.49953C3.23328 8 3.01523 8.00023 2.83748 7.98678C2.65586 7.97302 2.49142 7.94337 2.33493 7.8718C2.08845 7.75935 1.88166 7.57924 1.74124 7.35337C1.65233 7.21006 1.6061 7.05435 1.57386 6.88101C1.55809 6.7962 1.54469 6.70141 1.53202 6.59575L1.4939 6.24519L1.13802 2.79968L1.13636 2.76843C1.13659 2.61244 1.25911 2.47898 1.42306 2.46314C1.58693 2.44738 1.73394 2.55475 1.7661 2.70753L1.77107 2.73878L2.12695 6.18389L2.16424 6.52484C2.17575 6.6211 2.1868 6.70174 2.19987 6.77204C2.22526 6.90857 2.25331 6.98249 2.28646 7.03606C2.36207 7.15769 2.47357 7.25515 2.6063 7.31571C2.6648 7.34249 2.74396 7.36255 2.88719 7.3734C3.03435 7.38453 3.22335 7.38462 3.49953 7.38462H4.50047C4.77695 7.38462 4.96603 7.3845 5.11322 7.3734C5.25611 7.36262 5.33467 7.34275 5.39329 7.31611L5.44218 7.29167C5.55332 7.2308 5.64662 7.14285 5.71271 7.03646L5.71313 7.03606C5.74649 6.98248 5.77479 6.90897 5.80013 6.77244C5.82621 6.63187 5.84519 6.44989 5.87263 6.18389L6.22893 2.73878C6.24641 2.56975 6.40216 2.44633 6.57694 2.46314Z"
                fill="black"
              />
              <path
                d="M3.36364 3.07692C3.53936 3.07692 3.68182 3.21468 3.68182 3.38462V5.4359C3.68182 5.60583 3.53936 5.74359 3.36364 5.74359C3.18791 5.74359 3.04545 5.60583 3.04545 5.4359V3.38462C3.04545 3.21468 3.18791 3.07692 3.36364 3.07692Z"
                fill="black"
              />
              <path
                d="M4.63636 3.07692C4.81209 3.07692 4.95455 3.21468 4.95455 3.38462V5.4359C4.95455 5.60583 4.81209 5.74359 4.63636 5.74359C4.46064 5.74359 4.31818 5.60583 4.31818 5.4359V3.38462C4.31818 3.21468 4.46064 3.07692 4.63636 3.07692Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.64424 0C4.98292 0 5.25634 0.224173 5.3531 0.518029L5.37009 0.577724L5.37506 0.603365L5.49935 1.4359H7.18182C7.35755 1.4359 7.5 1.57366 7.5 1.74359C7.5 1.91352 7.35755 2.05128 7.18182 2.05128H0.818182C0.642455 2.05128 0.5 1.91352 0.5 1.74359C0.5 1.57366 0.642455 1.4359 0.818182 1.4359H2.50065L2.62494 0.603365L2.62991 0.578125C2.7071 0.254607 2.99501 0 3.35576 0H4.64424ZM3.35576 0.615385C3.32393 0.615385 3.27133 0.639733 3.25178 0.709535L3.14364 1.4359H4.85636L4.74781 0.710737C4.728 0.639667 4.67571 0.615385 4.64424 0.615385H3.35576Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
