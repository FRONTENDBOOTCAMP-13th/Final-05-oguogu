export interface InputType {
  title: string;
  placeholder?: string;
  secondPlaceholder?: string;
  required?: boolean;
  secondRequired?: boolean;
  id: string;
  name?: string;
  secondName?: string;
  type?: string;
  unit?: string;
  secontUnit?: string;
  value?: string | number | File | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // onChange 추가
  secondValue?: string | number | File | null;
  onSecondChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // onChange 추가
  selectedFileName?: string;
  handleFileButtonClick?: () => void;
  handleCancel?: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detailText?: string;
  onDetailTextChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Input({
  title,
  placeholder,
  required,
  secondRequired,
  id,
  name,
  secondName,
  type,
  unit,
  secontUnit,
  secondPlaceholder,
  value,
  onChange, // onChange props 받기
  secondValue,
  onSecondChange,
  selectedFileName,
  handleFileButtonClick,
  handleCancel,
  fileInputRef,
  handleFileChange,
  detailText,
  onDetailTextChange,
}: InputType) {
  return (
    <>
      {/* 일반 텍스트 형식 */}
      {type === 'basic' && (
        <div className="flex flex-col gap-1">
          <label htmlFor={id} className="text-[16px]">
            <span>{title}</span>
            {required && <sup className="text-[10px] px-[2px]">*</sup>}
          </label>
          <input
            type="text"
            placeholder={placeholder}
            required={required}
            id={id}
            value={typeof value === 'string' || typeof value === 'number' ? value : ''}
            name={name ?? id}
            className="w-full  font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
            onChange={onChange}
          />
        </div>
      )}

      {/* 한개의 단위를 사용하는 텍스트 형식 */}
      {type === 'unitOne' && (
        <div className="flex flex-col gap-1">
          <label htmlFor={id} className="text-[16px]">
            <span>{title}</span>
            {required && <sup className="text-[10px] px-[2px]">*</sup>}
          </label>
          <div className="flex gap-2 items-center text-[16px] text-oguogu-gray-4">
            <input
              type="text"
              placeholder={placeholder}
              required={required}
              id={id}
              name={name ?? id}
              value={typeof value === 'string' || typeof value === 'number' ? value : ''}
              className="w-full font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
              onChange={onChange}
            />
            <span className="whitespace-nowrap min-w-fit">{unit}</span>
          </div>
        </div>
      )}

      {/* 두개의 단위를 사용하는 텍스트 형식 */}
      {type === 'unitTwo' && (
        <div className="flex flex-col gap-1">
          <label htmlFor={id} className="text-[16px]">
            <span>{title}</span>
            {required && <sup className="text-[10px] px-[2px]">*</sup>}
          </label>
          <div className="flex items-center gap-5">
            <div className="grow-1 flex gap-2 items-center text-[16px] text-oguogu-gray-4">
              <input
                type="text"
                placeholder={placeholder}
                required={required}
                id={id}
                name={name ?? id}
                value={typeof value === 'string' || typeof value === 'number' ? value : ''}
                className="w-full font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
                onChange={onChange}
              />
              <span className="whitespace-nowrap min-w-fit">{unit}</span>
            </div>
            <div className="grow-1 flex gap-2 items-center text-[16px] text-oguogu-gray-4">
              <input
                type="text"
                placeholder={secondPlaceholder}
                required={secondRequired}
                id={id + '_second'}
                name={secondName ?? id + '_second'}
                value={typeof secondValue === 'string' || typeof secondValue === 'number' ? secondValue : ''}
                className="w-full font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
                onChange={onSecondChange}
              />
              <span className="whitespace-nowrap min-w-fit">{secontUnit}</span>
            </div>
          </div>
        </div>
      )}

      {/* 읽기 전용 형식 */}
      {type === 'readOnly' && (
        <div className="flex flex-col gap-1">
          <label htmlFor={id} className="text-[16px]">
            <span>{title}</span>
            {required && <sup className="text-[10px] px-[2px]">*</sup>}
          </label>
          <div className="flex gap-2 items-center text-[12px] text-oguogu-black">
            <div className="flex items-center w-full h-[36px] bg-oguogu-gray-1 font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2  leading-0">
              {placeholder}
            </div>
            <span className="text-[16px] text-oguogu-gray-4">{unit}</span>
          </div>
        </div>
      )}

      {/* 파일 등록 형식 */}
      {type === 'file' && (
        <div className="flex flex-col gap-1">
          <div className="text-[16px]">
            <span>{title}</span>
            {required && <sup className="text-[10px] px-[2px]">*</sup>}
          </div>
          <div className="flex items-center w-full gap-2">
            {/* 파일명 표시 필드 */}
            <div className="flex-grow px-3 py-1 text-[12px] rounded-[8px] border border-gray-300 bg-gray-100 text-gray-400 truncate">
              {selectedFileName || '선택된 파일 없음'}
            </div>

            {/* 업로드 버튼 */}
            <button
              type="button"
              aria-label="파일 업로드 버튼"
              onClick={handleFileButtonClick}
              className="px-3 py-1 text-[12px] rounded-[8px]  border border-oguogu-main-dark  "
            >
              업로드
            </button>

            {/* 취소 버튼 */}
            <button
              type="button"
              aria-label="파일 업로드 취소 버튼"
              onClick={handleCancel}
              className="px-3 py-1 text-[12px] rounded-[8px]  border border-gray-400  "
            >
              취소
            </button>

            {/* 숨겨진 파일 input */}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>
        </div>
      )}

      {/* 자세한 파일 등록 형식 */}
      {type === 'fileDetail' && (
        <div className="flex flex-col gap-1">
          <div className="text-[16px]">
            <span>{title}</span>
            {required && <sup className="text-[10px] px-[2px]">*</sup>}
          </div>
          <div className="flex items-center w-full gap-2">
            {/* 파일명 표시 필드 */}
            <div className="flex-grow px-3 py-1 text-[12px] rounded-[8px] border border-gray-300 bg-gray-100 text-gray-400 truncate">
              {selectedFileName || '선택된 파일 없음'}
            </div>

            {/* 업로드 버튼 */}
            <button
              type="button"
              aria-label="파일 업로드 버튼"
              onClick={handleFileButtonClick}
              className="px-3 py-1 text-[12px] rounded-[8px]  border border-oguogu-main-dark  "
            >
              업로드
            </button>

            {/* 취소 버튼 */}
            <button
              type="button"
              aria-label="파일 업로드 취소 버튼"
              onClick={handleCancel}
              className="px-3 py-1 text-[12px] rounded-[8px]  border border-gray-400  "
            >
              취소
            </button>

            {/* 숨겨진 파일 input */}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>
          <textarea
            className="h-[180px] p-2 mt-2 border border-oguogu-gray-2 text-[12px] text-oguogu-gray-3 rounded-[4px]"
            name={name ? name + '_textarea' : id + '_textarea'}
            id={id + '_textarea'}
            placeholder="내용을 입력해 주세요"
            value={detailText}
            onChange={onDetailTextChange}
          ></textarea>
        </div>
      )}
    </>
  );
}
