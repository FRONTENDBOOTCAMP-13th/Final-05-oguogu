'use client';

import { BuyBoxType } from '@/components/elements/BuyBox/ButBox.type';
import { createBookmark, deleteBookmark } from '@/shared/data/actions/bookmarks';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkPostResponse, BookmarkResponse } from '@/shared/types/bookmarkt';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * 하단 고정형 구매 박스 컴포넌트
 * - '찜' 버튼으로 북마크 등록 가능 (로그인 필요)
 * - '구매하기' 버튼으로 구매 모달 오픈 가능
 *
 * @component
 * @param {Object} props - 컴포넌트 props
 * @param {() => void} props.onOpenModal - '구매하기' 버튼 클릭 시 실행되는 콜백 함수
 * @param {productRes} props.res - 상품 상세 데이터 객체
 * @returns 구매 박스 UI JSX
 */
export default function BuyBox({ onOpenModal, res }: BuyBoxType) {
  const [bookmarkId, setBookmarkId] = useState<number | null>(null);
  const token = useAuthStore(state => state.token);
  const product_id = res.item._id;

  /**
   * '찜' 버튼 클릭 시 호출되는 함수
   * - 토큰이 없으면 로그인 필요 알림 출력
   * - 토큰이 있으면 API 요청 후 결과에 따라 알림 표시
   */
  // 최초 진입 시 북마크 조회
  useEffect(() => {
    if (token === null) return;

    const fetchBookmark = async () => {
      try {
        const data: BookmarkResponse = await getBookmarks('product', token);

        if (data.ok === 1) {
          const found = data.item.find(item => item.product._id === product_id);
          if (found) {
            setBookmarkId(found._id);
          } else {
            setBookmarkId(null);
          }
        }
      } catch (error) {
        console.error('북마크 불러오기 실패:', error);
      }
    };

    fetchBookmark();
  }, [token, product_id]);

  // 찜 버튼 클릭 → 토글 처리
  const handleBookmarkToggle = async () => {
    if (token === null) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (bookmarkId) {
        // 이미 북마크 상태 → 삭제
        const res = await deleteBookmark(bookmarkId, { target_id: 'any' }, token);
        if (res.ok === 1) {
          setBookmarkId(null);
          toast.error('찜한 상품이 취소되었습니다.');
        } else {
          toast.error(res.message || '북마크 삭제 실패');
        }
      } else {
        // 북마크 추가
        const res: BookmarkPostResponse = await createBookmark(
          { target_id: product_id, extra: { type: 'like' } },
          token,
        );

        if (res.ok === 1) {
          setBookmarkId(res.item._id);
          toast.success('찜한 상품에 추가되었습니다!');
        } else {
          toast.error('찜한 상품 등록 실패');
        }
      }
    } catch (err) {
      console.error('북마크 처리 실패:', err);
      toast.error('찜한 상품 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed bottom-0 w-full min-w-[320px] max-w-[768px] h-[68px] bg-oguogu-white z-999 px-4 py-3 ">
      <div className="flex items-center justify-between gap-2 f">
        <button
          onClick={handleBookmarkToggle}
          className="flex items-center justify-center border border-oguogu-main bg-oguogu-white w-[46px] h-[44px] rounded-[4px] cursor-pointer"
        >
          {bookmarkId ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 11 11" fill="none">
              <path
                d="M7.975 0.666992C7.018 0.666992 6.0995 1.10841 5.5 1.80051C4.9005 1.10841 3.982 0.666992 3.025 0.666992C1.331 0.666992 0 1.98034 0 3.66427C0 5.71876 1.87 7.40269 4.7025 9.94765L5.5 10.667L6.2975 9.94765C9.13 7.40269 11 5.71876 11 3.66427C11 1.98034 9.669 0.666992 7.975 0.666992Z"
                fill="#489F51"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.555 9.14086L5.5 9.19536L5.4395 9.14086C2.827 6.79209 1.1 5.23896 1.1 3.66402C1.1 2.57411 1.925 1.75667 3.025 1.75667C3.872 1.75667 4.697 2.30163 4.9885 3.04277H6.0115C6.303 2.30163 7.128 1.75667 7.975 1.75667C9.075 1.75667 9.9 2.57411 9.9 3.66402C9.9 5.23896 8.173 6.79209 5.555 9.14086ZM7.975 0.666748C7.018 0.666748 6.0995 1.10816 5.5 1.80026C4.9005 1.10816 3.982 0.666748 3.025 0.666748C1.331 0.666748 0 1.9801 0 3.66402C0 5.71852 1.87 7.40244 4.7025 9.9474L5.5 10.6667L6.2975 9.9474C9.13 7.40244 11 5.71852 11 3.66402C11 1.9801 9.669 0.666748 7.975 0.666748Z"
                fill="#489F51"
              />
            </svg>
          )}
        </button>
        <button
          className={`flex flex-1 items-center justify-center text-center
         bg-oguogu-main text-oguogu-white 
         text-[16px] h-[44px]
         px-[24px] py-[6px] rounded-[4px]`}
          onClick={onOpenModal}
        >
          구매하기
        </button>
      </div>
    </div>
  );
}
