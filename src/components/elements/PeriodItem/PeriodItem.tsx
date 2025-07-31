import { periodObject } from '@/shared/types/product';
import Image from 'next/image';

export default function PeriodItem({ periodItemList }: { periodItemList: periodObject[] }) {
  if (periodItemList === null) {
    return <div>업로드 전입니다.</div>;
  }

  return (
    <>
      {periodItemList ? (
        <div className="mt-4 grid gap-4 mobile-max:grid-cols-2 mobile-max:gap-5 w-full">
          {periodItemList
            .slice()
            .reverse()
            .filter(Boolean)
            .map((item: periodObject, index: number) => {
              return (
                <article
                  key={index}
                  className="p-4 border border-oguogu-main rounded-lg flex flex-col items-center gap-y-3 bg-oguogu-white/35"
                >
                  {/* 상단 */}
                  <div className="flex justify-between text-xs w-full">
                    <p className="text-oguogu-main">
                      {item.status === 'harvested'
                        ? '수확 완료'
                        : item.status === 'growing'
                          ? '성장'
                          : item.status === 'sprouting'
                            ? '발아'
                            : '파종'}
                    </p>
                    <p className="text-oguogu-gray-4">{item.date}</p>
                  </div>

                  {/* 이미지 */}
                  <div className="rounded-lg overflow-hidden w-full bg-oguogu-white flex justify-center">
                    <Image src="/images/gardening/dummy-001.png" alt="period" width={256} height={256} />
                  </div>

                  <div className="flex flex-col text-xs w-full">
                    <p className="text-base">{item.title ?? '제목 없음'}</p>
                    <p>{item.content}</p>
                  </div>
                </article>
              );
            })}
        </div>
      ) : (
        <div className="mt-4 p-4 border border-dashed border-oguogu-gray-2 rounded-lg flex flex-col items-center gap-y-3 bg-oguogu-white/35 w-full">
          <div>업로드 전입니다.</div>
        </div>
      )}
    </>
  );
}
