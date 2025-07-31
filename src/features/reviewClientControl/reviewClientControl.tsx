'use client';

import { useAuthStore } from '@/shared/store/authStore';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { handleSubmitType } from '@/features/orderClientControl/orderClientControl';
import { Order } from '@/shared/types/order';

export interface ReviewClientControlType {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  handleSubmit: (params: handleSubmitType) => void;
  item: Order;
}

export default function ReviewClientControl({ isOpen, setIsOpen, handleSubmit, item }: ReviewClientControlType) {
  const token: string | null = useAuthStore(state => state.token);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

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
      setImageFile(file);
    }
  };

  const handleCancel = () => {
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const order_id = item._id;
  const product_id = item.products[0]._id;

  const clickHandleSubmit = () => {
    if (!token) return;

    /* // 2) 이미지 선택 검증)
    if (!imageFile) {
      toast.error('이미지를 선택해주세요.');
      return;
    }
 */
    handleSubmit({
      title,
      content,
      rating,
      imageFile,
      setTitle,
      setContent,
      setRating,
      setImageFile,
      setImagePreview,
      setIsOpen,
      setSelectedFileName,
      setIsLoading,
      order_id,
      product_id,
      token,
    });
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
    <div className=" flex flex-col gap-4 mb-6">
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
              onClick={clickHandleSubmit}
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
