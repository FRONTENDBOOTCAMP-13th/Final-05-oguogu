import LinkHeader from '@/components/layouts/Header/LinkHeader';
import MyPageSectionDependsOnLoginStatus from '@/components/layouts/Login/MyPageSectionDependsOnLoginStatus';

export default function UserMyPage() {
  return (
    <>
      <LinkHeader title="마이페이지" />
      <main className="pt-7 flex flex-col min-h-[calc(100vh-48px)]">
        <MyPageSectionDependsOnLoginStatus />
      </main>
    </>
  );
}
