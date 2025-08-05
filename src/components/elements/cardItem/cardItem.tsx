'use client';

import { CartItem } from '@/shared/types/cart';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CardItem({
  item,
  checked,
  onCheck,
  quantity,
  updateQuantity,
  handleDelete,
}: {
  item: CartItem;
  checked: boolean;
  onCheck: () => void;
  quantity: number;
  updateQuantity: (_id: number, quantity: number) => void;
  handleDelete: (_id: number) => void;
}) {
  const [count, setCount] = useState(quantity);
  console.log(item);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const countUp = () => {
    const remain = item.product.quantity - item.product.buyQuantity;
    const limit = Math.min(remain, item.product.extra.productCnt);

    if (count !== limit) {
      const newCount = count + 1;
      setCount(newCount);
      updateQuantity(item._id, newCount);
    }
  };
  const countDown = () => {
    if (count != 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateQuantity(item._id, newCount);
    }
  };

  const DCprice = (item.product.price * (1 - item.product.extra.dcRate / 100)).toLocaleString();

  return (
    <>
      <div className="min-w-[288px] w-full flex flex-col gap-2">
        {/* 선택 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <input id={`check${item._id}`} type="checkbox" checked={checked} onChange={onCheck} className="hidden" />
            <label
              htmlFor={`check${item._id}`}
              className="text-sm text-oguogu-black truncate translate-y-[0.5px] flex gap-1 items-center"
            >
              {checked ? (
                // 체크된 상태 SVG
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
              ) : (
                // 체크 안된 상태 SVG
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.0332 0C10.9175 7.03683e-05 14.0663 3.1489 14.0664 7.0332C14.0663 10.9175 10.9175 14.0663 7.0332 14.0664C3.1489 14.0663 7.03703e-05 10.9175 0 7.0332C7.05161e-05 3.1489 3.1489 7.05141e-05 7.0332 0ZM7.0332 1C3.70119 1.00007 1.00007 3.70119 1 7.0332C1.00007 10.3652 3.70119 13.0663 7.0332 13.0664C10.3652 13.0663 13.0663 10.3652 13.0664 7.0332C13.0663 3.70119 10.3652 1.00007 7.0332 1ZM8.63965 5.37305C8.83486 5.17783 9.15141 5.17792 9.34668 5.37305C9.54181 5.56832 9.5419 5.88486 9.34668 6.08008L6.7334 8.69336C6.63966 8.7871 6.51244 8.83981 6.37988 8.83984C6.24738 8.83981 6.1201 8.78702 6.02637 8.69336L4.71973 7.38672C4.52458 7.19145 4.5245 6.87491 4.71973 6.67969C4.91495 6.48448 5.23149 6.48454 5.42676 6.67969L6.37988 7.63281L8.63965 5.37305Z"
                    fill="black"
                  />
                </svg>
              )}
              선택
            </label>
          </div>
        </div>

        <div className="flex min-w-[288px] w-full h-full gap-4">
          {/* 이미지 */}
          <Link href={`/search/result/${item.product._id}/detail`}>
            {/* <div className="min-w-[80px] h-[80px] bg-[url('/images/crop/crop-001.png')] bg-cover bg-center bg-no-repeat rounded-[4px]" /> */}
            <div
              style={{
                backgroundImage: `url(${item.product.image.path})`,
              }}
              className="min-w-[80px] h-[80px]  bg-cover bg-center bg-no-repeat rounded-[4px]"
            ></div>
          </Link>

          {/* 텍스트 */}
          <div className="flex flex-col w-full justify-between">
            <span className="leading-tight line-clamp-1 text-base">{item.product.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-base text-oguogu-black leading-tight">
                {/* {(item.price * (1 - item.extra!.dcRate / 100)).toLocaleString()}원 */}
                {DCprice}원
              </span>
              <p className="text-xs text-oguogu-gray-4">
                {item.shippingFees ? `배송비 포함(${item.shippingFees?.toLocaleString()}원)` : '배송비 무료'}
              </p>
            </div>
            <div className="text-[10px] flex">
              <button
                onClick={countDown}
                className="w-[20px] h-[20px] border-[0.5px] border-oguogu-gray-2 border-r-0 rounded-l"
              >
                -
              </button>
              <div className="w-[20px] h-[20px] border-y-[0.5px] border-oguogu-gray-2 flex items-center justify-center">
                {count}
              </div>
              <button
                onClick={countUp}
                className="w-[20px] h-[20px] border-[0.5px] border-oguogu-gray-2 border-l-0 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={() => handleDelete(item._id)}
            className="text-xs border border-oguogu-gray-2 rounded-sm w-[28px] min-h-[80px] h-full flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 8 8"
              fill="none"
              className="min-w-[8px] min-h-[8px]"
            >
              <path
                d="M6.57694 2.46314C6.75174 2.48005 6.87937 2.63066 6.86198 2.79968L6.50568 6.24519C6.47925 6.5014 6.45805 6.71124 6.42655 6.88101C6.39439 7.05433 6.34725 7.20943 6.25793 7.35296L6.25835 7.35337C6.11808 7.57916 5.91175 7.76005 5.66548 7.8726C5.50905 7.9439 5.34416 7.97307 5.16252 7.98678C4.98489 8.00017 4.76692 8 4.50047 8H3.49953C3.23328 8 3.01523 8.00023 2.83748 7.98678C2.65586 7.97302 2.49142 7.94337 2.33493 7.8718C2.08845 7.75935 1.88166 7.57924 1.74124 7.35337C1.65233 7.21006 1.6061 7.05435 1.57386 6.88101C1.55809 6.7962 1.54469 6.70141 1.53202 6.59575L1.4939 6.24519L1.13802 2.79968L1.13636 2.76843C1.13659 2.61244 1.25911 2.47898 1.42306 2.46314C1.58693 2.44738 1.73394 2.55475 1.7661 2.70753L1.77107 2.73878L2.12695 6.18389L2.16424 6.52484C2.17575 6.6211 2.1868 6.70174 2.19987 6.77204C2.22526 6.90857 2.25331 6.98249 2.28646 7.03606C2.36207 7.15769 2.47357 7.25515 2.6063 7.31571C2.6648 7.34249 2.74396 7.36255 2.88719 7.3734C3.03435 7.38453 3.22335 7.38462 3.49953 7.38462H4.50047C4.77695 7.38462 4.96603 7.3845 5.11322 7.3734C5.25611 7.36262 5.33467 7.34275 5.39329 7.31611L5.44218 7.29167C5.55332 7.2308 5.64662 7.14285 5.71271 7.03646L5.71313 7.03606C5.74649 6.98248 5.77479 6.90897 5.80013 6.77244C5.82621 6.63187 5.84519 6.44989 5.87263 6.18389L6.22893 2.73878C6.24641 2.56975 6.40216 2.44633 6.57694 2.46314Z"
                fill="black"
              />
              <path
                d="M3.36364 3.07692C3.53936 3.07692 3.68182 3.21468 3.68182 3.38462V5.4359C3.68182 5.60583 3.53936 5.74359 3.36364 5.74359C3.18791 5.74359 3.04545 5.60583 3.04545 5.4359V3.38462C3.04545 3.21468 3.18791 3.07692 3.36364 3.07692Z"
                fill="black"
              />
              <path
                d="M4.63636 3.07692C4.81209 3.07692 4.95455 3.21468 4.95455 3.38462V5.4359C4.95455 5.60583 4.81209 5.74359 4.63636 5.74359C4.46064 5.74359 4.31818 5.60583 4.31818 5.4359V3.38462C4.31818 3.21468 4.46064 3.07692 4.63636 3.07692Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.64424 0C4.98292 0 5.25634 0.224173 5.3531 0.518029L5.37009 0.577724L5.37506 0.603365L5.49935 1.4359H7.18182C7.35755 1.4359 7.5 1.57366 7.5 1.74359C7.5 1.91352 7.35755 2.05128 7.18182 2.05128H0.818182C0.642455 2.05128 0.5 1.91352 0.5 1.74359C0.5 1.57366 0.642455 1.4359 0.818182 1.4359H2.50065L2.62494 0.603365L2.62991 0.578125C2.7071 0.254607 2.99501 0 3.35576 0H4.64424ZM3.35576 0.615385C3.32393 0.615385 3.27133 0.639733 3.25178 0.709535L3.14364 1.4359H4.85636L4.74781 0.710737C4.728 0.639667 4.67571 0.615385 4.64424 0.615385H3.35576Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
