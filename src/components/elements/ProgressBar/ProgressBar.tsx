export default function ProgressBar({ max, value = 10 }: { max: number; value: number }) {
  const now = value < 0 ? 0 : Number(((value / max) * 100).toFixed()) + '%';

  return (
    <>
      <div className="relative">
        <div className="min-w-[288px] w-full h-2 bg-oguogu-gray-1 rounded-lg"></div>
        <div className="h-2 bg-oguogu-main rounded-lg absolute top-0 left-0" style={{ width: now }}></div>
      </div>
    </>
  );
}
