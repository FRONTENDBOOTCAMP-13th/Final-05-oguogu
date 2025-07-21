'use client';

import { createBookmark } from '@/shared/data/actions/bookmarks';
import { useAuthStore } from '@/shared/store/authStore';
import { productRes } from '@/shared/types/product';

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
export default function BuyBox({ onOpenModal, res }: { onOpenModal: () => void; res: productRes }) {
  const token = useAuthStore(state => state.token);

  /**
   * '찜' 버튼 클릭 시 호출되는 함수
   * - 토큰이 없으면 로그인 필요 알림 출력
   * - 토큰이 있으면 API 요청 후 결과에 따라 알림 표시
   */
  const bookmarkRes = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const response = await createBookmark({ target_id: res.item._id, extra: { type: 'like' } }, token);

      if (response.ok === 1) {
        alert('북마크가 등록되었습니다!');
      } else {
        // 이미 등록된 경우도 포함해서 메시지 출력
        alert(response.message || '북마크 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-0 w-full min-w-[320px] max-w-[768px] h-[68px] bg-oguogu-white z-999 px-4 py-3 ">
      <div className="flex f items-center justify-between gap-2">
        <button
          onClick={bookmarkRes}
          className="flex items-center justify-center border border-oguogu-main bg-oguogu-white w-[46px] h-[44px] rounded-[4px] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M11.105 16.9482L11 17.0572L10.8845 16.9482C5.897 12.2507 2.6 9.14441 2.6 5.99455C2.6 3.81471 4.175 2.17984 6.275 2.17984C7.892 2.17984 9.467 3.26975 10.0235 4.75204H11.9765C12.533 3.26975 14.108 2.17984 15.725 2.17984C17.825 2.17984 19.4 3.81471 19.4 5.99455C19.4 9.14441 16.103 12.2507 11.105 16.9482ZM15.725 0C13.898 0 12.1445 0.882834 11 2.26703C9.8555 0.882834 8.102 0 6.275 0C3.041 0 0.5 2.6267 0.5 5.99455C0.5 10.1035 4.07 13.4714 9.4775 18.5613L11 20L12.5225 18.5613C17.93 13.4714 21.5 10.1035 21.5 5.99455C21.5 2.6267 18.959 0 15.725 0Z"
              fill="#489F51"
            />
          </svg>
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
