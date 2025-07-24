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
}: CommonButtonProps) {
  return (
    <button
      onClick={() => onClick}
      type={type}
      className={`relative flex flex-1 items-center justify-center text-center 
         ${textSize} ${height} ${width} ${bgColor} ${textColor}  ${cursorPointer ? 'cursor-pointer' : ''} 
         px-[24px] py-[6px] rounded-[4px]`}
    >
      {icon && <span className="absolute left-[16px] ">{icon}</span>}
      {feature}
    </button>
  );
}
