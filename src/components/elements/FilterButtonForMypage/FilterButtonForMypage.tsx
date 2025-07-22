import { FilterButtonForMypageType } from '@/components/elements/FilterButtonForMypage/FilterButtonForMypage.type';

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
        className="text-xs px-3.5 py-1 border border-oguogu-gray-2 rounded-sm peer-checked:border-oguogu-main-dark"
      >
        {title}
      </label>
    </div>
  );
}
