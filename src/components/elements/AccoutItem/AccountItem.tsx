'use client';

import AccountForm from '@/components/elements/AccoutItem/AccountForm';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import { getOrdersSeller } from '@/shared/data/functions/order';
import { getProductSeller } from '@/shared/data/functions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { OrderListResponse } from '@/shared/types/order';
import { productsRes } from '@/shared/types/product';
import { useEffect, useState } from 'react';

export default function AccountItem() {
  const [registeredAccount, setRegisteredAccount] = useState<string | null>(null); // 등록 여부
  const [isEditing, setIsEditing] = useState(false); // 계좌 변경 중 여부
  
  const settlementInfo = [
    { label: '정산 주기', value: '매월 10일' },
    { label: '정산 대상 기간', value: '2025.07.01 ~ 2025.07.31' },
    { label: '정산 계좌', value: registeredAccount ?? '미등록' },
  ];

  const token = useAuthStore(state => state.token);

  const [productRes, setProductRes] = useState<productsRes>();
  const [orderRes, setOrderRes] = useState<OrderListResponse>();

  useEffect(() => {
    if (!token) return;

    const fetch = async () => {
      const data: productsRes = await getProductSeller(token);
      const orderData: OrderListResponse = await getOrdersSeller(token);

      if (data.ok) {
        setProductRes(data);
      }
      if (orderData.ok) {
        setOrderRes(orderData);
      }
    };
    fetch();
  }, [token]);

  console.log(productRes);
  console.log(orderRes);

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

  const handleChangeAccount = () => {
    setIsEditing(true); // 계좌 변경 시작
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
            <span className="text-2xl text-oguogu-black">원 입니다.</span>
          </p>
        </section>

        {/* 정산 정보 */}
        <section className="flex flex-col gap-2 pt-4 pb-4 text-xs border-t border-b border-oguogu-gray-2">
          {settlementInfo.map(({ label, value }) => (
            <div key={label} className="flex gap-1">
              <span className="text-oguogu-gray-4 min-w-[80px]">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </section>
      </div>

      {/* 등록 중, 변경 중일 때만 폼 보이기 */}
      {isEditing && (
        <AccountForm
          setRegisteredAccount={account => {
            setRegisteredAccount(account);
            setIsEditing(false); // 등록 완료 시 변경 모드 종료
          }}
          onCancel={() => setIsEditing(false)} // 변경 취소
        />
      )}

      {/* 버튼 영역 */}
      {!isEditing && (
        <>
          {/* 등록 안 된 경우 → 등록 버튼 */}
          {!registeredAccount && (
            <button
              className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-main bg-oguogu-white hover:bg-oguogu-gray-1"
              onClick={handleChangeAccount}
            >
              정산 계좌 등록하기
            </button>
          )}

          {/* 등록된 경우 → 변경 버튼 */}
          {registeredAccount && (
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
