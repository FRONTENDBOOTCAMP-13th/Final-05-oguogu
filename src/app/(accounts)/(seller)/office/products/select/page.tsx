import { SelectProductItem } from '@/components/elements/CategoryItem/CategoryItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function SelectProductType() {
  return (
    <>
      <LinkHeader title="상품 등록" />
      <main className="w-[320px] mx-auto p-4 h-[calc(100vh-48px)] flex items-center overflow-y-hidden">
        <div className="flex flex-col self-center w-full gap-3">
          <SelectProductItem params="crop" title="농산물" />
          <SelectProductItem params="experience" title="체험" />
          <SelectProductItem params="gardening" title="텃밭" />
        </div>
      </main>
    </>
  );
}
