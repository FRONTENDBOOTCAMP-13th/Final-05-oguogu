export default function BackOfficeSectionSkeleton({ width, height }: { width: string; height: string }) {
  return (
    <div
      className="flex items-center justify-center bg-oguogu-gray-1/50 animate-pulse rounded w-[100px] h-[42px]"
      style={{ width, height }}
    />
  );
}
