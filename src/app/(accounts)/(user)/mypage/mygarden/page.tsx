import GardenItemListForMyGarden from '@/components/elements/GardenItemForMyGarden/GardenItemListForMyGarden';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default async function UserGardeningList() {
  return (
    <>
      <LinkHeader title="텃밭 히스토리" bgColor="garden" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">
        <div className="grid grid-cols-3 mobile-max:grid-cols-4 gap-4">
          <>
            <GardenItemListForMyGarden />
          </>
        </div>
      </main>
    </>
  );
}
