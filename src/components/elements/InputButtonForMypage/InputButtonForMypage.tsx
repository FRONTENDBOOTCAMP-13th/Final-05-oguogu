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
          <>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.0332 0C10.9175 7.03683e-05 14.0663 3.1489 14.0664 7.0332C14.0663 10.9175 10.9175 14.0663 7.0332 14.0664C3.1489 14.0663 7.03703e-05 10.9175 0 7.0332C7.05161e-05 3.1489 3.1489 7.05141e-05 7.0332 0Z"
                fill="#489F51"
              />
              <path
                d="M8.63965 5.37305C8.83486 5.17783 9.15141 5.17792 9.34668 5.37305C9.54181 5.56832 9.5419 5.88486 9.34668 6.08008L6.7334 8.69336C6.63966 8.7871 6.51244 8.83981 6.37988 8.83984C6.24738 8.83981 6.1201 8.78702 6.02637 8.69336L4.71973 7.38672C4.52458 7.19145 4.5245 6.87491 4.71973 6.67969C4.91495 6.48448 5.23149 6.48454 5.42676 6.67969L6.37988 7.63281L8.63965 5.37305Z"
                fill="#FAFAFA"
              />
            </svg>
          </>
        ) : (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.0332 0C10.9175 7.03683e-05 14.0663 3.1489 14.0664 7.0332C14.0663 10.9175 10.9175 14.0663 7.0332 14.0664C3.1489 14.0663 7.03703e-05 10.9175 0 7.0332C7.05161e-05 3.1489 3.1489 7.05141e-05 7.0332 0ZM7.0332 1C3.70119 1.00007 1.00007 3.70119 1 7.0332C1.00007 10.3652 3.70119 13.0663 7.0332 13.0664C10.3652 13.0663 13.0663 10.3652 13.0664 7.0332C13.0663 3.70119 10.3652 1.00007 7.0332 1ZM8.63965 5.37305C8.83486 5.17783 9.15141 5.17792 9.34668 5.37305C9.54181 5.56832 9.5419 5.88486 9.34668 6.08008L6.7334 8.69336C6.63966 8.7871 6.51244 8.83981 6.37988 8.83984C6.24738 8.83981 6.1201 8.78702 6.02637 8.69336L4.71973 7.38672C4.52458 7.19145 4.5245 6.87491 4.71973 6.67969C4.91495 6.48448 5.23149 6.48454 5.42676 6.67969L6.37988 7.63281L8.63965 5.37305Z"
              fill="black"
            />
          </svg>
        )}
        <span className="translate-y-[0.5px]">{title}</span>
      </label>
    </>
  );
}
