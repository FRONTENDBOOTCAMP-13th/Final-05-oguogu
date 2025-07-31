'use client';
import HotMarkIcon from '@/components/elements/HotMarkIcon/HotMarkIcon';
import LogOutIcon from '@/components/elements/LogoutIcon/LogoutIcon';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';
import { getOrdersSeller } from '@/shared/data/functions/order';
import { getPosts } from '@/shared/data/functions/post';
import { getProductSeller } from '@/shared/data/functions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { OrderListResponse } from '@/shared/types/order';
import { responsePostReplies } from '@/shared/types/post';
import { productsRes } from '@/shared/types/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BackOffcieSectionDependsOnLoginStatus() {
  const token = useAuthStore(state => state.token);
  const seller_id = useAuthStore(state => state.userInfo?._id);

  const [productRes, setProductRes] = useState<productsRes>();
  const [orderRes, setOrderRes] = useState<OrderListResponse>();
  const [qnaRes, setQnaRes] = useState<responsePostReplies>();

  useEffect(() => {
    if (!token) return;

    const fetch = async () => {
      const data: productsRes = await getProductSeller(token);
      const orderData: OrderListResponse = await getOrdersSeller(token);
      const qnaData: responsePostReplies = await getPosts('qna', token);

      if (data.ok) {
        setProductRes(data);
      }
      if (orderData.ok) {
        setOrderRes(orderData);
      }
      if (qnaData.ok) {
        setQnaRes(qnaData);
      }
    };
    fetch();
  }, [token]);

  const cropCnt = productRes?.item.filter(item => item.extra?.productType === 'crop').length;
  const experiencepCnt = productRes?.item.filter(item => item.extra?.productType === 'experience').length;
  const gardeningCnt = productRes?.item.filter(item => item.extra?.productType === 'gardening').length;

  const payedCnt = orderRes?.item.filter(item => item.state === 'OS020').length;
  const preparingShipmentCnt = orderRes?.item.filter(item => item.state === 'preparingShipment').length;
  const inTransitCnt = orderRes?.item.filter(item => item.state === 'inTransit').length;
  const deliveredCnt = orderRes?.item.filter(item => item.state === 'delivered').length;
  const purchaseCompletedCnt = orderRes?.item.filter(item => item.state === 'purchaseCompleted').length;

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

  const qnaList = qnaRes?.item.filter(item => item.seller_id === seller_id);

  const qnaWaitingCnt = qnaList?.filter(item => item.repliesCount === 0).length;
  const qnafinishedCnt = qnaList?.filter(item => item.repliesCount !== 0).length;

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
              <span className="text-[28px]">{totalPrice?.toLocaleString()}</span>
              <span>원</span>
            </div>
          </div>
          <ProductLinkItem link="/office/payments" linkTitle="정산 정보" subTxt="확인 하기" />

          {/* 주문 내역 */}
          <div className="flex flex-col gap-3 px-4 pt-4">
            <p className="text-xl">주문 내역</p>
            <div className="flex justify-around gap-2">
              {/* 결제 완료 */}
              <div
                className={`flex flex-col items-center gap-2 ${payedCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
              >
                <span className="text-2xl">{payedCnt}</span>
                <span className="text-sm">결제 완료</span>
              </div>

              {/* 배송 준비 중 */}
              <div
                className={`flex flex-col items-center gap-2 ${preparingShipmentCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
              >
                <span className="text-2xl">{preparingShipmentCnt}</span>
                <span className="text-sm">배송 준비 중</span>
              </div>

              {/* 배송 중 */}
              <div
                className={`flex flex-col items-center gap-2 ${inTransitCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
              >
                <span className="text-2xl">{inTransitCnt}</span>
                <span className="text-sm">배송 중</span>
              </div>

              {/* 배송 완료 */}
              <div
                className={`flex flex-col items-center gap-2 ${deliveredCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
              >
                <span className="text-2xl">{deliveredCnt}</span>
                <span className="text-sm">배송 완료</span>
              </div>

              {/* 구매 완료 */}
              <div
                className={`flex flex-col items-center gap-2 ${purchaseCompletedCnt === 0 ? `text-oguogu-gray-2` : 'text-oguogu-black'}`}
              >
                <span className="text-2xl">{purchaseCompletedCnt}</span>
                <span className="text-sm">구매 완료</span>
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
                <span className={`text-2xl  ${cropCnt !== 0 ? 'text-oguogu-black' : 'text-oguogu-gray-2'}`}>
                  {cropCnt}
                </span>
                <span className="text-sm">농산물</span>
              </div>

              {/* 체험 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className={`text-2xl  ${experiencepCnt !== 0 ? 'text-oguogu-black' : 'text-oguogu-gray-2'}`}>
                  {experiencepCnt}
                </span>
                <span className="text-sm">체험</span>
              </div>

              {/* 텃밭 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className={`text-2xl  ${gardeningCnt !== 0 ? 'text-oguogu-black' : 'text-oguogu-gray-2'}`}>
                  {gardeningCnt}
                </span>
                <span className="text-sm">텃밭</span>
              </div>
            </div>
          </div>
          <ProductLinkItem link="/office/products" linkTitle="내 상품" subTxt="관리 하기" />

          {/* 상품 문의 내역 */}
          <div className="flex flex-col gap-3 px-4 pt-4">
            <p className="text-xl">상품 문의 내역</p>
            <div className="flex justify-center gap-30">
              {/* 답변 준비중 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className={`text-2xl ${qnaWaitingCnt !== 0 ? 'text-oguogu-black' : 'text-oguogu-gray-2'}`}>
                  {qnaWaitingCnt}
                </span>
                <span className="text-sm">답변 대기 중</span>
              </div>

              {/* 답변 완료 */}
              <div className={`flex flex-col items-center gap-2`}>
                <span className={`text-2xl ${qnafinishedCnt !== 0 ? 'text-oguogu-black' : 'text-oguogu-gray-2'}`}>
                  {qnafinishedCnt}
                </span>
                <span className="text-sm">답변 완료</span>
              </div>
            </div>
          </div>
          <ProductLinkItem link="/office/qnas" linkTitle="전체 문의 내역" subTxt="확인 하기" />
        </div>
      </section>
    </>
  );
}
