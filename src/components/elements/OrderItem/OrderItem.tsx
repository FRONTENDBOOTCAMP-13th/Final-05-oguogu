import { OrderItemType } from '@/components/elements/OrderItem/OrderItem.type';
import ReviewClientControl from '@/features/reviewClientControl/reviewClientControl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function OrderItem({ orderState, item, updateOrderStatus, handleSubmit }: OrderItemType) {
  let refundState = false;
  let infoText = '결제완료';

  const [isOpen, setIsOpen] = useState(false);

  const reviewState = item.products[0].review_id;

  console.log(item);

  switch (orderState) {
    case 'OS020':
      infoText = '결제 완료';
      break;
    case 'preparingShipment':
      infoText = '배송 준비중';
      break;
    case 'inTransit':
      infoText = '배송 중';
      break;
    case 'delivered':
      infoText = '배송 완료';
      break;
    case 'purchaseCompleted':
      infoText = '구매 완료';
      break;
    case 'refundInProgress':
      infoText = '환불 진행중';
      refundState = true;
      break;
    case 'refundCompleted':
      infoText = '환불 완료';
      refundState = true;
      break;
  }

  const requestRefund = () => updateOrderStatus(item._id, 'refundInProgress');
  const confirmPurchase = () => updateOrderStatus(item._id, 'purchaseCompleted');
  // const cancelRefundRequest = () => updateOrderStatus(item._id, 'preparingShipment');

  return (
    <div className="flex flex-col gap-4 justify-between min-w-[288px] w-full">
      {/* 상단 상태 및 날짜 */}
      <section className="flex justify-between text-[12px] pb-2 border-b border-oguogu-gray-2">
        <span
          className={
            refundState
              ? 'text-oguogu-gray-3'
              : orderState === 'purchaseCompleted'
                ? 'text-oguogu-main'
                : 'text-oguogu-black'
          }
        >
          {infoText}
        </span>
        <span className="text-oguogu-gray-4">{item.createdAt.split(' ')[0]}</span>
      </section>

      {/* 주문 상품 목록 */}
      <section className="flex flex-col gap-2">
        {item.products.map(product => (
          <Link href={`/search/result/${product._id}/detail`} key={product._id} className="flex gap-2">
            <div className="w-[48px] h-[48px] relative rounded-sm overflow-hidden shrink-0">
              <Image
                src={item.products[0].image.path}
                alt={product.name ?? '상품 이미지'}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <div className="text-[12px] clamp-1">{product.name}</div>
              <div className="text-[12px] text-oguogu-gray-4">
                {product.quantity}개 · {(product.price * (1 - product.extra.dcRate / 100)).toLocaleString()}원
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* 상태 변경 버튼 (주문 단위) */}
      {orderState !== 'purchaseCompleted' &&
        orderState !== 'refundCompleted' &&
        (refundState ? (
          ''
        ) : (
          <section className="flex justify-center items-center gap-2 text-[12px]">
            <button
              onClick={requestRefund}
              className="w-full py-2 leading-none border border-oguogu-gray-2 rounded-[4px]"
            >
              환불 신청
            </button>
            <button
              onClick={confirmPurchase}
              className="w-full py-2 leading-none border border-oguogu-main rounded-[4px]"
            >
              구매 확정
            </button>
          </section>
        ))}

      {orderState === 'purchaseCompleted' &&
        (reviewState ? (
          <Link href={`/search/result/${item.products[0]._id}/review`}>
            <button className="text-[12px] w-full py-2 leading-none border border-oguogu-gray-2 rounded-[4px]">
              후기 작성 완료
            </button>
          </Link>
        ) : (
          <section>
            <button
              onClick={() => setIsOpen(true)}
              className="text-[12px] w-full py-2 leading-none border border-oguogu-main rounded-[4px]"
            >
              구매 후기 작성하기
            </button>
          </section>
        ))}
      {isOpen && <ReviewClientControl isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={handleSubmit} item={item} />}
    </div>
  );
}
