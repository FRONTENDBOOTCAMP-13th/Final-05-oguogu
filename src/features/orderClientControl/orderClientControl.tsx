'use client';
import CuteLoading from '@/components/elements/CuteLoading/CuteLoading';
import FilterButtonForMypage from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import OrderItem from '@/components/elements/OrderItem/OrderItem';
import { updateOrder } from '@/shared/data/actions/order';
import { getOrders } from '@/shared/data/functions/order';
import { useAuthStore } from '@/shared/store/authStore';
import { OrderListResponse } from '@/shared/types/order';
import { useEffect, useState } from 'react';

export default function OrderClientControl() {
  const [orders, setOrders] = useState<OrderListResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuthStore(state => state.token);
  const isLoggedin = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getOrders(token);
        setOrders(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [token]);

  console.log(orders);
  console.log(orders?.item.length);

  const updateOrderStatus = async (order_id: number, newState: string) => {
    try {
      if (!token) return;
      const success = await updateOrder(order_id, { state: newState }, token);

      if (success) {
        setOrders(prev =>
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

  const orderList = orders?.item.map(item => (
    <OrderItem key={item._id} orderState={item.state} item={item} updateOrderStatus={updateOrderStatus} />
  ));
  return (
    <>
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        {/* 필터링 버튼 */}
        <div className="flex gap-1">
          <FilterButtonForMypage name="orderGroup" type="crop" title="농산물" isChecked={true} />
          <FilterButtonForMypage name="orderGroup" type="experience" title="체험" />
          <FilterButtonForMypage name="orderGroup" type="gardening" title="텃밭" />
        </div>

        {/* 주문 상세 내역: div 하위에 삼항연산자로 코드 작성 */}
        {/* lengh로 데이터 유무에 따라 페이지 렌더링을 다르게 함 */}
        <div className="border-t border-t-oguogu-black pt-4 flex flex-col justify-start items-center gap-8">
          {isLoading ? (
            <CuteLoading />
          ) : isLoggedin ? (
            orders?.item.length ? (
              orderList
            ) : (
              <IsEmptyMessage
                title="주문 내역이 없습니다."
                subTxt="지금 바로 다양한 농산물 상품을 만나보세요!"
                LinkTxt="쇼핑 계속하기 🥕"
              />
            )
          ) : (
            <IsEmptyMessage
              title="아직 로그인하지 않으셨네요!"
              subTxt="지금 로그인 하고 내 주문 내역과 배송 상태를 확인해보세요."
              LinkTxt="로그인 하러 가기 🥕"
              link="/login"
            />
          )}
        </div>
      </main>
    </>
  );
}
