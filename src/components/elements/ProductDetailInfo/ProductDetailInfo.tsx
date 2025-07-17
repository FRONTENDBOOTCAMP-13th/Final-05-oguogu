import Title from '@/components/elements/CommonTitleItem/Title';
import { PathCaseOne, PathCaseTwo } from '@/components/elements/Path/Path';
import Badge from '@/components/elements/ProductItem/Badge/Badge';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import Image from 'next/image';

export default function ProductDetailInfo({ type }: { type: 'crop' | 'experience' | 'gardening' }) {
  if (type === 'crop') {
    return (
      <div className="px-4 pt-4 flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <PathCaseOne title="옥수수" />
          <Title
            title="쫀득쫀득 대학 미백 찰옥수수 30개입"
            content="올해 수확! 알갱이가 톡톡 터지는 맛있는 찰옥수수"
            type="basic"
          />
          {/* 가격 정보 */}
          <div>
            <s className="text-[16px] text-oguogu-gray-2">20,000원</s>
            <div>
              <span className="text-[20px] text-oguogu-main">59%</span>
              <span className="text-[20px] text-oguogu-black ml-2">11,800원</span>
            </div>
          </div>
        </section>
        <section>
          <div className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            회원가입 하고 할인가로 구매하기
          </div>
        </section>
        <section className="text-[12px] text-oguogu-black flex flex-col gap-3">
          <div className="flex gap-15">
            <span className="text-oguogu-gray-4">배송</span>
            <div className="flex flex-col">
              <span>3,000원</span>
              <div className="">
                <Badge bgColor="bg-oguogu-yellow" textColor="text-oguogu-black" content="특급배송" />
                <Badge bgColor="bg-oguogu-main-dark" textColor="text-oguogu-white" content="특급배송" />
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
        <ProductLinkItem linkTitle=" 전체 농산물" />
      </div>
    );
  } else if (type === 'experience') {
    return (
      <div className="px-4 pt-4 flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <PathCaseTwo title="체험" params="experience" subParams="" />
          <Title
            title="강원도 정선 감자 체험 2박 3일 중식, 석식 미포함"
            content="동글동글 감자를 모여앉아 친구들과 함께 수확해봐요"
            type="basic"
          />
          {/* 가격 정보 */}
          <div>
            <s className="text-[16px] text-oguogu-gray-2">20,000원</s>
            <div>
              <span className="text-[20px] text-oguogu-main">59%</span>
              <span className="text-[20px] text-oguogu-black ml-2">11,800원</span>
            </div>
          </div>
        </section>
        <section>
          <div className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            회원가입 하고 할인가로 구매하기
          </div>
        </section>
        <section className="text-[12px] text-oguogu-black flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">날짜</span>
            <span>2025년 8월 1일</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">지역</span>
            <span>강원도 원주</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">출발 지역</span>
            <span>강남역 1번 출구</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">인원</span>
            <span>20명</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">포함상품</span>
            <span>왕복 버스, 숙박 2박, 감자캐기 체험, 조식 </span>
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
            <span>김여행</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">문의</span>
            <span>02-2342-4567</span>
          </div>
        </section>
        <ProductLinkItem linkTitle=" 전체 농산물" />
      </div>
    );
  } else if (type === 'gardening') {
    return (
      <div className="px-4 pt-4 flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <PathCaseTwo title="텃밭" params="gardening" subParams="" />
          <Title title="초당옥수수 7월 수확" content="3년 연속 진행 중" type="basic" />
          {/* 가격 정보 */}
          <div>
            <s className="text-[16px] text-oguogu-gray-2">18,000원</s>
            <div>
              <span className="text-[20px] text-oguogu-main">30%</span>
              <span className="text-[20px] text-oguogu-black ml-2">12,600원</span>
            </div>
          </div>
        </section>
        <section>
          <div className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            회원가입 하고 할인가로 구매하기
          </div>
        </section>
        <section className="text-[12px] text-oguogu-black flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">잔여 텃밭</span>
            <span>15개</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">판매 마감일</span>
            <div className="flex flex-col">
              <span>2025년 4월 15일</span>
              <span className="text-oguogu-gray-3">판매 마감까지 10일 남았습니다.</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">수확 예정일</span>
            <span>2025년 7월 중</span>
          </div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">텃밭 위치</span>
            <span>전북 남원시 금동길 123</span>
          </div>
          <div className="w-full h-px bg-oguogu-gray-2"></div>
          <div className="flex gap-2">
            <span className="text-oguogu-gray-4 w-[80px]">배송</span>
            <div className="flex flex-col">
              <span>무료</span>
              <div className="">
                <Badge bgColor="bg-oguogu-yellow" textColor="text-oguogu-black" content="특급배송" />
                <Badge bgColor="bg-oguogu-main-dark" textColor="text-oguogu-white" content="특급배송" />
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
        <ProductLinkItem linkTitle=" 전체 농산물" />
      </div>
    );
  }
  return <></>;
}
