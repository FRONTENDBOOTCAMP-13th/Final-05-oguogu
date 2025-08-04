'use client';

import { ProductType } from '@/app/(exploring)/product/[type]/ProductListByType.type';
import FilterButtonForMypage from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import OrderItem from '@/components/elements/OrderItem/OrderItem';
import { uploadFile } from '@/shared/data/actions/file';
import { updateOrder } from '@/shared/data/actions/order';
import { createReplie } from '@/shared/data/actions/replies';
import { getOrders } from '@/shared/data/functions/order';
import { useAuthStore } from '@/shared/store/authStore';
import { fileResponse } from '@/shared/types/file';
import { OrderListResponse } from '@/shared/types/order';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// 리뷰 제출 함수에 필요한 파라미터 타입 정의
export interface handleSubmitType {
  title: string;
  content: string;
  rating: number;
  imageFile: File | null;
  setTitle: (str: string) => void;
  setContent: (str: string) => void;
  setRating: (num: number) => void;
  setImageFile: (file: File | null) => void;
  setImagePreview: (str: string | null) => void;
  setIsOpen: (state: boolean) => void;
  setSelectedFileName: (str: string) => void;
  setIsLoading: (state: boolean) => void;
  order_id: number;
  product_id: number;
  token: string;
}

export default function OrderClientControl() {
  // 주문 목록 상태 저장
  const [orders, setOrders] = useState<OrderListResponse>();
  const [checkedType, setCheckedType] = useState<ProductType>('crop');

  // 로그인 상태 및 토큰 조회
  const token = useAuthStore(state => state.token);
  const userInfo = useAuthStore(state => state.userInfo);
  const isLoggedin = useAuthStore(state => state.isLoggedIn);

  // 마운트 시 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrder = async () => {
      if (token === null) {
        return;
      }

      try {
        const data = await getOrders(token);
        setOrders(data);
      } catch (err) {
        console.log('주문 데이터 에러', err);
      }
    };

    fetchOrder();
  }, [token, userInfo, isLoggedin]);

  // 주문 상태를 변경하는 함수
  const updateOrderStatus = async (order_id: number, newState: string) => {
    try {
      if (token === null) return;
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
  // 리뷰 제출 핸들러
  const handleSubmit = async ({
    title,
    content,
    rating,
    imageFile,
    setTitle,
    setContent,
    setRating,
    setImageFile,
    setImagePreview,
    setIsOpen,
    setSelectedFileName,
    setIsLoading,
    order_id,
    product_id,
    token,
  }: handleSubmitType) => {
    if (!title || !content || rating === 0) {
      toast.error('제목, 내용, 별점을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);

    let fileRes: fileResponse | null = null;

    // 이미지가 있을 때만 파일 업로드 처리
    if (imageFile) {
      const formData = new FormData();
      formData.append('attach', imageFile);

      fileRes = await uploadFile(formData);
      console.log(fileRes);

      if (!fileRes?.ok) {
        console.error(fileRes?.message);
        toast.error('이미지 업로드에 실패했습니다.');
        setIsLoading(false);
        return;
      }
    }

    // 리뷰 생성 - 이미지 경로는 조건부로 설정
    const res = await createReplie(
      {
        order_id,
        product_id,
        rating,
        content,
        extra: {
          name: title,
          imagePath: fileRes?.item[0]?.path || null, // 이미지가 없으면 null
        },
      },
      token,
    );

    if (res.ok) {
      toast.success('리뷰가 등록되었습니다!');
      setTitle('');
      setContent('');
      setRating(0);
      setImageFile(null);
      setImagePreview(null);
      setIsLoading(false);
      setIsOpen(false); // 폼 닫기
      setSelectedFileName('');
      window.location.reload();
    } else {
      setTitle('');
      setContent('');
      setRating(0);
      setImageFile(null);
      setImagePreview(null);
      setIsLoading(false);
      setIsOpen(false); // 폼 닫기
      setSelectedFileName('');
      toast.error(res.message || '등록이 실패했습니다. 다시 시도해주세요');
      console.error(res.message);
    }
  };

  // 주문 리스트 필터링
  const filteredOrders = orders?.item.filter(order =>
    order.products?.some(product => product.extra?.productType === checkedType),
  );

  return (
    <>
      <main className="px-4 py-4 flex flex-col gap-2 min-h-[calc(100vh-48px)]">
        {/* 필터링 버튼 */}
        <div className="flex gap-1">
          <FilterButtonForMypage
            name="orderGroup"
            type="crop"
            title="농산물"
            isChecked={checkedType === 'crop'}
            onClick={() => setCheckedType('crop')}
          />
          <FilterButtonForMypage
            name="orderGroup"
            type="experience"
            title="체험"
            isChecked={checkedType === 'experience'}
            onClick={() => setCheckedType('experience')}
          />
          <FilterButtonForMypage
            name="orderGroup"
            type="gardening"
            title="텃밭"
            isChecked={checkedType === 'gardening'}
            onClick={() => setCheckedType('gardening')}
          />
        </div>

        {/* 주문 상세 내역: div 하위에 삼항연산자로 코드 작성 */}
        {/* length로 데이터 유무에 따라 페이지 렌더링을 다르게 함 */}
        <div className="flex flex-col items-center justify-start gap-8 pt-4 border-t border-t-oguogu-black">
          {token === null || !isLoggedin ? (
            <IsEmptyMessage
              title="아직 로그인하지 않으셨네요!"
              subTxt="지금 로그인 하고 내 주문 내역과 배송 상태를 확인해보세요."
              LinkTxt="로그인 하러 가기 🥕"
              link="/login"
            />
          ) : filteredOrders && filteredOrders.length > 0 ? (
            <div className="flex flex-col w-full gap-5">
              {filteredOrders.map(order => (
                <OrderItem
                  key={order._id}
                  orderState={order.state}
                  item={order}
                  updateOrderStatus={updateOrderStatus}
                  handleSubmit={handleSubmit}
                />
              ))}
            </div>
          ) : (
            <IsEmptyMessage
              title="주문 내역이 없습니다."
              subTxt="지금 바로 다양한 농산물 상품을 만나보세요!"
              LinkTxt="쇼핑 계속하기 🥕"
            />
          )}
        </div>
      </main>
    </>
  );
}
