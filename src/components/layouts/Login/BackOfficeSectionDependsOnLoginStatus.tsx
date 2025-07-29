import HotMarkIcon from '@/components/elements/HotMarkIcon/HotMarkIcon';
import LogOutIcon from '@/components/elements/LogoutIcon/LogoutIcon';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import Link from 'next/link';

export default function BackOffcieSectionDependsOnLoginStatus() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <div>
          {/* 타이틀 & 서브타이틀 */}
          <div className="flex flex-col gap-1 px-4">
            <div className="flex items-center justify-between text-2xl">
              <p>
                <span className="text-oguogu-main">환영해요! </span>
                <GetLoggedInUserData type="name" />님
              </p>
              <LogOutIcon />
            </div>
            <p className="text-xs text-oguogu-gray-4">
              <GetLoggedInUserData type="name" />
              님의 텃밭을 응원합니다
            </p>
          </div>
        </div>

        {/* 최신 공지사항 게시물 */}
        <div className="flex items-center justify-between px-3 py-2 mx-4 border rounded-sm border-oguogu-gray-2">
          <div className="flex gap-2">
            <HotMarkIcon title="신규" animate={false} />
            <Link href="/board/notice" className="text-xs textElipsis">
              [공지] 관리자 페이지 개편 안내
            </Link>
          </div>
          <p className="text-xs text-oguogu-gray-4">25.07.24</p>
        </div>

        <div className="flex flex-col gap-3">
          {/* 판매 수익 */}
          <div className="flex flex-col gap-3 px-4 pt-4">
            <p className="text-xl">판매 수익</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[28px]">8,354,980</span>
              <span>원</span>
            </div>
          </div>
          <ProductLinkItem link="/office/payments" linkTitle="정산 정보" subTxt="확인 하기" />

          {/* 주문 내역 */}
          <div className="flex flex-col gap-3 px-4 pt-4">
            <p className="text-xl">주문 내역</p>
            <div className="flex justify-around gap-2">
              {/* 결제 완료 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl">58</span>
                <span className="text-sm">결제 완료</span>
              </div>

              {/* 배송 준비 중 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl">24</span>
                <span className="text-sm">배송 준비 중</span>
              </div>

              {/* 배송 중 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl">102</span>
                <span className="text-sm">배송 중</span>
              </div>

              {/* 배송 완료 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl">80</span>
                <span className="text-sm">배송 완료</span>
              </div>
            </div>
          </div>
          <ProductLinkItem link="/office/orders" linkTitle="상세 주문 내역" subTxt="확인 하기" />

          {/* 판매 중인 상품 */}
          <div className="flex flex-col gap-3 px-4 pt-4">
            <p className="text-xl">판매 중인 상품</p>
            <div className="flex justify-around gap-2">
              {/* 농산물 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl">24</span>
                <span className="text-sm">농산물</span>
              </div>

              {/* 체험 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl text-oguogu-gray-2">0</span>
                <span className="text-sm">체험</span>
              </div>

              {/* 텃밭 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className="text-2xl">1</span>
                <span className="text-sm">텃밭</span>
              </div>
            </div>
          </div>
          <ProductLinkItem link="/office/products" linkTitle="내 상품" subTxt="관리 하기" />
        </div>
      </section>
    </>
  );
}
