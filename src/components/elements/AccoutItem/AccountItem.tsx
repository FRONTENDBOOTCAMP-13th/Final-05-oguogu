'use client';

import AccountForm from '@/components/elements/AccoutItem/AccountForm';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import { getOrdersSeller } from '@/shared/data/functions/order';
import { getUserDetail } from '@/shared/data/functions/user';
import { useAuthStore } from '@/shared/store/authStore';
import { UserAccoutType } from '@/shared/types/account';
import { OrderListResponse } from '@/shared/types/order';
import { useEffect, useState } from 'react';

export default function AccountItem() {
  // 사용자 정보, 토큰 전역 상태에서 가져오기
  const token = useAuthStore(state => state.token);
  const userInfo = useAuthStore(state => state.userInfo);
  const [isEditing, setIsEditing] = useState(false); // 계좌 변경 중 여부
  const [account, setAccount] = useState('');

  const [orderRes, setOrderRes] = useState<OrderListResponse>();

  // 토큰이 있을 때만 상품, 주문 데이터 받아오기
  useEffect(() => {
    if (!userInfo) return;
    if (token === null) return;

    /* 판매자 데이터 가져와 상태로 저장하기  */
    const fetch = async () => {
      const orderData: OrderListResponse = await getOrdersSeller(token);

      if (orderData.ok) {
        setOrderRes(orderData);
      }
    };
    fetch();

    /* 비동기로 데이터를 가져와 상태로 저장하기 */
    const getUserData = async () => {
      const userExtra: UserAccoutType = await getUserDetail(userInfo._id, 'extra');
      console.log(userExtra);
      setAccount(userExtra.item.extra.accountInfo.settlementAccount);
    };

    getUserData();
  }, [token, userInfo]);

  const totalPrice = orderRes?.item.reduce((orderSum, order) => {
    const productsSum = order.products.reduce((sum, prod) => {
      const price = prod.price;
      const quantity = prod.quantity;
      const dcRate = prod.extra.dcRate;

      const discounted = price * (1 - dcRate / 100);
      return sum + discounted * quantity;
    }, 0);
    return orderSum + productsSum;
  }, 0);

  // 계좌 등록/변경 버튼 클릭 핸들러
  const handleChangeAccount = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col justify-start min-h-screen gap-6 p-4">
      {/* 정산 금액 + 정보 */}
      <div>
        {/* 정산 금액 */}
        <section className="flex flex-col items-center gap-2 p-4 pb-8 text-base">
          <p>
            <GetLoggedInUserData type="name" />
            님의 7월 정산 예정 금액은
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
            <span>2025.07.01 ~ 2025. 07.31</span>
          </div>
          <div className="flex gap-1">
            <span className="text-oguogu-gray-4 min-w-[80px]">정산 계좌</span>
            <span>{account! ?? '미등록'}</span>
          </div>
        </section>
      </div>

      {/* 등록 중, 변경 중일 때만 폼 보이기 */}
      {isEditing && (
        <AccountForm
          id={userInfo!._id}
          token={token!}
          /*  setRegisteredAccount={(account, extraUpdates) => handleRegisteredAccount(account, extraUpdates)}
          onCancel={() => setIsEditing(false)} // 변경 취소 */
        />
      )}

      {/* 버튼 영역 */}
      {!isEditing && (
        <>
          {/* 등록 안 된 경우 → 등록 버튼 */}
          {!userInfo?.extra?.accountInfo?.settlementAccount && (
            <button
              className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-main bg-oguogu-white hover:bg-oguogu-gray-1"
              onClick={handleChangeAccount}
            >
              정산 계좌 등록하기
            </button>
          )}

          {/* 등록된 경우 → 변경 버튼 */}
          {userInfo?.extra?.accountInfo?.settlementAccount && (
            <button
              className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-main bg-oguogu-white hover:bg-oguogu-gray-1"
              onClick={handleChangeAccount}
            >
              정산 계좌 변경하기
            </button>
          )}
        </>
      )}
    </div>
  );
}
