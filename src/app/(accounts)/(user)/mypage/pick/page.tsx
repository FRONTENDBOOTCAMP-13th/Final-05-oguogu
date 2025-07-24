import LinkHeader from '@/components/layouts/Header/LinkHeader';
import PickList from '@/features/pickList/pickList';

export default function UserPickList() {
  return (
    <>
      <LinkHeader title="찜한 상품" />
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <PickList />
      </main>
    </>
  );
}
