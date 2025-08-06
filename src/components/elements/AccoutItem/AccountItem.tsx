'use client';

import AccountForm from '@/components/elements/AccoutItem/AccountForm';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import { getOrdersSeller } from '@/shared/data/functions/order';
import { getUserDetail } from '@/shared/data/functions/user';
import { useAuthStore } from '@/shared/store/authStore';
import { UserAccoutType } from '@/shared/types/account';
import { Order, OrderListResponse } from '@/shared/types/order';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { useEffect, useState } from 'react';

export default function AccountItem() {
  // 사용자 정보, 토큰 전역 상태에서 가져오기
  const token = useAuthStore(state => state.token);
  const userInfo = useAuthStore(state => state.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [account, setAccount] = useState('미등록');

  const [orderRes, setOrderRes] = useState<Order[]>();

  /* 상품, 주문 데이터 받아오고, 현재 계좌 정보를 상태로 저장 */
  useEffect(() => {
    if (!userInfo) return;
    if (token === null) return;

    /* 판매자 데이터 가져와 상태로 저장하기  */
    const fetch = async () => {
      const orderData: OrderListResponse = await getOrdersSeller(token);

      /* 환불 관련 상태인 데이터는 제외 */
      const onPurchasingOrderData = orderData.item.filter(
        item => item.state !== 'refundCompleted' && item.state !== 'refundInProgress',
      );

      setOrderRes(onPurchasingOrderData);
    };

    fetch();

    /* 비동기로 데이터를 가져와 상태로 저장하기 */
    const getUserData = async () => {
      const userExtra: UserAccoutType = await getUserDetail(userInfo._id, 'extra');
      setAccount(
        `${userExtra.item.extra.accountInfo?.settlementBank ?? ''} ${userExtra.item.extra.accountInfo?.settlementAccount ?? ''}`,
      );
    };

    getUserData();
  }, [token, userInfo]);

  const totalPrice =
    orderRes
      ?.map(order => order.products.filter(product => product.price)) // 2차원 배열
      .flat() // 1차원 배열로 변환
      .reduce((sum, product) => sum + product.price * (1 - product.extra.dcRate / 100), 0) ?? 0;

  /* 계좌 등록/변경 버튼 클릭 핸들러 */
  const handleChangeAccount = () => {
    setIsEditing(true);
  };

  /* 정산 대상 기간 */
  const today = new Date();
  const lastMonth = format(subMonths(today, 1), 'M');
  const lastMonthDate = subMonths(today, 1);
  const lastMonthStart = startOfMonth(lastMonthDate);
  const lastMonthEnd = endOfMonth(lastMonthDate);
  const formattedStart = format(lastMonthStart, 'yy.MM.dd');
  const formattedEnd = format(lastMonthEnd, 'yy.MM.dd');

  return (
    <div className="flex flex-col justify-start min-h-screen gap-6 p-4">
      {/* 정산 금액 + 정보 */}
      <div>
        {/* 정산 금액 */}
        <section className="flex flex-col items-center gap-2 p-4 pb-8 text-base">
          <p>
            <GetLoggedInUserData type="name" />
            님의 {lastMonth}월 정산 예정 금액은
          </p>
          <p>
            <span className="text-2xl font-bold text-oguogu-main">{totalPrice?.toLocaleString()}</span>
            <span className="text-2xl text-oguogu-black"> 원 입니다.</span>
          </p>
        </section>

        {/* 정산 정보 */}
        <section className="flex flex-col gap-2 pt-4 pb-4 text-xs border-t border-b border-oguogu-gray-2">
          <div className="flex gap-1">
            <span className="text-oguogu-gray-4 min-w-[80px]">정산 주기</span>
            <span>매월 10일</span>
          </div>
          <div className="flex gap-1">
            <span className="text-oguogu-gray-4 min-w-[80px]">정산 대상 기간</span>
            <span>
              {formattedStart} ~ {formattedEnd}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="text-oguogu-gray-4 min-w-[80px]">정산 계좌</span>
            <span>{account.trim() !== '' ? account : '미등록'}</span>
          </div>
        </section>
      </div>

      {/* 등록 중, 변경 중일 때만 폼 보이기 */}
      {isEditing && (
        <AccountForm
          id={userInfo!._id}
          token={token!}
          onCancel={() => setIsEditing(false)}
          isEditing={isEditing}
          onSubmit={setIsEditing}
          onUpdateAccount={setAccount}
        />
      )}

      {/* 버튼 영역 */}
      {!isEditing && (
        <>
          {/* 등록 안 된 경우 → 등록 버튼 */}
          <button
            className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-main bg-oguogu-white hover:bg-oguogu-gray-1"
            onClick={handleChangeAccount}
            aria-label="정산 계좌 등록/변경"
          >
            {account.trim() !== '' ? '정산 계좌 변경하기' : '정산 계좌 등록하기'}
          </button>
        </>
      )}
    </div>
  );
}
