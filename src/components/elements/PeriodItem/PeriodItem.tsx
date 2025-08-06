import AddPeriodForm from '@/features/addPeriodForm/AddPeriodForm';
import { getProduct } from '@/shared/data/functions/product';
import { periodObject, productRes } from '@/shared/types/product';
import Image from 'next/image';

export default async function PeriodItem({ id, periodItemList }: { id: number; periodItemList: periodObject[] }) {
  const res: productRes = await getProduct(id);
  const userIdFromProduct = res.item.seller?._id;

  if (periodItemList === null) {
    return <div>업로드 전입니다.</div>;
  }

  return (
    <>
      {/* 히스토리 등록 버튼 */}
      <AddPeriodForm id={id} sellerId={userIdFromProduct!} />

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
                  {item.image?.imagePath ? (
                    <div className="rounded-lg overflow-hidden w-full bg-oguogu-white flex justify-center">
                      <Image
                        src={item.image?.imagePath}
                        alt={`${item.status}를 추가 설명하는 이미지`}
                        width={256}
                        height={256}
                      />
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="flex flex-col gap-1 text-xs w-full">
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
