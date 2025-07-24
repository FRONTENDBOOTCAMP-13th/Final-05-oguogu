'use client';
import CardItem from '@/components/elements/cardItem/cardItem';
import DeleteButton from '@/components/elements/DeleteButton/DeleteButton';
import { CheckButtonForMypage } from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import { deleteCart, deleteSelectCart, updateCart } from '@/shared/data/actions/cart';
import { createOrder } from '@/shared/data/actions/order';
import { getCart } from '@/shared/data/functions/cart';
import { useAuthStore } from '@/shared/store/authStore';
import { CartItem, CartResponse } from '@/shared/types/cart';
import { useEffect, useState } from 'react';

export default function CartClientControl() {
  const token = useAuthStore(state => state.token);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const allIds = cartItems.map(item => item._id);

  // 전체 선택을 위한 함수
  const handleSelectAll = () => {
    if (selectedItems.length === allIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allIds);
    }
  };

  // 체크 박스 선택하면 배열로 관리
  const toggleSelected = (_id: number) => {
    setSelectedItems(prev => (prev.includes(_id) ? prev.filter(itemId => itemId !== _id) : [...prev, _id]));
  };

  // 체크 유무를 확인해주는 함수
  const isSelected = (_id: number) => selectedItems.includes(_id);

  // 담은 총 가격
  const totalPrice = cartItems
    .filter(item => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // 주문 버튼 클릭시 보낼 주문 객체
  const orderItems = cartItems
    .filter(item => selectedItems.includes(item._id))
    .map(item => ({
      _id: item.product_id,
      quantity: item.quantity,
    }));

  // 주문하기 버튼
  const handleOrder = async () => {
    if (!token) return;
    const data = await createOrder(orderItems, token);
    if (data.ok) {
      alert('주문이 완료되었습니다.');
      // 주문 완료 후, 해당 상품 장바구니에서 제거
      for (const id of selectedItems) {
        await deleteCart(id, token);
      }

      // 장바구니 UI에서도 제거
      setCartItems(prev => prev.filter(item => !selectedItems.includes(item._id)));
      setSelectedItems([]);
    } else {
      alert(data.message);
      console.log(data);
    }
  };

  // 하위컴포넌트를 보내서 수량을 수정할수 있는 함수
  const updateQuntity = async (_id: number, quantity: number) => {
    if (!token) return;
    if (!_id) return;
    await updateCart(_id, { quantity: quantity }, token);

    setCartItems(prev => prev.map(item => (item._id === _id ? { ...item, quantity } : item)));
  };

  console.log('포함된 id 내역 : ', selectedItems);

  // 장바구니 삭제 함수
  const handleDelete = async (_id: number) => {
    if (!token) return;
    const data = await deleteCart(_id, token);

    if (data.ok) {
      alert('장바구니 내역을 삭제했습니다.');
      //상태에서도 제거
      setCartItems(prev => prev.filter(item => item._id !== _id));
      // 선택 상태에서도 제거
      setSelectedItems(prev => prev.filter(id => id !== _id));
    } else {
      alert(data.message);
      console.log(data);
    }
  };

  // 장바구니 전체 삭제 함수
  const handleDeleteAll = async () => {
    if (!token) return;

    const allIds = cartItems.map(item => item._id);
    const result = await deleteSelectCart(allIds, token);

    if (result.ok) {
      alert('장바구니를 모두 비웠습니다.');
      setCartItems([]); // UI에서 모두 제거
    } else {
      alert('삭제에 실패했습니다: ' + result.message);
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      const data: CartResponse = await getCart(token);
      setCartItems(data.item);
      console.log('data', data);
    };

    fetchCart();
  }, [token]);

  console.log(cartItems);

  const cartList = cartItems.map(item => (
    <CardItem
      key={item._id}
      item={item}
      onCheck={() => toggleSelected(item._id)}
      checked={isSelected(item._id)}
      quantity={item.quantity}
      updateQuantity={updateQuntity}
      handleDelete={handleDelete}
    />
  ));
  return (
    <>
      {/* 전체선택 및 삭제 버튼 */}
      <div className="flex justify-between gap-1">
        <CheckButtonForMypage
          name="cartGroup"
          type="selectAll"
          title="전체 선택"
          isChecked={selectedItems.length === allIds.length}
          selectAll={handleSelectAll}
        />
        <DeleteButton deleteAll={handleDeleteAll} />
      </div>

      {/* 주문 상세 내역: div 하위에 삼항연산자로 코드 작성 */}
      <div className="border-t border-t-oguogu-black pt-4 pb-[84px] flex flex-col justify-start items-center gap-8">
        {/* 아무런 데이터가 없는 경우 */}
        {cartItems.length === 0 && (
          <IsEmptyMessage
            title="장바구니에 담긴 상품이 없습니다."
            subTxt="원하는 상품을 장바구니에 담아보세요!"
            LinkTxt="쇼핑 계속하기 🥕"
          />
        )}

        {/* 데이터가 있는 경우 */}
        {cartList}
        <div className="fixed bottom-0 w-full min-w-[320px] max-w-[768px] h-[68px] bg-oguogu-white z-999 px-4 py-3 flex items-center ">
          <button
            onClick={handleOrder}
            disabled={selectedItems.length === 0}
            className={`flex flex-1 items-center justify-center text-center
                        text-[16px] h-[44px] px-[24px] py-[6px] rounded-[4px] w-[272px]
                          ${selectedItems.length === 0 ? 'bg-oguogu-gray-2 text-oguogu-black cursor-not-allowed' : 'bg-oguogu-main text-oguogu-white'}
                       `}
          >
            {selectedItems.length === 0
              ? '상품을 선택해주세요'
              : `${selectedItems.length}개 총 ${totalPrice.toLocaleString()}원 구매하기`}
          </button>
        </div>
      </div>
    </>
  );
}
