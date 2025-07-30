import BadgeProps from '@/components/elements/ProductItem/Badge/Badge.type';

export default function Badge({ type, size = 8 }: BadgeProps) {
  let bgColor;
  let textColor;
  let content;

  switch (type) {
    case 'inseason':
      bgColor = 'bg-oguogu-main-dark';
      textColor = 'text-oguogu-white';
      content = '제철 상품';
      break;
    case 'best':
      bgColor = 'bg-oguogu-yellow';
      textColor = 'text-oguogu-black';
      content = '인기 상품';
      break;
    case 'lowstock':
      bgColor = 'bg-ogugu-blue-light';
      textColor = 'text-oguogu-white';
      content = '마감 임박';
      break;
    case 'new':
      bgColor = 'bg-[#D1E231]';
      textColor = 'text-oguogu-black';
      content = '신상품';
      break;
    case 'sold':
      bgColor = 'bg-oguogu-gray-3';
      textColor = 'text-oguogu-black';
      content = '품절';
      break;
    case 'express':
      bgColor = 'bg-[#FFF000]';
      textColor = 'text-oguogu-black';
      content = '특급 배송';
      break;
    case 'safe':
      bgColor = 'bg-[#A7D8F0]';
      textColor = 'text-oguogu-black';
      content = '안심 배송';
      break;
  }

  return (
    <>
      <span
        className={`${bgColor} ${textColor} 
        text-[${size}px] px-[6px] py-[4px] rounded-[8px] mr-1 shadow-sm shadow-oguogu-black/15`}
      >
        {content}
      </span>
    </>
  );
}
