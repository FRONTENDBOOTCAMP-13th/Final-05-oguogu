'use client';
import { CartItem } from '@/shared/types/cart';
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

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const shippingFee: boolean = true; //배송비가 0원인지 아닌지 검증하는 로직이 필요합니다.

  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateQuantity(item._id, newCount);
  };
  const countDown = () => {
    if (count != 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateQuantity(item._id, newCount);
    }
  };

  return (
    <>
      <div className="w-[288px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center text-center">
            <label className="relative top-[-2px]">
              <input type="checkbox" checked={checked} onChange={onCheck} className="hidden" />
              {checked ? (
                // 체크된 상태 SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M14.2078 5.29375C14.1151 5.2004 14.0048 5.12637 13.8833 5.07595C13.7618 5.02553 13.6315 4.99971 13.5 5H11.5V4.5C11.5 3.57174 11.1313 2.6815 10.4749 2.02513C9.8185 1.36875 8.92826 1 8 1C7.07174 1 6.1815 1.36875 5.52513 2.02513C4.86875 2.6815 4.5 3.57174 4.5 4.5V5H2.5C2.23478 5 1.98043 5.10536 1.79289 5.29289C1.60536 5.48043 1.5 5.73478 1.5 6V12.75C1.5 13.9688 2.53125 15 3.75 15H12.25C12.8395 15.0002 13.4057 14.7697 13.8275 14.3578C14.0398 14.1553 14.2088 13.9119 14.3244 13.6423C14.4399 13.3727 14.4997 13.0824 14.5 12.7891V6C14.5004 5.86881 14.4748 5.73884 14.4246 5.61761C14.3745 5.49638 14.3008 5.38631 14.2078 5.29375ZM10.3903 8.5625L7.59031 12.0625C7.54433 12.12 7.48623 12.1665 7.42017 12.199C7.35411 12.2314 7.2817 12.2488 7.20813 12.25H7.2C7.12778 12.25 7.05642 12.2344 6.99082 12.2042C6.92522 12.1739 6.86694 12.1299 6.82 12.075L5.62 10.6725C5.57732 10.6226 5.54489 10.5648 5.52455 10.5023C5.50422 10.4399 5.49638 10.3741 5.50149 10.3086C5.5066 10.2431 5.52455 10.1793 5.55432 10.1208C5.58409 10.0623 5.6251 10.0102 5.675 9.9675C5.7249 9.92482 5.78272 9.89239 5.84516 9.87205C5.9076 9.85172 5.97343 9.84388 6.03889 9.84899C6.10436 9.8541 6.16817 9.87205 6.2267 9.90182C6.28523 9.93159 6.33732 9.9726 6.38 10.0225L7.1875 10.9659L9.60969 7.9375C9.69257 7.8339 9.81321 7.76747 9.94507 7.75282C10.0769 7.73816 10.2092 7.77649 10.3128 7.85938C10.4164 7.94226 10.4828 8.0629 10.4975 8.19476C10.5121 8.32662 10.4738 8.4589 10.3909 8.5625H10.3903ZM10.5 5H5.5V4.5C5.5 3.83696 5.76339 3.20107 6.23223 2.73223C6.70107 2.26339 7.33696 2 8 2C8.66304 2 9.29893 2.26339 9.76777 2.73223C10.2366 3.20107 10.5 3.83696 10.5 4.5V5Z"
                    fill="#489F51"
                  />
                </svg>
              ) : (
                // 체크 안된 상태 SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 8.25L7.2 11.75L6 10.3475" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M5 5.5V4.5C5 3.70435 5.31607 2.94129 5.87868 2.37868C6.44129 1.81607 7.20435 1.5 8 1.5C8.79565 1.5 9.55871 1.81607 10.1213 2.37868C10.6839 2.94129 11 3.70435 11 4.5V5.5M2.5 5.5C2.36739 5.5 2.24021 5.55268 2.14645 5.64645C2.05268 5.74021 2 5.86739 2 6V12.75C2 13.695 2.805 14.5 3.75 14.5H12.25C13.195 14.5 14 13.7341 14 12.7891V6C14 5.86739 13.9473 5.74021 13.8536 5.64645C13.7598 5.55268 13.6326 5.5 13.5 5.5H2.5Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </label>

            <p className="text-[12px] w-[180px] text-oguogu-black leading-none truncate">{item?.product.name} </p>
          </div>
          <button
            onClick={() => handleDelete(item._id)}
            className="flex items-center gap-[4px] px-[8px] h-[20px] text-[10px] leading-none border border-oguogu-gray-2 rounded-[4px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
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
            <span className="leading-none">삭제</span>
          </button>
        </div>

        <div className="flex justify-between">
          <div className="w-[48px] h-[48px] bg-[url('/images/crop/crop-001.png')] bg-cover bg-center bg-no-repeat rounded-[4px]" />

          <div className="w-[216px] flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[16px] text-oguogu-black leading-[16px]">
                {item?.product.price.toLocaleString()}원
              </span>
              <p className="text-[12px] text-oguogu-gray-4">{shippingFee ? '배송비 무료' : '배송비 포함(3,000원)'}</p>
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
        </div>
      </div>
    </>
  );
}
