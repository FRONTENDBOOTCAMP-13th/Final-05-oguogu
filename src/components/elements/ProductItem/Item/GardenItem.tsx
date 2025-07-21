import InteractionButton from '@/components/elements/InteractionButton/InteractionButton';
import Badge from '@/components/elements/ProductItem/Badge/Badge';
import GardenItemIcon from '@/components/elements/ProductItem/Item/GardenItemIcon';
import { ItemType } from '@/components/elements/ProductItem/Item/Item.type';
import Image from 'next/image';
import Link from 'next/link';

export default function GardenItem({ _id, name, originPrice }: ItemType) {
  return (
    <div className="flex flex-col gap-4 min-w-[140px] ">
      {/* 상품 이미지 및 뱃지 영역 */}
      <Link href={`/search/result/${_id}/detail`}>
        {/* 대표 이미지 */}
        {/*이미지를 하드코딩 해둔 상태 추후 동적으로 관리해야 함*/}
        <div className="relative">
          <div className="bg-[url('/images/garden/garden-001.png')] min-w-[140px] min-h-[186.67px] bg-center bg-cover aspect-[3/4] rounded-lg"></div>
          {/* <Image
            src={`/images/garden/garden-001.png`}
            alt=""
            width={140}
            height={186.67}
            className="rounded-[8px] w-[140px] h-[186.67px] object-cover"
          /> */}
          {/* 뱃지 (제철 상품, 인기 상품 등) 우선 아이콘 빼고 진행 */}
          <div className="absolute top-0.5 left-1.5">
            <Badge bgColor="bg-ogugu-blue-light" textColor="text-oguogu-white" content="마감 D-5" />
          </div>
        </div>
      </Link>
      {/* 텍스트 정보 영역 */}
      <div className="flex flex-col gap-1">
        {/* 판매자 정보 */}
        <div className="flex gap-1 items-center">
          <Image src="/images/product-hatIcon.svg" alt="농사꾼 모자 아이콘" width={16} height={16} />
          <p className="text-[10px]">돌쇠네농산물</p>
        </div>
        {/* 상품명 */}
        <Link href={`/product/crop/garden/1`} className="text-[14px] tracking-[-0.28px] leading-4">
          {name}
        </Link>
        {/* 텃밭 상품 서브 텍스트 내용 */}
        <div className="flex flex-col gap-1 text-[10px] text-oguogu-gray-4">
          <div className="flex gap-1">
            <GardenItemIcon icon="remain" />
            <p>잔여 : 12칸</p>
          </div>
          <div className="flex gap-1">
            <GardenItemIcon icon="start" />
            <p>시작 : 4월 10일</p>
          </div>
          <div className="flex gap-1">
            <GardenItemIcon icon="end" />
            <p>수확 : 7월 15일</p>
          </div>
        </div>
        {/* 가격 정보 */}
        <div className="text-[12px] flex gap-1">
          <span className="text-oguogu-main">30%</span>
          <span>{originPrice.toLocaleString()}원</span>
        </div>
      </div>
      {/*상품 등록 버튼 */}
      <InteractionButton type="garden" />
    </div>
  );
}
