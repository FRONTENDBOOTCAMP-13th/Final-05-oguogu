import { OrderItemType } from '@/components/elements/OrderItem/OrderItem.type';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderItem({ orderState, item, updateOrderStatus }: OrderItemType) {
  let refundState: boolean = false;
  let infoText: string = '결제완료';

  if (orderState === 'OS020') {
    infoText = '결제 완료';
    refundState = false;
  } else if (orderState === 'preparingShipment') {
    infoText = '배송 준비중';
    refundState = false;
  } else if (orderState === 'inTransit') {
    infoText = '배송 중';
    refundState = false;
  } else if (orderState === 'delivered') {
    infoText = '배송 완료';
    refundState = false;
  } else if (orderState === 'purchaseCompleted') {
    infoText = '구매 완료';
    refundState = false;
  } else if (orderState === 'refundInProgress') {
    infoText = '환불 진행중';
    refundState = true;
  } else if (orderState === 'refundCompleted') {
    infoText = '환불 완료';
    refundState = true;
  }

  const requestRefund = () => {
    updateOrderStatus(item._id, 'refundInProgress');
  };
  const confirmPurchase = () => {
    updateOrderStatus(item._id, 'purchaseCompleted');
  };
  const cancelRefundRequest = () => {
    updateOrderStatus(item._id, 'preparingShipment');
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-between w-[288px] ">
        <section className="flex justify-between text-[12px] pb-2 border-b border-oguogu-gray-2">
          <span
            className={
              refundState
                ? `text-oguogu-gray-3`
                : orderState === 'purchaseCompleted'
                  ? `text-oguogu-main`
                  : `text-oguogu-black`
            }
          >
            {infoText}
          </span>
          <span className="text-oguogu-gray-4">{item.createdAt.split(' ')[0]}</span>
        </section>
        <section className="flex justify-between pb-2 ">
          <div className="w-[48px] h-[48px] bg-[url('/images/crop/crop-001.png')] bg-cover bg-center bg-no-repeat rounded-[4px]" />
          <div className="w-[216px] h-[48px]">
            <div className="flex items-center gap-1">
              <Image src="/images/product-hatIcon.svg" alt="농사꾼 모자 아이콘" width={16} height={16} />
              <div className="text-[10px]">돌쇠네농산물</div>
            </div>
            <Link href={`/search/result/${item.products[0]._id}/detail`}>
              <div className="text-[14px] truncate">{item.products[0].name}</div>
            </Link>
            <div className="text-[12px] flex gap-3">
              <span>{item.cost.total.toLocaleString()}원</span>
              <span> {item.products[0].quantity}개</span>
            </div>
          </div>
        </section>
        {orderState !== 'purchaseCompleted' &&
          orderState !== 'refundCompleted' &&
          (refundState ? (
            <section>
              <button
                onClick={cancelRefundRequest}
                className="text-[12px] w-full py-2 leading-none border border-oguogu-gray-2 rounded-[4px]"
              >
                환불 신청 취소
              </button>
            </section>
          ) : (
            <section className="flex justify-center items-center gap-2 text-[12px]">
              <button
                onClick={requestRefund}
                className="w-[140px] py-2 leading-none border border-oguogu-gray-2 rounded-[4px]"
              >
                환불 신청
              </button>
              <button
                onClick={confirmPurchase}
                className="w-[140px] py-2 leading-none border border-oguogu-main rounded-[4px]"
              >
                구매 확정
              </button>
            </section>
          ))}
      </div>
    </>
  );
}
