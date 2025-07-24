import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function QnA() {
  return (
    <>
      <LinkHeader title="자주 묻는 질문" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)]">{/* 여기에 내용 작성 */}</main>
    </>
  );
}
