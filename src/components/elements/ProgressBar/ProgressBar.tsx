import { differenceInDays, parseISO } from 'date-fns';

export default function ProgressBar({
  max,
  value = 10,
  endDate,
  uploadDate,
}: {
  max: number;
  value: number;
  endDate: string;
  uploadDate: string[];
}) {
  /* 전체 날짜 기준 현재 날짜 위치에 맞게 Progress Bar 에 배경색을 칠하기 위한 계산식 */
  const now = value < 0 ? 0 : Number(((value / max) * 100).toFixed()) + '%';

  /* 전체 날짜 기준 업로드한 날짜가 차지하는 위치 계산 */
  const parsedUploadDate = uploadDate?.map((item: string) => parseISO(item));
  const parsedMaxDate = parseISO(endDate);

  return (
    <>
      <div className="relative">
        <div className="min-w-[288px] w-full h-2 bg-oguogu-gray-1 rounded-lg"></div>
        <div className="h-2 bg-oguogu-main rounded-lg absolute top-0 left-0" style={{ width: now }}></div>
        {parsedUploadDate?.map((item, index) => {
          const diff = differenceInDays(parsedMaxDate, item);
          const width =
            (1 - diff / max) * 100 > 100
              ? '99%'
              : (1 - diff / max) * 100 < 0
                ? '1%'
                : ((1 - diff / max) * 100).toFixed() + '%';
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-2xl bg-oguogu-yellow absolute bottom-0 translate-y-[16px] translate-x-[-2px]`}
              style={{ left: width }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
