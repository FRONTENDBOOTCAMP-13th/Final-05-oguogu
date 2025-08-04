'use client';

import OrderItemForSeller from '@/components/elements/OrderItem/OrderItemForSeller';
import OrderDropdown from '@/components/elements/OrderOption/OrderOption';
import { updateOrderSeller } from '@/shared/data/actions/order';
import { getOrdersSeller } from '@/shared/data/functions/order';
import { useAuthStore } from '@/shared/store/authStore';
import { OrderListResponse } from '@/shared/types/order';

import { useEffect, useState } from 'react';

const orderOptions = [
  { label: '전체', value: 'all' },
  { label: '결제 완료', value: 'OS020' },
  { label: '배송 준비 중', value: 'preparingShipment' },
  { label: '배송 중', value: 'inTransit' },
  { label: '배송완료', value: 'delivered' },
  { label: '구매완료', value: 'purchaseCompleted' },
  { label: '환불 접수', value: 'refundInProgress' },
  { label: '환불 완료', value: 'refundCompleted' },
];

export default function OfficeOrderClientContorl() {
  const [selected, setSelected] = useState(orderOptions[0]);
  const [orderRes, setOrderRes] = useState<OrderListResponse>();
  /*   const [isLoading, setIsLoading] = useState(true); */

  const token = useAuthStore(state => state.token);
  /*   const isLoggedin = useAuthStore(state => state.isLoggedIn); */

  useEffect(() => {
    if (token === null) return;
    const fetch = async () => {
      const orderData: OrderListResponse = await getOrdersSeller(token);
      if (orderData.ok) {
        setOrderRes(orderData);
      }
    };
    fetch();
  }, [token]);

  const updateOrderStatus = async (order_id: number, newState: string) => {
    try {
      if (token === null) return;
      const success = await updateOrderSeller(order_id, { state: newState }, token);

      if (success) {
        setOrderRes(prev =>
          prev
            ? {
                ...prev,
                item: prev.item.map(order => (order._id === order_id ? { ...order, state: newState } : order)),
              }
            : prev,
        );
      }
    } catch (err) {
      console.error('주문 상태 변경 중 오류 발생:', err);
    }
  };

  const filteredOrderList = orderRes?.item.filter(item =>
    selected.value === 'all' ? item : item.state === selected.value,
  );

  const orderList = filteredOrderList?.map(item => (
    <OrderItemForSeller key={item._id} orderState={item.state} updateOrderStatus={updateOrderStatus} item={item} />
  ));

  return (
    <>
      <main className="px-4 py-4 flex flex-col gap-5 min-h-[calc(100vh-48px)] items-center">
        <OrderDropdown selected={selected} setSelected={setSelected} orderOptions={orderOptions} />
        {orderList}
      </main>
    </>
  );
}
