'use client';

import Link from 'next/link';
import { useAuthStore } from '@/shared/store/authStore';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ReviewClientControl() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  console.log(imageFile);

  const handleRatingClick = (score: number) => {
    setRating(score);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedFileName(file.name);
    }
  };

  const handleCancel = () => {
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!title || !content || rating === 0) {
      toast.error('제목, 내용, 별점을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);

    // TODO: API 전송 처리
    setTimeout(() => {
      toast.success('리뷰가 등록되었습니다!');
      setTitle('');
      setContent('');
      setRating(0);
      setImageFile(null);
      setImagePreview(null);
      setIsLoading(false);
      setIsOpen(false); // 폼 닫기
      setSelectedFileName('');
    }, 1000);
  };

  const handleCancelModal = () => {
    setTitle('');
    setContent('');
    setRating(0);
    setImageFile(null);
    setImagePreview(null);
    setIsOpen(false);
    setSelectedFileName('');
  };

  return (
    <div className="px-4 flex flex-col gap-4 mb-6">
      {isLoggedIn ? (
        <button
          onClick={() => setIsOpen(true)}
          className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center"
        >
          리뷰 작성하기
        </button>
      ) : (
        <Link
          href="/login"
          className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
        >
          <p className="text-oguogu-main pr-1">로그인</p> 후 리뷰 작성하기
        </Link>
      )}

      {isOpen && (
        <div className="p-4 border-1 border-oguogu-main-dark rounded-[8px] shadow-xl flex flex-col gap-4">
          <h2 className="text-[14px]">리뷰 작성</h2>

          {/* 별점 */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Image
                key={star}
                src={
                  rating >= star ? '/images/iconImage/icon-star-filled.svg' : '/images/iconImage/icon-star-empty.svg'
                }
                alt={`${star}점`}
                width={17}
                height={16}
                onClick={() => handleRatingClick(star)}
                className="cursor-pointer"
              />
            ))}
          </div>

          {/* 제목 */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요 (최대 20자 제한)"
            className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 text-[12px] ${
              title ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-3'
            } focus:outline-none focus:ring-1 focus:ring-amber-900`}
            maxLength={20}
          />

          {/* 내용 */}
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요 (최대 200자 제한)"
            className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 min-h-[164px] text-[12px] ${
              content ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-3'
            } focus:outline-none focus:ring-1 focus:ring-amber-900`}
            maxLength={200}
          />

          {/* 이미지 첨부 */}
          <div className="flex items-center gap-2 w-full">
            {/* 파일명 표시 필드 */}
            <div className="flex-grow px-3 py-1 text-[12px] rounded-[8px] border border-gray-300 bg-gray-100 text-gray-400 truncate">
              {selectedFileName || '선택된 파일 없음'}
            </div>

            {/* 업로드 버튼 */}
            <button
              type="button"
              onClick={handleFileButtonClick}
              className="px-3 py-1 text-[12px] rounded-[8px]  border border-oguogu-main-dark  "
            >
              업로드
            </button>

            {/* 취소 버튼 */}
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 text-[12px] rounded-[8px]  border border-gray-400  "
            >
              취소
            </button>

            {/* 숨겨진 파일 input */}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>

          {imagePreview && (
            <Image
              src={imagePreview}
              alt="미리보기"
              width={100}
              height={100}
              className="rounded border border-gray-300"
            />
          )}

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2">
            <button onClick={handleCancelModal} className="rounded border border-oguogu-main-dark px-3 py-2 leading-3">
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className=" rounded border border-oguogu-main-dark px-3 py-2 leading-3 w-[138px] "
            >
              {isLoading ? '등록 중...' : '리뷰 등록하기'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
