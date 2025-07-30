import LinkHeader from '@/components/layouts/Header/LinkHeader';
import { ProductDetailPageProps } from '@/features/types/productDetail';
import { getProduct } from '@/shared/data/functions/product';
import { periodObject } from '@/shared/types/product';
import Image from 'next/image';

export default async function MyGardenItemPage({ params }: ProductDetailPageProps) {
  const { _id } = await params;
  const res = await getProduct(Number(_id));

  if (!res) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  /* period 의 status 값을 추출, 포함 여부를 검증하여 가장 마지막 데이터를 렌더링 */
  const allStatus = res.item.extra.period.map((item: periodObject) => item.status);

  let lastStatus = '';
  allStatus.map((status: string) =>
    status.includes('harvest')
      ? (lastStatus = 'harvest')
      : status.includes('growing')
        ? (lastStatus = 'growing')
        : status.includes('sprouting')
          ? (lastStatus = 'sprouting')
          : (lastStatus = 'seeding'),
  );

  return (
    <>
      <LinkHeader title={res.item.name} bgColor="[#DBFCE7]" />
      <main className="px-4 py-4 min-h-[calc(100vh-48px)] flex flex-col gap-y-3">
        {/* 상품명, 이미지 */}
        <div className="flex gap-2">
          <p className="text-2xl">{res.item.name}</p>
          <Image src={`/svgs/${lastStatus}.svg`} alt={`${lastStatus}`} width={24} height={24} />
        </div>

        {/* 진행단계, 수확 남은 일자 */}
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
            <p className="text-oguogu-main">43</p>
            <p>일 남았습니다</p>
          </div>
        </div>

        {/* 업로드 게시물 */}
      </main>
    </>
  );
}
