import InteractionButton from '@/components/elements/InteractionButton/InteractionButton';
import Badge from '@/components/elements/ProductItem/Badge/Badge';
import { BadgeTextProps } from '@/components/elements/ProductItem/Badge/Badge.type';
import { Item } from '@/shared/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function ExperienceItem({
  _id,
  name,
  content,
  price,
  rating,
  replies,
  bookmarks,
  extra,
  seller,
  isbookmarked,
  togglebookmark,
  mainImages,
}: Item) {
  const isSold = extra!.badge?.isSold && 'sold';
  const isBest = extra!.badge?.isBest && 'best';
  const isInSeason = extra!.badge?.isInSeason && 'inseason';
  const isNew = extra!.badge?.isNew && 'new';
  const isLowStock = extra!.badge?.isLowStock && 'lowstock';

  const badgeList = [isSold, isBest, isInSeason, isNew, isLowStock].filter(Boolean).slice(0, 2) as BadgeTextProps[];

  return (
    <div className="min-w-[288px] flex flex-col gap-4">
      {/* 상품 이미지 및 뱃지 영역 */}
      <Link href={`/search/result/${_id}/detail`}>
        <div className="relative">
          {/* 대표 이미지 */}
          <div className="relative min-w-[288px] min-h-[216px] aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={mainImages[0].path}
              alt="대표 이미지"
              fill
              className="object-cover rounded-lg"
              sizes="(min-width: 768px) 288px, 100vw"
            />
          </div>

          {/* 뱃지 (제철 상품, 인기 상품 등) */}
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
          <Image src="/images/product-hatIcon.svg" alt="" aria-hidden="true" width={16} height={16} />
          <p className="text-[10px]">{seller?.extra?.businessInfo?.companyName ?? '오구텃밭'}</p>
        </div>

        {/* 상품명 */}

        <Link href={`/search/result/${_id}/detail`} className="text-[14px] tracking-[-0.28px] leading-4">
          <h3>{name}</h3>
        </Link>

        {/* 추가 상품 내용 설명 */}
        <p className="text-[10px] text-oguogu-gray-4">{content}</p>

        {/* 가격 정보 */}
        <div className="text-base flex gap-1 items-center">
          {extra!.dcRate! > 0 ? <span className="text-oguogu-main">{extra!.dcRate}%</span> : ''}
          <span>{(price * (1 - extra!.dcRate! / 100)).toLocaleString()}원</span>
          <span className="text-[10px] leading-none">/ 1인</span>
        </div>

        {/* 좋아요 & 별점 */}
        <div className="text-xs flex gap-2 text-oguogu-gray-3">
          <div className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 9 9" fill="none">
              <path
                d="M6.525 0.666626C5.742 0.666626 4.9905 1.01976 4.5 1.57344C4.0095 1.01976 3.258 0.666626 2.475 0.666626C1.089 0.666626 0 1.71731 0 3.06445C0 4.70804 1.53 6.05518 3.8475 8.09115L4.5 8.66663L5.1525 8.09115C7.47 6.05518 9 4.70804 9 3.06445C9 1.71731 7.911 0.666626 6.525 0.666626Z"
                fill="#969696"
              />
            </svg>
            <span>{bookmarks ?? 0}</span>
          </div>
          <div className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13 " viewBox="0 0 8 9" fill="none">
              <path
                d="M3.81038 0.790323C3.8279 0.753184 3.85498 0.721922 3.88855 0.700065C3.92212 0.678208 3.96085 0.666626 4.00036 0.666626C4.03987 0.666626 4.0786 0.678208 4.11217 0.700065C4.14574 0.721922 4.17281 0.753184 4.19034 0.790323L5.11426 2.75298C5.17512 2.88216 5.26497 2.99393 5.37608 3.07868C5.4872 3.16343 5.61626 3.21863 5.7522 3.23956L7.81841 3.55667C7.85757 3.56262 7.89435 3.57994 7.9246 3.60667C7.95485 3.6334 7.97737 3.66848 7.98961 3.70793C8.00184 3.74739 8.00331 3.78964 7.99383 3.82992C7.98436 3.87021 7.96433 3.9069 7.936 3.93586L6.44174 5.46187C6.34319 5.56258 6.26946 5.6869 6.22689 5.82413C6.18432 5.96135 6.17419 6.10737 6.19736 6.24962L6.55013 8.40565C6.55704 8.44669 6.55281 8.48894 6.53793 8.52758C6.52305 8.56622 6.49811 8.5997 6.46595 8.62419C6.4338 8.64868 6.39573 8.6632 6.35609 8.66609C6.31645 8.66898 6.27683 8.66013 6.24176 8.64055L4.39472 7.62209C4.27302 7.55507 4.13762 7.52006 4.00016 7.52006C3.8627 7.52006 3.7273 7.55507 3.60559 7.62209L1.75896 8.64055C1.7239 8.66001 1.68433 8.66877 1.64475 8.66582C1.60518 8.66287 1.56719 8.64833 1.5351 8.62386C1.50301 8.59939 1.47812 8.56596 1.46325 8.52739C1.44838 8.48881 1.44413 8.44663 1.45099 8.40565L1.80336 6.25003C1.82663 6.10773 1.81655 5.96161 1.77398 5.8243C1.7314 5.68699 1.65761 5.5626 1.55898 5.46187L0.064714 3.93628C0.0361542 3.90736 0.0159157 3.8706 0.00630428 3.83019C-0.00330716 3.78979 -0.00190518 3.74737 0.0103505 3.70776C0.0226061 3.66815 0.0452226 3.63295 0.0756238 3.60616C0.106025 3.57938 0.142988 3.56208 0.182303 3.55625L2.24812 3.23956C2.38421 3.2188 2.51345 3.16366 2.62472 3.0789C2.73598 2.99414 2.82595 2.88229 2.88686 2.75298L3.81038 0.790323Z"
                fill="#969696"
              />
            </svg>
            <span className="leading-none">{`${rating?.toFixed(1) ?? 0} (${replies ?? 0})`}</span>
          </div>
        </div>
      </div>

      {/*상품 등록 버튼 */}
      {/*Link 경로가 홈으로 해둔 상태 파일 경로 만들어지면 수정 필요 */}
      <InteractionButton _id={_id} isbookmarked={isbookmarked} togglebookmarked={togglebookmark} />
    </div>
  );
}

export function ExperienceItemSkeleton() {
  return (
    <div className="min-w-[288px] flex flex-col gap-4 animate-pulse">
      {/* 이미지 및 뱃지 */}
      <div className="relative">
        <div className="bg-oguogu-gray-1 min-w-[288px] min-h-[216px] bg-center bg-cover aspect-[4/3] rounded-lg" />
        <div className="absolute top-1 left-1 flex gap-1">
          <div className="w-10 h-4 rounded-full bg-oguogu-gray-2" />
          <div className="w-10 h-4 rounded-full bg-oguogu-gray-2" />
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className="flex flex-col gap-1">
        {/* 판매자 정보 */}
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
          <div className="w-20 h-2 rounded bg-oguogu-gray-2" />
        </div>

        {/* 상품명 */}
        <div className="w-40 h-4 rounded bg-oguogu-gray-2" />

        {/* 상품 설명 */}
        <div className="w-28 h-2 rounded bg-oguogu-gray-2" />

        {/* 가격 정보 */}
        <div className="flex gap-1 items-end">
          <div className="w-8 h-4 rounded bg-oguogu-gray-2" />
          <div className="w-16 h-4 rounded bg-oguogu-gray-2" />
          <div className="w-10 h-3 rounded bg-oguogu-gray-2" />
        </div>

        {/* 좋아요 & 별점 */}
        <div className="flex gap-2 text-oguogu-gray-3 text-[8px]">
          <div className="flex items-center gap-[2px]">
            <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
            <div className="w-6 h-2 rounded bg-oguogu-gray-2" />
          </div>
          <div className="flex items-center gap-[2px]">
            <div className="w-4 h-4 rounded-full bg-oguogu-gray-2" />
            <div className="w-12 h-2 rounded bg-oguogu-gray-2" />
          </div>
        </div>
      </div>

      {/* 인터랙션 버튼 */}
      <div className="w-full h-9 rounded-lg bg-oguogu-gray-2" />
    </div>
  );
}
