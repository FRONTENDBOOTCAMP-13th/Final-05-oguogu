import CommonButton from '@/components/elements/CommonButton/CommonButton';
import Link from 'next/link';

export default function InteractionButton({ type }: { type: 'crop' | 'garden' | 'experience' }) {
  return (
    <>
      <div className="w-full flex basis-full gap-2">
        <button className="flex items-center justify-center border-1 rounded-[4px] border-oguogu-main bg-oguogu-white w-[23px] h-[22px] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.555 9.14086L5.5 9.19536L5.4395 9.14086C2.827 6.79209 1.1 5.23896 1.1 3.66402C1.1 2.57411 1.925 1.75667 3.025 1.75667C3.872 1.75667 4.697 2.30163 4.9885 3.04277H6.0115C6.303 2.30163 7.128 1.75667 7.975 1.75667C9.075 1.75667 9.9 2.57411 9.9 3.66402C9.9 5.23896 8.173 6.79209 5.555 9.14086ZM7.975 0.666748C7.018 0.666748 6.0995 1.10816 5.5 1.80026C4.9005 1.10816 3.982 0.666748 3.025 0.666748C1.331 0.666748 0 1.9801 0 3.66402C0 5.71852 1.87 7.40244 4.7025 9.9474L5.5 10.6667L6.2975 9.9474C9.13 7.40244 11 5.71852 11 3.66402C11 1.9801 9.669 0.666748 7.975 0.666748Z"
              fill="#489F51"
            />
          </svg>
        </button>
        {type === 'experience' ? (
          <Link href="/" className="flex w-full">
            <CommonButton feature={'자세히 보기'} textSize="text-[10px]" height="h-[22px]" />
          </Link>
        ) : (
          <CommonButton
            feature={type === 'crop' ? '장바구니 담기' : '자세히 보기'}
            textSize="text-[10px]"
            height="h-[22px]"
          />
        )}
      </div>
    </>
  );
}
