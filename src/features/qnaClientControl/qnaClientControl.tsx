'use client';

import Link from 'next/link';
import { useAuthStore } from '@/shared/store/authStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createPost } from '@/shared/data/actions/post';
import { useRouter } from 'next/navigation';

/**
 * QnA 페이지에서 로그인 여부에 따라
 * "문의글 작성하기" 버튼 또는 로그인 유도 링크를 보여주는 컴포넌트입니다.
 *
 * @component
 * @returns 로그인 상태에 따른 QnA 작성 컨트롤 UI
 */

export default function QnaClientControls({ _id }: { _id: string }) {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const token = useAuthStore(state => state.token);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle('');
    setContent('');
  };

  const handleSubmit = async () => {
    if (!token) return;

    if (!title || !content) {
      toast.error('제목과 내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    const res = await createPost({ type: 'qna', title, content, product_id: Number(_id) }, token);

    setIsLoading(false);

    if (res.ok) {
      toast.success('게시글이 등록되었습니다.');
      closeModal();
      router.refresh();
    } else {
      toast.error(res.message || '등록에 실패했습니다.');
    }
  };

  return (
    <div className="px-4 flex flex-col gap-4">
      {isLoggedIn ? (
        <button
          onClick={openModal}
          className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
        >
          문의글 작성하기
        </button>
      ) : (
        <Link
          href="/login"
          className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
        >
          <p className="text-oguogu-main-dark pr-1">로그인</p> 후 문의글 작성하기
        </Link>
      )}
      {isOpen && (
        <div className="p-4 border-1 border-oguogu-main-dark rounded-[8px] shadow-xl flex flex-col gap-4">
          <h2 className="text-[14px]">문의글 작성</h2>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요 (최대 20자 제한)"
            className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 mb-3 text-[12px] ${title ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-4'} 
            focus:outline-none focus:ring-1 focus:ring-amber-900`}
            maxLength={20}
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요 (최대 200자 제한)"
            className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 mb-4 min-h-[164px] text-[12px] ${content ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-4'} 
            focus:outline-none focus:ring-1 focus:ring-amber-900`}
            maxLength={200}
          />
          <div className="flex justify-end gap-2">
            <button onClick={closeModal} className="rounded border border-oguogu-main-dark px-3 py-2 leading-3">
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className=" rounded border border-oguogu-main-dark px-3 py-2 leading-3 w-[138px] "
            >
              {isLoading ? '등록 중...' : '문의글 등록하기'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
