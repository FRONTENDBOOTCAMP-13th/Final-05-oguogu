'use client';

import {
  CheckButtonForMypageType,
  InputButtonForMypageType,
} from '@/components/elements/InputButtonForMypage/InputButtonForMypage.type';

/**
 * 마이페이지 필터용 라디오 버튼 컴포넌트
 * @param {string} props.name - 라디오 그룹 이름
 * @param {string} props.type - 라디오 버튼의 id 및 구분값
 * @param {string} props.title - 라벨에 표시될 텍스트
 * @param {boolean} props.isChecked - 기본 선택 여부
 */
export default function FilterButtonForMypage({ name, type, title, isChecked, onClick }: InputButtonForMypageType) {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={type}
        hidden
        className="peer"
        onClick={onClick}
        onChange={() => {
          console.log(`${type} 선택됨`);
        }}
        defaultChecked={isChecked}
      />
      <label
        htmlFor={type}
        className="text-xs px-3.5 py-0.5 border border-oguogu-gray-2 rounded-sm peer-checked:border-oguogu-main-dark cursor-pointer"
      >
        {title}
      </label>
    </div>
  );
}

export function CheckButtonForMypage({ name, type, title, isChecked, selectAll }: CheckButtonForMypageType) {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={type}
        hidden
        onChange={() => {
          console.log('전체 선택 체크');
          selectAll();
        }}
        defaultChecked={isChecked}
      />
      <label htmlFor={type} className="text-sm flex items-center gap-1">
        {isChecked ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.2078 5.29375C14.1151 5.2004 14.0048 5.12637 13.8833 5.07595C13.7618 5.02553 13.6315 4.99971 13.5 5H11.5V4.5C11.5 3.57174 11.1313 2.6815 10.4749 2.02513C9.8185 1.36875 8.92826 1 8 1C7.07174 1 6.1815 1.36875 5.52513 2.02513C4.86875 2.6815 4.5 3.57174 4.5 4.5V5H2.5C2.23478 5 1.98043 5.10536 1.79289 5.29289C1.60536 5.48043 1.5 5.73478 1.5 6V12.75C1.5 13.9688 2.53125 15 3.75 15H12.25C12.8395 15.0002 13.4057 14.7697 13.8275 14.3578C14.0398 14.1553 14.2088 13.9119 14.3244 13.6423C14.4399 13.3727 14.4997 13.0824 14.5 12.7891V6C14.5004 5.86881 14.4748 5.73884 14.4246 5.61761C14.3745 5.49638 14.3008 5.38631 14.2078 5.29375ZM10.3903 8.5625L7.59031 12.0625C7.54433 12.12 7.48623 12.1665 7.42017 12.199C7.35411 12.2314 7.2817 12.2488 7.20813 12.25H7.2C7.12778 12.25 7.05642 12.2344 6.99082 12.2042C6.92522 12.1739 6.86694 12.1299 6.82 12.075L5.62 10.6725C5.57732 10.6226 5.54489 10.5648 5.52455 10.5023C5.50422 10.4399 5.49638 10.3741 5.50149 10.3086C5.5066 10.2431 5.52455 10.1793 5.55432 10.1208C5.58409 10.0623 5.6251 10.0102 5.675 9.9675C5.7249 9.92482 5.78272 9.89239 5.84516 9.87205C5.9076 9.85172 5.97343 9.84388 6.03889 9.84899C6.10436 9.8541 6.16817 9.87205 6.2267 9.90182C6.28523 9.93159 6.33732 9.9726 6.38 10.0225L7.1875 10.9659L9.60969 7.9375C9.69257 7.8339 9.81321 7.76747 9.94507 7.75282C10.0769 7.73816 10.2092 7.77649 10.3128 7.85938C10.4164 7.94226 10.4828 8.0629 10.4975 8.19476C10.5121 8.32662 10.4738 8.4589 10.3909 8.5625H10.3903ZM10.5 5H5.5V4.5C5.5 3.83696 5.76339 3.20107 6.23223 2.73223C6.70107 2.26339 7.33696 2 8 2C8.66304 2 9.29893 2.26339 9.76777 2.73223C10.2366 3.20107 10.5 3.83696 10.5 4.5V5Z"
              fill="#489F51"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8.25L7.2 11.75L6 10.3475" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M5 5.5V4.5C5 3.70435 5.31607 2.94129 5.87868 2.37868C6.44129 1.81607 7.20435 1.5 8 1.5C8.79565 1.5 9.55871 1.81607 10.1213 2.37868C10.6839 2.94129 11 3.70435 11 4.5V5.5M2.5 5.5C2.36739 5.5 2.24021 5.55268 2.14645 5.64645C2.05268 5.74021 2 5.86739 2 6V12.75C2 13.695 2.805 14.5 3.75 14.5H12.25C13.195 14.5 14 13.7341 14 12.7891V6C14 5.86739 13.9473 5.74021 13.8536 5.64645C13.7598 5.55268 13.6326 5.5 13.5 5.5H2.5Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="translate-y-[1px]">{title}</span>
      </label>
    </>
  );
}
