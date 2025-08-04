import InteractionButton from '@/components/elements/InteractionButton/InteractionButton';
import Badge from '@/components/elements/ProductItem/Badge/Badge';
import { BadgeTextProps } from '@/components/elements/ProductItem/Badge/Badge.type';
import GardenItemIcon from '@/components/elements/ProductItem/Item/GardenItemIcon';
import { Item } from '@/shared/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function GardenItem({
  _id,
  name,
  price,
  quantity,
  buyQuantity,
  extra,
  seller,
  isbookmarked,
  togglebookmark,
}: Item) {
  const isSold = extra!.badge?.isSold && 'sold';
  const isBest = extra!.badge?.isBest && 'best';
  const isInSeason = extra!.badge?.isInSeason && 'inseason';
  const isNew = extra!.badge?.isNew && 'new';
  const isLowStock = extra!.badge?.isLowStock && 'lowstock';

  const badgeList = [isSold, isBest, isInSeason, isNew, isLowStock].filter(Boolean).slice(0, 2) as BadgeTextProps[];

  return (
    <div className="flex flex-col gap-4 min-w-[140px] max-w-[400px] w-full">
      {/* 상품 이미지 및 뱃지 영역 */}
      <Link href={`/search/result/${_id}/detail`}>
        {/* 대표 이미지 */}
        {/*이미지를 하드코딩 해둔 상태 추후 동적으로 관리해야 함*/}
        <div className="relative">
          <div className="bg-[url('/images/gardening/gardening-001.png')] min-w-[140px] min-h-[186.67px] bg-center bg-cover aspect-[3/4] rounded-lg"></div>
          {/* <Image
            src={`/images/garden/garden-001.png`}
            alt=""
            width={140}
            height={186.67}
            className="rounded-[8px] w-[140px] h-[186.67px] object-cover"
          />
          
          {/* 뱃지 (제철 상품, 인기 상품 등) 우선 아이콘 빼고 진행 */}
          <div className="absolute top-0.5 left-1.5">
            {badgeList.map((item, index) => (
              <Badge key={index} type={item} size={10} />
            ))}
          </div>
        </div>
      </Link>

      {/* 텍스트 정보 영역 */}
      <div className="flex flex-col gap-1">
        {/* 판매자 정보 */}
        <div className="flex gap-1 items-center">
          <Image src="/images/product-hatIcon.svg" alt="농사꾼 모자 아이콘" width={16} height={16} />
          <p className="text-[10px]">{seller?.extra?.businessInfo?.companyName ?? '오구텃밭'}</p>
        </div>

        {/* 상품명 */}
        <Link href={`/search/result/${_id}/detail`} className="text-[14px] tracking-[-0.28px] leading-4">
          {name}
        </Link>

        {/* 텃밭 상품 서브 텍스트 내용 */}
        <div className="flex flex-col gap-1 text-[10px] text-oguogu-gray-4">
          <div className="flex gap-1">
            <GardenItemIcon icon="remain" />
            <p>잔여 : {quantity! - buyQuantity!} 칸</p>
          </div>
          <div className="flex gap-1">
            <GardenItemIcon icon="start" />
            <p>시작 : {extra!.deadline}</p>
          </div>
          <div className="flex gap-1">
            <GardenItemIcon icon="end" />
            <p>수확 : {extra!.harvestExpectedDate}</p>
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="text-base flex gap-1">
          {extra!.dcRate! > 0 ? <span className="text-oguogu-main">{extra!.dcRate}%</span> : ''}
          <span>{(price * (1 - extra!.dcRate! / 100)).toLocaleString()}원</span>
        </div>
      </div>
      {/*상품 등록 버튼 */}
      <InteractionButton _id={_id} isbookmarked={isbookmarked} togglebookmarked={togglebookmark} />
    </div>
  );
}

export function GardenItemSkeleton() {
  return (
    <div className="flex flex-col gap-4 min-w-[140px] max-w-[220px] animate-pulse">
      {/* 이미지 및 뱃지 영역 */}
      <div className="relative">
        <div className="bg-oguogu-gray-1 min-w-[140px] min-h-[186.67px] bg-center bg-cover aspect-[3/4] rounded-lg" />
        <div className="absolute top-0.5 left-1.5 flex gap-1">
          <div className="w-6 h-4 rounded bg-oguogu-gray-2" />
          <div className="w-6 h-4 rounded bg-oguogu-gray-2" />
        </div>
      </div>

      {/* 텍스트 정보 영역 */}
      <div className="flex flex-col gap-1">
        {/* 판매자 정보 */}
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
          <div className="w-20 h-2 rounded bg-oguogu-gray-2" />
        </div>

        {/* 상품명 */}
        <div className="w-28 h-4 rounded bg-oguogu-gray-2" />

        {/* 텃밭 정보 */}
        <div className="flex flex-col gap-1 text-[10px]">
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
            <div className="w-24 h-2 rounded bg-oguogu-gray-2" />
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
            <div className="w-24 h-2 rounded bg-oguogu-gray-2" />
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
            <div className="w-24 h-2 rounded bg-oguogu-gray-2" />
          </div>
        </div>

        {/* 가격 정보 */}
        <div className="flex gap-1 items-end">
          <div className="w-8 h-4 rounded bg-oguogu-gray-2" />
          <div className="w-16 h-4 rounded bg-oguogu-gray-2" />
        </div>
      </div>

      {/* 인터랙션 버튼 */}
      <div className="w-full h-9 rounded-lg bg-oguogu-gray-2" />
    </div>
  );
}
