'use client';

import HotMarkIcon from '@/components/elements/HotMarkIcon/HotMarkIcon';
import LogOutIcon from '@/components/elements/LogoutIcon/LogoutIcon';
import BackOfficeSectionSkeleton from '@/components/layouts/Login/BackOfficeSectionSkeleton';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import { getOrders } from '@/shared/data/functions/order';
import { useAuthStore } from '@/shared/store/authStore';
import { useLoadingStore } from '@/shared/store/loadingStore';
import { Order, OrderListResponse } from '@/shared/types/order';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyPageSectionDependsOnLoginStatus() {
  // const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const token = useAuthStore(state => state.token);

  const [orderInfo, setOrderInfo] = useState<Order[]>([]);
  const [payedCnt, setPayedCnt] = useState<number>(0);
  const [preparingCnt, setPreparingCnt] = useState<number>(0);
  const [transitCnt, setTransitCnt] = useState<number>(0);
  const [delivered, setDelivered] = useState<number>(0);
  const { isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    if (token === null) {
      return;
    }

    const fetch = async () => {
      try {
        setLoading(true);
        const data: OrderListResponse = await getOrders(token);
        setOrderInfo(data.item);
      } catch (err) {
        console.error('데이터 로드 오류 발생', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [token, setLoading]);

  useEffect(() => {
    if (orderInfo.length > 0) {
      const payedCount = orderInfo.filter(item => item.state === 'OS020').length;
      const preparingCount = orderInfo.filter(item => item.state === 'preparingShipment').length;
      const transitCount = orderInfo.filter(item => item.state === 'inTransit').length;
      const deliveredCount = orderInfo.filter(item => item.state === 'delivered').length;

      setPayedCnt(payedCount ?? 0);
      setPreparingCnt(preparingCount ?? 0);
      setTransitCnt(transitCount ?? 0);
      setDelivered(deliveredCount ?? 0);
    }
  }, [orderInfo]);

  return (
    <>
      <section className="flex flex-col gap-6 pb-6 border-b-4 border-b-oguogu-gray-1">
        <div>
          {/* 타이틀 & 서브타이틀 */}
          <div className="px-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-2xl">
              <p>
                <span className="text-oguogu-main">반가워요! </span>
                <GetLoggedInUserData type="name" />님
              </p>
              <LogOutIcon />
            </div>
            <p className="text-xs text-oguogu-gray-4">
              <GetLoggedInUserData type="name" />
              님의 텃밭 생활을 환영합니다
            </p>
          </div>
        </div>
        {/* 배너 이미지 */}
        <Link href="https://ugveg.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/images/sub-banner-01.png"
            alt="흙내음상점 이동 링크"
            fill={false}
            width={768}
            height={48}
            className="w-full h-12 object-cover"
          />
        </Link>

        {/* INFO 별도 컴포넌트로 분리하여 DB 반영 작업 필요 */}
        {/* 주문 상태 */}
        <div className="px-4 flex flex-col gap-4">
          <p className="text-base">주문/배송</p>
          <div className="flex justify-around gap-2">
            {/* 결제 완료 */}
            <div
              className={`flex flex-col items-center gap-2 ${payedCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
            >
              {isLoading ? (
                <BackOfficeSectionSkeleton width="24px" height="32px" />
              ) : (
                <span className="text-2xl">{payedCnt}</span>
              )}
              <span className="text-sm">결제 완료</span>
            </div>

            <Image src="/svgs/arrow.svg" alt="다음 순서" width={6} height={9} className="rotate-180" />

            {/* 배송 준비 중 */}
            <div
              className={`flex flex-col items-center gap-2 ${preparingCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
            >
              {isLoading ? (
                <BackOfficeSectionSkeleton width="24px" height="32px" />
              ) : (
                <span className="text-2xl">{preparingCnt}</span>
              )}
              <span className="text-sm">배송 준비 중</span>
            </div>

            <Image src="/svgs/arrow.svg" alt="다음 순서" width={6} height={9} className="rotate-180" />

            {/* 배송 중 */}
            <div
              className={`flex flex-col items-center gap-2 ${transitCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
            >
              {isLoading ? (
                <BackOfficeSectionSkeleton width="24px" height="32px" />
              ) : (
                <span className="text-2xl">{transitCnt}</span>
              )}
              <span className="text-sm">배송 중</span>
            </div>

            <Image src="/svgs/arrow.svg" alt="다음 순서" width={6} height={9} className="rotate-180" />

            {/* 배송 완료 */}
            <div
              className={`flex flex-col items-center gap-2 ${delivered === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
            >
              {isLoading ? (
                <BackOfficeSectionSkeleton width="24px" height="32px" />
              ) : (
                <span className="text-2xl">{delivered}</span>
              )}
              <span className="text-sm">배송 완료</span>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-6 flex flex-col gap-6 text-xl">
        <div className="flex flex-col gap-4">
          <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
            나의 텃밭 생활
            <Image src="/svgs/pot.svg" alt="" aria-hidden="true" width={20} height={20}></Image>
          </h2>
          <Link href="/mypage/order">주문/배송 내역</Link>
          <Link href="/mypage/cart">장바구니</Link>
          <Link href="/mypage/pick">찜한 상품</Link>
          <Link href="/mypage/mygarden" className="relative">
            텃밭 히스토리
            <HotMarkIcon />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
            고객센터
            <Image src="/svgs/notice.svg" alt="" aria-hidden="true" width={18} height={18}></Image>
          </h2>
          <Link href="/board/notice">공지사항</Link>
          <Link href="/board/qna">자주 묻는 질문</Link>
        </div>
      </section>
    </>
    // <>
    //   {isLoggedIn ? (
    //     <>
    //       <section className="flex flex-col gap-6 pb-6 border-b-4 border-b-oguogu-gray-1">
    //         <div>
    //           {/* 타이틀 & 서브타이틀 */}
    //           <div className="px-4 flex flex-col gap-1">
    //             <div className="flex justify-between items-center text-2xl">
    //               <p>
    //                 <span className="text-oguogu-main">반가워요! </span>
    //                 <GetLoggedInUserData type="name" />님
    //               </p>
    //               <LogOutIcon />
    //             </div>
    //             <p className="text-xs text-oguogu-gray-4">
    //               <GetLoggedInUserData type="name" />
    //               님의 텃밭 생활을 환영합니다
    //             </p>
    //           </div>
    //         </div>
    //         {/* 배너 이미지 */}
    //         <a
    //           href="https://github.com/FRONTENDBOOTCAMP-13th/Final-13-13tachi"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <Image
    //             src="/images/sub-banner-01.png"
    //             alt="배너 이미지"
    //             fill={false}
    //             width={768}
    //             height={48}
    //             className="w-full h-12 object-cover"
    //           />
    //         </a>

    //         {/* INFO 별도 컴포넌트로 분리하여 DB 반영 작업 필요 */}
    //         {/* 주문 상태 */}
    //         <div className="px-4 flex flex-col gap-4">
    //           <p className="text-base">주문/배송</p>
    //           <div className="flex justify-around gap-2">
    //             {/* 결제 완료 */}
    //             <div
    //               className={`flex flex-col items-center gap-2 ${payedCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
    //             >
    //               <span className="text-2xl">{payedCnt}</span>
    //               <span className="text-sm">결제 완료</span>
    //             </div>

    //             <Image src="/svgs/arrow.svg" alt="다음 순서" width={6} height={9} className="rotate-180" />

    //             {/* 배송 준비 중 */}
    //             <div
    //               className={`flex flex-col items-center gap-2 ${preparingCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
    //             >
    //               <span className="text-2xl">{preparingCnt}</span>
    //               <span className="text-sm">배송 준비 중</span>
    //             </div>

    //             <Image src="/svgs/arrow.svg" alt="다음 순서" width={6} height={9} className="rotate-180" />

    //             {/* 배송 중 */}
    //             <div
    //               className={`flex flex-col items-center gap-2 ${transitCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
    //             >
    //               <span className="text-2xl">{transitCnt}</span>
    //               <span className="text-sm">배송 중</span>
    //             </div>

    //             <Image src="/svgs/arrow.svg" alt="다음 순서" width={6} height={9} className="rotate-180" />

    //             {/* 배송 완료 */}
    //             <div
    //               className={`flex flex-col items-center gap-2 ${delivered === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
    //             >
    //               <span className="text-2xl">{delivered}</span>
    //               <span className="text-sm">배송 완료</span>
    //             </div>
    //           </div>
    //         </div>
    //       </section>
    //       <section className="px-4 py-6 flex flex-col gap-6 text-xl">
    //         <div className="flex flex-col gap-4">
    //           <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
    //             나의 텃밭 생활
    //             <Image src="/svgs/pot.svg" alt="" width={20} height={20}></Image>
    //           </h2>
    //           <Link href="/mypage/order">주문/배송 내역</Link>
    //           <Link href="/mypage/cart">장바구니</Link>
    //           <Link href="/mypage/pick">찜한 상품</Link>
    //           <Link href="/mypage/mygarden" className="relative">
    //             텃밭 히스토리
    //             <HotMarkIcon />
    //           </Link>
    //         </div>

    //         <div className="flex flex-col gap-4">
    //           <h2 className="text-base text-oguogu-gray-4 flex gap-1 items-start">
    //             고객센터
    //             <Image src="/svgs/notice.svg" alt="" width={18} height={18}></Image>
    //           </h2>
    //           <Link href="/board/notice">공지사항</Link>
    //           <Link href="/board/qna">자주 묻는 질문</Link>
    //         </div>
    //       </section>
    //     </>
    //   ) : (
    //     <section className="px-4 flex flex-col gap-6 pb-6">
    //       {/* 타이틀 & 서브타이틀 */}
    //       <div className="flex flex-col gap-1">
    //         <div className="flex justify-between items-center text-2xl ">
    //           <span className="text-oguogu-main">안녕하세요!</span>
    //         </div>
    //         <p className="text-xs text-oguogu-gray-4">로그인하고 더 많은 서비스를 이용해 보세요</p>
    //       </div>

    //       {/* 서비스가 제공하는 혜택 3가지 */}
    //       <div className="flex py-4 justify-around  border border-oguogu-gray-2 rounded-lg">
    //         {/* 제품은 신선하게 */}
    //         <div className="flex flex-col items-center gap-2">
    //           <Image src="/svgs/fresh.svg" alt="fresh" width={32} height={32} />
    //           <div>
    //             <p className="text-[10px] text-center text-oguogu-gray-4">제품은</p>
    //             <p className="text-sm text-center">신선하게!</p>
    //           </div>
    //         </div>

    //         {/* 가격은 저렴하게 */}
    //         <div className="flex flex-col items-center gap-2">
    //           <Image src="/svgs/low-price.svg" alt="fresh" width={32} height={32} />
    //           <div>
    //             <p className="text-[10px] text-center text-oguogu-gray-4">가격은</p>
    //             <p className="text-sm text-center">저렴하게!</p>
    //           </div>
    //         </div>

    //         {/* 상품은 다양하게 */}
    //         <div className="flex flex-col items-center gap-2">
    //           <Image src="/svgs/various.svg" alt="fresh" width={32} height={32} />
    //           <div>
    //             <p className="text-[10px] text-center text-oguogu-gray-4">상품은</p>
    //             <p className="text-sm text-center">다양하게!</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* 로그인 / 회원가입 버튼 */}
    //       <div className="text-xs flex gap-2">
    //         <Link
    //           href="/login"
    //           className="border border-oguogu-main bg-oguogu-main rounded-sm text-center  px-3 py-1 text-oguogu-white w-full"
    //         >
    //           로그인
    //         </Link>
    //         <Link href="/register" className="border border-oguogu-main rounded-lg text-center px-3 py-1  w-full">
    //           회원가입
    //         </Link>
    //       </div>
    //     </section>
    //   )}
    // </>
  );
}
