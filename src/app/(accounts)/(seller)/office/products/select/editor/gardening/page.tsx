import LinkHeader from '@/components/layouts/Header/LinkHeader';
import GardeningProductPostClientControl from '@/features/ProductPostClientControl/GardeningProductPostClientControl';

export default function GardeningProductEditor() {
  return (
    <>
      <LinkHeader title="텃밭 상품 등록/수정" />
      <main className="p-4 flex flex-col gap-4">
        <GardeningProductPostClientControl />
      </main>
    </>
  );
}
