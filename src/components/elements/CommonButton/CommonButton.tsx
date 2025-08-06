import CommonButtonProps from '@/components/elements/CommonButton/CommonButton.type';

export default function CommonButton({
  feature,
  textSize,
  height,
  width,
  icon,
  textColor = 'text-oguogu-white ',
  bgColor = 'bg-oguogu-main',
  cursorPointer,
  type,
  onClick,
  borderColor,
  border,
}: CommonButtonProps) {
  return (
    <button
      onClick={e => onClick?.(e)}
      type={type}
      aria-label="공통 버튼"
      className={`relative flex flex-1 items-center justify-center text-center 
         ${textSize} ${height} ${width} ${bgColor} ${textColor} ${border} ${borderColor} ${cursorPointer ? 'cursor-pointer' : ''} 
         px-[24px] py-[6px] rounded-[4px]`}
    >
      {icon && <span className="absolute left-[16px] ">{icon}</span>}
      {feature}
    </button>
  );
}
