import PickList from '@/features/pickList/pickList';

export default function UserPickList() {
  return (
    <>
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        <PickList />
      </main>
    </>
  );
}
