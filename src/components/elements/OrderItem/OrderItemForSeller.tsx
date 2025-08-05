import { Order } from '@/shared/types/order';

export interface OrderItemForSellerType {
  orderState: string;
  updateOrderStatus: (order_id: number, newState: string) => void;
  item: Order;
}

export default function OrderItemForSeller({ orderState, item, updateOrderStatus }: OrderItemForSellerType) {
  let refundState = false;
  let infoText = '결제완료';
  let nextText = '';

  let onClick;

  switch (orderState) {
    case 'OS020':
      infoText = '결제 완료';
      nextText = '배송 준비중';
      // 배송 준비중
      onClick = () => updateOrderStatus(item._id, 'preparingShipment');
      break;
    case 'preparingShipment':
      infoText = '배송 준비중';
      nextText = '배송중'; // 배송 중
      onClick = () => updateOrderStatus(item._id, 'inTransit');
      break;
    case 'inTransit':
      infoText = '배송 중';
      nextText = '배송 완료';
      // 배송 완료
      onClick = () => updateOrderStatus(item._id, 'delivered');
      break;
    case 'delivered':
      infoText = '배송 완료';
      break;
    case 'purchaseCompleted':
      infoText = '구매 완료';
      break;
    case 'refundInProgress':
      infoText = '환불 접수';
      refundState = true;
      nextText = '환불 처리';
      // 환불 승인
      onClick = () => updateOrderStatus(item._id, 'refundCompleted');
      break;
    case 'refundCompleted':
      infoText = '환불 완료';
      refundState = true;
      break;
  }

  // 상태별 함수를 정의해야합니다.

  return (
    <div className="flex flex-col gap-4 justify-between w-full min-w-[288px]">
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
      {/* 아이템이 여러개면 map으로 뿌려줘야 합니다. */}
      <section className="flex flex-col gap-2">
        {item.products.map(product => (
          <div key={product._id} className="flex gap-2">
            {/* <div className="w-[48px] h-[48px] bg-cover bg-center bg-[url('/images/crop/crop-001.png')] bg-no-repeat rounded-[4px]" /> */}
            <div
              style={{
                backgroundImage: `url(${item.products[0].image.path})`,
              }}
              className="w-[48px] h-[48px] bg-cover bg-center bg-[url('/images/crop/crop-001.png')] bg-no-repeat rounded-[4px]"
            ></div>
            <div className="w-[216px]">
              <div className="text-[12px] truncate">{product.name}</div>
              <div className="text-[12px] text-oguogu-gray-4">
                {product.quantity}개 · {(product.price * (1 - product.extra.dcRate / 100)).toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </section>

      {orderState === 'OS020' ||
      orderState === 'preparingShipment' ||
      orderState === 'inTransit' ||
      orderState === 'refundInProgress' ? (
        <section className="flex justify-center items-center gap-2 text-[12px]">
          {/* <button className="w-full py-2 leading-none border border-oguogu-gray-2 rounded-[4px]">주문 정보 확인</button> */}
          <button onClick={onClick} className="w-full py-2 leading-none border border-oguogu-main rounded-[4px]">
            {nextText} 전환
          </button>
        </section>
      ) : (
        ''
        /*  <section>
          <button className="text-[12px] w-full py-2 leading-none border border-oguogu-gray-2 rounded-[4px]">
            주문 정보 확인
          </button>
        </section> */
      )}
    </div>
  );
}
