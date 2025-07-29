export interface InputType {
  title: string;
  placeholder?: string;
  secondPlaceholder?: string;
  required?: boolean;
  secondRequired?: boolean;
  id: string;
  name?: string; // name 속성 추가
  secondName?: string; // unitTwo 등에서 두 번째 input용 name
  type?: string;
  unit?: string;
  secontUnit?: string;
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
            name={name ?? id} // name 속성 적용
            className="w-full  font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
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
              className="w-full font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
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
          <div className="flex gap-5 items-center">
            <div className="grow-1 flex gap-2 items-center text-[16px] text-oguogu-gray-4">
              <input
                type="text"
                placeholder={placeholder}
                required={required}
                id={id}
                name={name ?? id}
                className="w-full font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
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
                className="w-full font-normal text-[12px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2 leading-0"
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
          <div className="flex gap-2 text-[12px]  ">
            <div className="grow-1 border px-2 py-[2px] text-oguogu-gray-2 border-oguogu-gray-2 rounded-[4px]">
              선택된 파일 없음
            </div>
            <button className="border px-3 border-oguogu-main rounded-[4px]">업로드</button>
            <button className="border px-3 border-oguogu-gray-2 rounded-[4px]">취소 </button>
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
          <div className="flex gap-2 text-[12px]  ">
            <div className="grow-1 border px-2 py-[2px] text-oguogu-gray-2 border-oguogu-gray-2 rounded-[4px]">
              선택된 파일 없음
            </div>
            <button className="border px-3 border-oguogu-main rounded-[4px]">업로드</button>
            <button className="border px-3 border-oguogu-gray-2 rounded-[4px]">취소 </button>
          </div>
          <textarea
            className="h-[180px] p-2 mt-2 border border-oguogu-gray-2 text-[12px] text-oguogu-gray-3 rounded-[4px]"
            name={name ? name + '_textarea' : id + '_textarea'}
            id={id + '_textarea'}
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </div>
      )}
    </>
  );
}
