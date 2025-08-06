import PeriodItem from '@/components/elements/PeriodItem/PeriodItem';
import ProgressBar from '@/components/elements/ProgressBar/ProgressBar';
import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { getProduct } from '@/shared/data/functions/product';
import { periodObject, productRes } from '@/shared/types/product';
import { getDayFromToday } from '@/utils/getDaysFromToday/getDaysFromToday';
import { format } from 'date-fns';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '텃밭 성장 기록 | 오구텃밭',
  description: '텃밭 상품의 성장 단계, 수확 예정일, 판매자 기록을 시각적으로 확인할 수 있는 상세 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyGardenItemPage({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res: productRes = await getProduct(Number(_id));
  const periodItemList = res.item.extra!.period;

  if (!res) {
    return <div className="text-center">상품 정보가 없습니다.</div>;
  }

  /* period 의 status 값을 추출, 포함 여부를 검증하여 가장 마지막 데이터를 렌더링 */
  const allStatus = res.item.extra!.period?.map((item: periodObject) => item.status);

  let lastStatus = 'seeding';
  allStatus?.map((status: string) =>
    status.includes('harvested')
      ? (lastStatus = 'harvested')
      : status.includes('growing')
        ? (lastStatus = 'growing')
        : status.includes('sprouting')
          ? (lastStatus = 'sprouting')
          : (lastStatus = 'seeding'),
  );

  console.log('전체 상태', allStatus);
  console.log('마지막 상태', lastStatus);

  /* period */

  /* 현재 날짜와 시작한 날짜의 차이를 계산하는 progress bar 데이터 받아오기 */
  // 시작(상품 판매 종료) 날짜
  const startDate = res.item.extra?.deadline;

  // INFO 종료 날짜 : 현재는 하드코딩된 데이터, dbinit 이후 실제 DB 반영 (아래 주석 사용)
  const endDate = res.item.extra.harvestExpectedDate ?? '2025-11-01';
  // const endDate = '2025-11-01';

  // 전체 날짜: 시작 날짜 ~ 종료 날짜
  const getDaysFromStartDateToEndDate = getDayFromToday(startDate!, endDate);
  console.log('전체 날짜', getDaysFromStartDateToEndDate);

  // 남은 날짜: 오늘 날짜 ~ 종료 날짜
  const today = new Date();
  const formattetToday = format(today, 'yyyy-MM-dd');
  const restDaysToEndDate = getDayFromToday(formattetToday, endDate);
  console.log('남은 날짜', restDaysToEndDate);

  // 진행 날짜: 시작 날짜 ~ 오늘 날짜
  const daysFromStartDate = getDaysFromStartDateToEndDate - restDaysToEndDate;
  console.log('진행 날짜', daysFromStartDate);

  // 업로드 날짜
  const uploadDate = periodItemList?.map((item: periodObject) => item.date);

  return (
    <>
      <LinkHeader title={res.item.name} bgColor="garden" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)] flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          {/* 상품명, 이미지 */}
          <div className="flex gap-2">
            <p className="text-2xl">{res.item.name}</p>
            <Image src={`/svgs/${lastStatus}.svg`} alt={`상품 상태 : ${lastStatus}`} width={24} height={24} />
          </div>

          {/* 진행단계, 수확 남은 일자, Progress Bar */}
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between">
              <div className="text-xs flex gap-1">
                <p>진행 단계</p>
                <p className="text-oguogu-main">
                  {lastStatus === 'harvested'
                    ? '수확 완료'
                    : lastStatus === 'growing'
                      ? '성장'
                      : lastStatus === 'sprouting'
                        ? '발아'
                        : '파종'}
                </p>
              </div>
              <div className="text-xs flex gap-1">
                <p>수확까지</p>
                <p className="text-oguogu-main">{restDaysToEndDate}</p>
                <p>일 남았습니다</p>
              </div>
            </div>

            {/* 전체 날짜 중 현재 기준으로 남은 날짜를 시각적으로 보여주는 Progress Bar */}
            <ProgressBar
              max={getDaysFromStartDateToEndDate}
              value={daysFromStartDate}
              uploadDate={uploadDate!}
              endDate={endDate}
            />
          </div>
        </div>

        {/* 판매자가 업로드한 Period 내역 */}
        <PeriodItem periodItemList={periodItemList!} id={Number(_id)} />
      </main>
    </>
  );
}
