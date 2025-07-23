'use client';
import CardItem from '@/components/elements/cardItem/cardItem';
import DeleteButton from '@/components/elements/DeleteButton/DeleteButton';
import { CheckButtonForMypage } from '@/components/elements/InputButtonForMypage/InputButtonForMypage';
import IsEmptyMessage from '@/components/elements/IsEmptyMessage/IsEmptyMessage';
import { updateCart } from '@/shared/data/actions/cart';
import { getCart } from '@/shared/data/functions/cart';
import { useAuthStore } from '@/shared/store/authStore';
import { CartItem, CartResponse } from '@/shared/types/cart';
import { useEffect, useState } from 'react';

export default function CartClientControl() {
  const token = useAuthStore(state => state.token);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const allIds = cartItems.map(item => item._id);

  const handleSelectAll = () => {
    if (selectedItems.length === allIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allIds);
    }
  };

  const toggleSelected = (_id: number) => {
    setSelectedItems(prev => (prev.includes(_id) ? prev.filter(itemId => itemId !== _id) : [...prev, _id]));
  };

  const isSelected = (_id: number) => selectedItems.includes(_id);

  const totalPrice = cartItems
    .filter(item => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // 주문 버튼 클릭시 보낼 주문 객체
  /* const orderItems = cartItems
    .filter(item => selectedItems.includes(item._id))
    .map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
    })); */

  const updateQuntity = async (_id: number, quantity: number) => {
    if (!token) return;
    if (!_id) return;
    await updateCart(_id, { quantity: quantity }, token);

    setCartItems(prev => prev.map(item => (item._id === _id ? { ...item, quantity } : item)));
  };

  console.log('포함된 id 내역 : ', selectedItems);

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
        <DeleteButton />
      </div>

      {/* 주문 상세 내역: div 하위에 삼항연산자로 코드 작성 */}
      <div className="border-t border-t-oguogu-black pt-4 pb-[84px] flex flex-col justify-start items-center gap-8">
        {/* 아무런 데이터가 없는 경우 */}
        <IsEmptyMessage
          title="장바구니에 담긴 상품이 없습니다."
          subTxt="원하는 상품을 장바구니에 담아보세요!"
          LinkTxt="쇼핑 계속하기 🥕"
        />

        {/* 데이터가 있는 경우 */}
        {cartList}
        <div className="fixed bottom-0 w-full min-w-[320px] max-w-[768px] h-[68px] bg-oguogu-white z-999 px-4 py-3 flex items-center ">
          <button
            className={`flex flex-1 items-center justify-center text-center
         bg-oguogu-main text-oguogu-white 
         text-[16px] h-[44px]
         px-[24px] py-[6px] rounded-[4px] w-[272px] `}
          >
            {`${selectedItems.length}개 총 ${totalPrice.toLocaleString()}원 구매하기`}
          </button>
        </div>
      </div>
    </>
  );
}
