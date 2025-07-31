import SelectBoxProps from '@/components/elements/SelectBox/SelectBox.type';
// CHECKLIST
// sort , filter 파일에서 기능 업데이트
// [ ] 선택된 카테고리에 따라 화면 출력 필터링 하는 기능 만들어야함 - sort , filter
// [ ] <div></div> -> wrapper는 sort, filter 조립하기 전에 추가 ( wrapper 디자인 필요하면 추가 )
// [ ] 경로 수정이 필요하다면 수정하기

export default function SelectBox({ label, name, id, options, value, onChange, changeBoxSize }: SelectBoxProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`text-base ${changeBoxSize} text-right`}
      >
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
}
