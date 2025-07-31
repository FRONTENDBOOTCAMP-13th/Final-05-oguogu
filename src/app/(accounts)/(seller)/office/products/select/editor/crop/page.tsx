import LinkHeader from '@/components/layouts/Header/LinkHeader';
import CropProductPostClientControl from '@/features/ProductPostClientControl/CropProductPostClientControl';

export default function CropProductEditor() {
  return (
    <>
      <LinkHeader title="농산물 상품 등록/수정" />
      <main className="p-4 flex flex-col gap-4">
        <CropProductPostClientControl />
      </main>
    </>
  );
}
