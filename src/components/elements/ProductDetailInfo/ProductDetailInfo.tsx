import Title from '@/components/elements/CommonTitleItem/Title';
import LinkIcon from '@/components/elements/LinkIcon/LinkIcon';
import { Path } from '@/components/elements/Path/Path';
import { ProductDetailInfoType } from '@/components/elements/ProductDetailInfo/ProductDetailInfo.type';
import Badge from '@/components/elements/ProductItem/Badge/Badge';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import getDiffDays from '@/utils/getDiffDays/getDiffDays';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailInfo({ type, item }: ProductDetailInfoType) {
  return (
    <div className="px-4 pt-4 flex flex-col gap-4">
      {/* 경로 및 상품명 */}
      <section className="flex flex-col gap-4">
        <Path title={item.extra.filter[0]} />
        <Title title={item.name} description={item.content} />
        {/* 가격 정보 */}
        <div className="flex justify-between items-center">
          <div>
            <s className="text-oguogu-gray-2 mobile-max:text-lg">{item.price.toLocaleString() + '원'}</s>
            <div className="flex gap-1">
              <span className="text-xl text-oguogu-main mobile-max:text-2xl">{item.extra.dcRate}%</span>
              <span className="text-xl ml-2 mobile-max:text-2xl">
                {(item.price * (1 - item.extra.dcRate / 100)).toLocaleString() + '원'}
              </span>
            </div>
          </div>
          <LinkIcon type="share" />
        </div>
      </section>

      {/* 회원가입 버튼 */}
      <Link
        href="/register"
        className="border-1 py-1.5 border-oguogu-main-dark rounded-md flex items-center text-center justify-center cursor-pointer"
      >
        회원가입 하고 할인가로 구매하기
      </Link>

      {/* 상품 정보 */}
      {type === 'crop' ? (
        <section className="text-xs text-oguogu-black flex flex-col gap-3">
          <div className="flex gap-15">
            <span className="text-oguogu-gray-4">배송</span>
            <div className="flex flex-col">
              <span>{item.shippingFees === 0 ? '무료' : item.shippingFees.toLocaleString() + '원'}</span>
              <div className="">
                <Badge type="express" />
                <Badge type="safe" />
              </div>
            </div>
          </div>
          <div className="flex gap-15">
            <span className="text-oguogu-gray-4">텃밭</span>
            <div className="flex flex-col">
              <span>돌쇠네농산물</span>
              <div className="flex gap-1">
                <Image src="/images/product-hatIcon.svg" alt="인증 아이콘" width={14} height={14} />
                <span className="text-[10px]">인증된 판매자 입니다.</span>
              </div>
            </div>
          </div>
          <div className="flex gap-15">
            <span className="text-oguogu-gray-4">위치</span>
            <span>부산시 해운대구 반송로 456</span>
          </div>
          <div className="flex gap-15">
            <span className="text-oguogu-gray-4">문의</span>
            <span>02-123-4567</span>
          </div>
        </section>
      ) : type === 'experience' ? (
        <section className="text-[12px] text-oguogu-black flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">날짜</span>
            <span>{item.extra.departureDate}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">지역</span>
            <span>{item.extra.region}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">출발 지역</span>
            <span>{item.extra.meetingPlace}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">인원</span>
            <span>{item.quantity}명</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">포함상품</span>
            <span>{item.extra.includedItems?.join(', ')} </span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">미포함</span>
            <span>중식, 석식</span>
          </div>
          <div className="w-full h-px bg-oguogu-gray-2"></div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">여행사</span>
            <span>트래블 코리아</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">가이드</span>
            <span>{item.extra.guideInfo?.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">문의</span>
            <span>{item.extra.guideInfo?.contact}</span>
          </div>
        </section>
      ) : type === 'gardening' ? (
        <section className="text-[12px] text-oguogu-black flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">잔여 텃밭</span>
            <span>{item.quantity - item.buyQuantity}개</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">판매 마감일</span>
            <div className="flex flex-col">
              <span>{item.extra.deadline}</span>
              <span className="text-oguogu-gray-3">판매 마감까지 {getDiffDays(item)}일 남았습니다.</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">수확 예정일</span>
            <span>{item.extra.harvestExpectedDate}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">텃밭 위치</span>
            <span>전북 남원시 금동길 123</span>
          </div>
          <div className="w-full h-px bg-oguogu-gray-2"></div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">배송</span>
            <div className="flex flex-col">
              <span>{item.shippingFees === 0 ? '무료' : item.shippingFees.toLocaleString() + '원'}</span>
              <div className="">
                <Badge type="express" />
                <Badge type="safe" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">텃밭</span>
            <div className="flex flex-col">
              <span>돌쇠네농산물</span>
              <div className="flex gap-1">
                <Image src="/images/product-hatIcon.svg" alt="인증 아이콘" width={14} height={14} />
                <span className="text-[10px]">인증된 판매자 입니다.</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">문의</span>
            <span>02-2342-4567</span>
          </div>
        </section>
      ) : (
        ''
      )}
      <ProductLinkItem link="/garden" linkTitle="판매자 텃밭" subTxt="바로 가기" />
    </div>
  );
}
