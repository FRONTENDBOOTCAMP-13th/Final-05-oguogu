'use client';

import HotMarkIcon from '@/components/elements/HotMarkIcon/HotMarkIcon';
import { uploadFile } from '@/shared/data/actions/file';
import { updateProduct } from '@/shared/data/actions/product';
import { getProduct } from '@/shared/data/functions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { fileResponse } from '@/shared/types/file';
import { Extra, Item, productRes } from '@/shared/types/product';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddPeriodForm({ id, sellerId }: { id: number; sellerId: number }) {
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* 토큰 정보 */
  const userId = useAuthStore(state => state.userInfo?._id);
  const type = useAuthStore(state => state.userInfo?.type);
  const token = useAuthStore(state => state.token);

  /* 오늘 날짜를 업로드일자로 기록 */
  const today = new Date();
  const parsedToday = format(today, 'yyyy-MM-dd');

  /* 등록 버튼 클릭 시, DB 전송 */
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* 토큰 및 데이터 오류 시 리턴 */
    if (token === null) return;
    if (!status || !title || !content) {
      toast.error('내용을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const product: productRes = await getProduct(id);
      const allItem: Item = product.item;
      console.log('item', allItem);

      const allExtra: Extra = allItem.extra!;
      console.log('extra', allExtra);

      const period = allExtra.period || [];
      console.log('period', period);

      let fileRes: fileResponse | null = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append('attach', imageFile);

        fileRes = await uploadFile(formData);
        console.log('파일 업로드', fileRes);

        if (!fileRes?.ok) {
          console.error(fileRes?.message);
          toast.error('이미지 업로드에 실패했습니다.');
          return;
        }
      }

      const newPeriodItem = {
        date: parsedToday,
        status: status,
        title: title,
        content: content,
        image: {
          name: imageFile,
          imagePath: fileRes?.item[0]?.path || null,
        },
      };
      console.log('신규 히스토리', newPeriodItem);

      const updatedPeriod = [...period, newPeriodItem];
      console.log('히스토리 전체', updatedPeriod);

      /* 데이터 전송 */
      await updateProduct(
        id!,
        {
          extra: {
            ...allExtra,
            period: updatedPeriod,
          },
        },
        token,
      );

      toast.success('히스토리가 등록되었습니다.');
      setShowForm(false);
      setStatus('');
      setTitle('');
      setContent('');
      setImageFile(null);
      setSelectedFileName('');
      setImagePreview(null);

      // 강제 리프레시
      router.refresh();
    } catch (err) {
      console.log('에러 발생', err);
    } finally {
      setLoading(false);
    }
  };

  /* 등록 폼 취소 버튼 */
  const handleCancle = () => {
    setShowForm(false);
  };

  /* 이미지 등록 취소 버튼 */
  const handleCancelImgFile = () => {
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /* 이미지 파일 선택 버튼 */
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

  return (
    <>
      {type === 'seller' && userId === sellerId ? (
        <div className="mt-8 w-full h-full flex flex-col justify-center items-center gap-2">
          {/* 토글 버튼 */}
          {showForm ? (
            ''
          ) : (
            <button
              onClick={() => setShowForm(prev => !prev)}
              className="w-[40px] h-[40px] text-2xl leading-none rounded-lg bg-oguogu-white/50 text-oguogu-black border border-oguogu-black/20"
            >
              <HotMarkIcon title="히스토리 등록" />
              <div className="flex justify-center items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="content-center"
                >
                  <path
                    d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z"
                    fill="black"
                  />
                </svg>
              </div>
            </button>
          )}

          {/* 입력 폼 */}
          {showForm ? (
            <form
              onSubmit={handleReplySubmit}
              className="min-w-[320px] w-full p-4 space-y-4 bg-oguogu-white border border-oguogu-gray-2 rounded-lg"
            >
              {/* 상태 선택 */}
              <select
                id="status"
                name="gardening-status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className={
                  status
                    ? `w-full text-sm text-center border rounded h-7 border-oguogu-main text-oguogu-gray-4`
                    : `w-full text-sm text-center border rounded h-7 border-oguogu-gray-2 text-oguogu-gray-4`
                }
                required
              >
                <option value="">텃밭 상태</option>
                <option value="seeding">파종</option>
                <option value="sprouting">발아</option>
                <option value="growing">성장</option>
                <option value="harvested">수확 완료</option>
              </select>

              {/* 제목 */}
              <div>
                <label htmlFor="title" className="sr-only">
                  제목
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="제목을 입력해 주세요 (최대 20자 제한)"
                  className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 text-[12px] ${title ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-4'} 
                focus:outline-none focus:ring-1 focus:ring-amber-900`}
                  maxLength={20}
                />
              </div>

              {/* 내용 */}
              <div>
                <label htmlFor="content" className="sr-only">
                  내용
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="내용을 입력해 주세요 (최대 200자 제한)"
                  className={`w-full border border-oguogu-gray-2 rounded px-2 py-2 min-h-[164px] text-[12px] ${content ? 'bg-oguogu-white text-oguogu-black' : 'bg-oguogu-gray-1 text-oguogu-gray-4'} 
                focus:outline-none focus:ring-1 focus:ring-amber-900`}
                  maxLength={200}
                />
              </div>

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
                  onClick={handleCancelImgFile}
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

              {/* 버튼 */}
              <div className="flex w-full justify-end gap-2">
                {loading ? (
                  <button
                    onClick={handleReplySubmit}
                    className="w-full text-sm text-white rounded h-7 bg-oguogu-main hover:bg-oguogu-main-dark"
                    disabled
                  >
                    등록 중
                  </button>
                ) : (
                  <button
                    onClick={handleReplySubmit}
                    className="w-full text-sm text-white rounded h-7 bg-oguogu-main hover:bg-oguogu-main-dark"
                  >
                    히스토리 등록
                  </button>
                )}

                <button
                  onClick={handleCancle}
                  className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-gray-2 bg-oguogu-white hover:bg-oguogu-gray-1"
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}
