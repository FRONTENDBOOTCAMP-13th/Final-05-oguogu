import { FilterButtonForMypageType } from '@/components/elements/FilterButtonForMypage/FilterButtonForMypage.type';

/**
 * 마이페이지 필터용 라디오 버튼 컴포넌트
 * @param {string} props.name - 라디오 그룹 이름
 * @param {string} props.type - 라디오 버튼의 id 및 구분값
 * @param {string} props.title - 라벨에 표시될 텍스트
 * @param {boolean} props.isChecked - 기본 선택 여부
 */
export default function FilterButtonForMypage({ name, type, title, isChecked }: FilterButtonForMypageType) {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={type}
        hidden
        className="peer"
        onChange={() => {
          console.log(`${type} 선택됨`);
        }}
        defaultChecked={isChecked}
      />
      <label
        htmlFor={type}
        className="text-xs px-3.5 py-1 border border-oguogu-gray-2 rounded-sm peer-checked:border-oguogu-main-dark cursor-pointer"
      >
        {title}
      </label>
    </div>
  );
}
