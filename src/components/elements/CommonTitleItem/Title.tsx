export default function Title({ title = '제목', description = '부제목' }: { title: string; description: string }) {
  return (
    <h2>
      <p className="text-xl text-oguogu-black mobile-max:text-2xl">{title}</p>
      <p className="text-sm text-oguogu-gray-4 mobile-max:text-base">{description}</p>
    </h2>
  );
}
