'use client';
import { createPostReplies } from '@/shared/data/actions/post';
import { getPostReplies } from '@/shared/data/functions/post';
import { useAuthStore } from '@/shared/store/authStore';
import { responsePostReplies, responsePostRepliesItem } from '@/shared/types/post';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface QnaItemProps {
  state: boolean; // 답변 완료 여부
  isPrivate: boolean; // 나만 보기 여부 (비밀모드 조건)
  viewerRole: 'owner' | 'seller' | 'other';
  itemRes: responsePostRepliesItem;
}

export default function SellerQnaItem({
  state = false,
  isPrivate = false,
  viewerRole = 'other',
  itemRes,
}: QnaItemProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false); // 답변(리플) 영역 오픈 여부
  const [replyContent, setReplyContent] = useState(''); // 답변 내용
  const [replyFetched, setReplyFetched] = useState(false); // 답변 fetch 여부
  const [replyDate, setReplyDate] = useState(''); // 답변 작성일
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 답변 작성 모달 오픈 여부
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore(state => state.token);

  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
  };

  const handleReplyFetch = async () => {
    if (replyFetched || !state) return; // 답변 없으면 호출 안 함
    const data: responsePostReplies = await getPostReplies(itemRes._id);

    if (data.ok) {
      setReplyContent(data.item[0].content);
      setReplyDate(data.item[0].createdAt);
      setReplyFetched(true);
    } else {
      console.error(data.message);
    }
  };

  const toggleReplyOpen = () => {
    const nextOpen = !isReplyOpen;
    setIsReplyOpen(nextOpen);
    if (nextOpen) handleReplyFetch(); // 열릴 때만 fetch 시도
  };

  // 이름 *표로 변환해주는 함수
  function maskName(name: string): string {
    if (!name) return '';
    if (name.length <= 2) return name; // 두 글자 이하면 마스킹 생략

    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  }

  // 이메일 *표로 변환해주는 함수
  function maskEmail(email: string): string {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    const prefix = atIndex !== -1 ? email.slice(0, atIndex) : email;
    const visible = prefix.slice(0, 3);
    const hidden = '*'.repeat(Math.max(prefix.length - 3, 1));
    return visible + hidden;
  }

  const stateColor = state ? 'main' : 'black';
  const stateBgColor = state ? 'main-light' : 'white';

  // 접근 허용 조건 (비밀모드가 아니거나, 비밀모드여도 글쓴이거나, 관리자(판매자)인 경우 접근 허용)
  const isViewerAllowed = !isPrivate || viewerRole === 'owner' || viewerRole === 'seller';

  const [replyInput, setReplyInput] = useState(''); // 답변 작성 textarea 값

  const handleReplySubmit = async () => {
    if (token === null) return;

    if (!replyInput) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    const res = await createPostReplies(itemRes._id, { content: replyInput });

    setIsLoading(false);

    if (res.ok) {
      toast.success('답변이 등록되었습니다.');
      closeReplyModal();
      window.location.reload();
    } else {
      toast.error(res.message || '등록에 실패했습니다.');
    }
  };

  return (
    <div className={`p-4 bg-oguogu-${stateBgColor} border-t border-oguogu-gray-1 shadow-sm`}>
      <div onClick={toggleReplyOpen} className="cursor-pointer flex flex-col gap-3">
        <div className="flex justify-between">
          <span className={`text-oguogu-${stateColor} flex items-center gap-1`}>
            {state ? '답변 완료' : '답변 대기 중'}
            {/* 잠금 표시 */}
          </span>
          <span className="text-[12px] text-oguogu-gray-4">{itemRes.createdAt.split(' ')[0]}</span>
        </div>

        <div>
          <p className="text-[16px] text-oguogu-black">{itemRes.title}</p>
          <p className="text-[12px] text-oguogu-gray-4">{itemRes.content}</p>
        </div>

        <div className="flex gap-3">
          <p className="text-[12px] text-oguogu-black">{maskName(itemRes.user.name)}</p>
          <p className="text-[12px] text-oguogu-black">({maskEmail(itemRes.user.email || '')})</p>
        </div>

        {!state && (
          <>
            <button
              onClick={e => {
                e.stopPropagation();
                openReplyModal();
              }}
              className="border-1 py-1.5 text-oguogu-black border-oguogu-main-dark rounded-md flex items-center text-center justify-center w-full"
            >
              문의글 답변하기
            </button>
            {isReplyModalOpen && (
              <div className="p-4 border-1 border-oguogu-main-dark rounded-[8px] shadow-xl flex flex-col gap-4">
                <h2 className="text-[14px]">문의글 답변 작성하기</h2>

                <textarea
                  value={replyInput}
                  onChange={e => setReplyInput(e.target.value)}
                  placeholder="내용을 입력해 주세요 (최대 200자 제한)"
                  className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 mb-4 min-h-[164px] text-[12px] ${replyInput ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-4'} 
            focus:outline-none focus:ring-1 focus:ring-amber-900`}
                  maxLength={200}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeReplyModal}
                    className="rounded border border-oguogu-main-dark px-3 py-2 leading-3"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleReplySubmit}
                    disabled={isLoading}
                    className=" rounded border border-oguogu-main-dark px-3 py-2 leading-3 w-[138px] "
                  >
                    등록하기
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 조건: 답변 있음 && 열림 상태 && 보기 권한 있음 */}
      {state && isReplyOpen && isViewerAllowed && (
        <div className="mt-4 pt-4 border-t-1 border-oguogu-gray-4">
          <div className="flex justify-between mb-2">
            <span className="text-[12px] text-oguogu-black">상품 담당자</span>
            <span className="text-[12px] text-oguogu-gray-4">{replyDate.split(' ')[0]}</span>
          </div>
          {replyContent
            .split('.')
            .filter(Boolean)
            .map((line, i) => (
              <div key={i}>
                <p className="whitespace-pre-wrap break-words text-[12px] leading-[100%] text-oguogu-gray-4">
                  {line.trim()}.
                </p>
                <br />
              </div>
            ))}
        </div>
      )}

      {/* {!state && isOpen && isViewerAllowed && (
        <div className="mt-4 pt-4 border-t-1 border-oguogu-gray-4 bg-oguogu-white">
          <p className="text-[12px] text-oguogu-gray-3">
            {' '}
            
        </div>
      )}
 */}
    </div>
  );
}
