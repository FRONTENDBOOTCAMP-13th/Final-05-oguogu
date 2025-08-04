export default function HotMarkIcon({ title = '인기', animate = true }: { title?: string; animate?: boolean }) {
  return (
    <span
      className={
        animate
          ? `absolute translate-x-2 translate-y-[-4px] text-[8px] bg-[#fff000] px-1.5 py-0.5 rounded-4xl animate-[floatUpDown_1.5s_ease-in-out_infinite] `
          : `text-[8px] bg-[#fff000] px-1.5 py-0.5 rounded-4xl text-center w-8`
      }
    >
      {title}
    </span>
  );
}
