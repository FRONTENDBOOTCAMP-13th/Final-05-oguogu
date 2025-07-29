import { SelectProductItem } from '@/components/elements/CategoryItem/CategoryItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function SelectProductType() {
  return (
    <>
      <LinkHeader title="상품 등록" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <div className="flex flex-col gap-4 mt-4">
          <SelectProductItem params="crop" title="농산물" />

          <SelectProductItem params="experience" title="체험" />

          <SelectProductItem params="gardening" title="텃밭" />
        </div>
      </main>
    </>
  );
}
