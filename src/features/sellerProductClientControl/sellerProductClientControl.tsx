'use client';

import CommonButton from '@/components/elements/CommonButton/CommonButton';
import { ProductDropdown, UploadDropdown } from '@/components/elements/OrderOption/OrderOption';

export default function SellerProductClientControl() {
  return (
    <>
      <div className="flex gap-x-2">
        <ProductDropdown />
        <UploadDropdown />
      </div>

      <div className="mt-[6px] mb-[16px]">
        <CommonButton
          feature="+ 상품 등록"
          textSize="text-[12px]"
          width="w-full"
          height="h-[30px]"
          type="submit"
          bgColor="bg-oguogu-white"
          textColor="text-oguogu-black"
          border="border"
          borderColor="border-oguogu-main"
          cursorPointer
        />
      </div>
    </>
  );
}
