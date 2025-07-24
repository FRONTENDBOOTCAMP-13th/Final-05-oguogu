import Title from '@/components/elements/CommonTitleItem/Title';
import { ProductDetailInfoType } from '@/components/elements/ProductDetailInfo/ProductDetailInfo.type';
import Badge from '@/components/elements/ProductItem/Badge/Badge';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import ShareIcon from '@/components/elements/ShareIcon/ShareIcon';
import getDiffDays from '@/utils/getDiffDays/getDiffDays';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailInfo({ type, item }: ProductDetailInfoType) {
  return (
    <div className="px-4 pt-4 flex flex-col gap-4">
      {/* 상품 뱃지 및 상품명 */}
      <section className="flex flex-col gap-4">
        <div>
          <Badge type="popular" size={12} />
          <Badge type="seasonal" size={12} />
        </div>
        <Title title={item.name} description={item.content!} />

        {/* 가격 정보 */}
        <div className="flex justify-between items-end">
          <div>
            {item.extra!.dcRate > 0 ? (
              <>
                <s className="text-oguogu-gray-2 mobile-max:text-lg">{item.price.toLocaleString() + '원'}</s>
                <div className="flex gap-1">
                  <span className="text-xl text-oguogu-main mobile-max:text-2xl">{item.extra!.dcRate}%</span>
                  <span className="text-xl ml-2 mobile-max:text-2xl">
                    {(item.price * (1 - item.extra!.dcRate / 100)).toLocaleString()}원
                  </span>
                </div>
              </>
            ) : (
              <div className="flex gap-1">
                <span className="text-xl mobile-max:text-2xl">{item.price}원</span>
              </div>
            )}
          </div>
          <ShareIcon type="share" />
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
        <section className="itemDataList">
          {/* 배송 */}
          <div className="flex">
            <span className="itemData">배송</span>
            <div className="itemDataExtra">
              <span>{item.shippingFees === 0 ? '무료' : item.shippingFees!.toLocaleString() + '원'}</span>
              <div className="">
                <Badge type="express" />
                <Badge type="safe" />
              </div>
            </div>
          </div>

          {/* 텃밭(판매자) */}
          <div className="flex">
            <span className="itemData">텃밭</span>
            <div className="itemDataExtra">
              <span>돌쇠네농산물</span>
              <div className="flex gap-1">
                <Image src="/images/product-hatIcon.svg" alt="인증 아이콘" width={14} height={14} />
                <span className="text-[10px]">인증된 판매자 입니다.</span>
              </div>
            </div>
          </div>

          {/* 판매자 주소 */}
          <div className="flex">
            <span className="itemData">주소</span>
            <span>부산시 해운대구 반송로 456</span>
          </div>

          {/* 문의 */}
          <div className="flex">
            <span className="itemData">문의</span>
            <span>02-123-4567</span>
          </div>
        </section>
      ) : type === 'experience' ? (
        <section className="itemDataList">
          {/* 출발 날짜 */}
          <div className="flex">
            <span className="itemData">날짜</span>
            <span>{item.extra!.departureDate}</span>
          </div>

          {/* 여행 지역 */}
          <div className="flex">
            <span className="itemData">지역</span>
            <span>{item.extra!.region}</span>
          </div>

          {/* 출발 지역 */}
          <div className="flex">
            <span className="itemData">출발 지역</span>
            <span>{item.extra!.meetingPlace}</span>
          </div>

          {/* 인원 */}
          <div className="flex">
            <span className="itemData">인원</span>
            <span>{item.quantity}명</span>
          </div>

          {/* 포함 상품 */}
          <div className="flex">
            <span className="itemData">포함상품</span>
            <span>{item.extra!.includedItems?.join(', ')} </span>
          </div>

          {/* 미포함 상품 */}
          <div className="flex">
            <span className="itemData">미포함</span>
            <span>중식, 석식</span>
          </div>

          {/* 구분선 */}
          <div className="w-full h-px my-2 bg-oguogu-gray-2"></div>

          {/* 여행사 */}
          <div className="flex">
            <span className="itemData">여행사</span>
            <span>트래블 코리아</span>
          </div>

          {/* 가이드 정보 */}
          <div className="flex">
            <span className="itemData">가이드</span>
            <span>{item.extra!.guideInfo?.name}</span>
          </div>

          {/* 문의 */}
          <div className="flex">
            <span className="itemData">문의</span>
            <span>{item.extra!.guideInfo?.contact}</span>
          </div>
        </section>
      ) : type === 'gardening' ? (
        <section className="itemDataList">
          {/* 잔여 텃밭(남은 수량) */}
          <div className="flex gap-2">
            <span className="itemData">잔여 텃밭</span>
            <span>{item.quantity! - item.buyQuantity!}개</span>
          </div>

          {/* 판매 마감일 */}
          <div className="flex gap-2">
            <span className="itemData">판매 마감일</span>
            <div className="flex flex-col">
              <span>{item.extra!.deadline}</span>
              <span className="text-oguogu-gray-3">판매 마감까지 {getDiffDays(item)}일 남았습니다.</span>
            </div>
          </div>

          {/* 수확 예정일 */}
          <div className="flex gap-2">
            <span className="itemData">수확 예정일</span>
            <span>{item.extra!.harvestExpectedDate}</span>
          </div>

          {/* 판매자 주소 */}
          <div className="flex gap-2">
            <span className="itemData">텃밭 위치</span>
            <span>전북 남원시 금동길 123</span>
          </div>

          {/* 구분선 */}
          <div className="w-full h-px my-2 bg-oguogu-gray-2"></div>

          {/* 배송 */}
          <div className="flex gap-2">
            <span className="itemData">배송</span>
            <div className="flex flex-col">
              <span>{item.shippingFees === 0 ? '무료' : item.shippingFees!.toLocaleString() + '원'}</span>
              <div className="">
                <Badge type="express" />
                <Badge type="safe" />
              </div>
            </div>
          </div>

          {/* 텃밭(판매자) */}
          <div className="flex gap-2">
            <span className="itemData">텃밭</span>
            <div className="flex flex-col">
              <span>돌쇠네농산물</span>
              <div className="flex gap-1">
                <Image src="/images/product-hatIcon.svg" alt="인증 아이콘" width={14} height={14} />
                <span className="text-[10px]">인증된 판매자 입니다.</span>
              </div>
            </div>
          </div>

          {/* 문의 */}
          <div className="flex gap-2">
            <span className="itemData">문의</span>
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
