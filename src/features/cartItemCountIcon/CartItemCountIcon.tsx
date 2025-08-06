'use client';

import { useEffect, useState } from 'react';
import { getCart } from '@/shared/data/functions/cart';
import Link from 'next/link';
import { CartResponse } from '@/shared/types/cart';
import { useAuthStore } from '@/shared/store/authStore';

export default function CartItemCountIcon() {
  const token = useAuthStore(state => state.token);
  const [cartCount, setCartCount] = useState(0);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    const fetchCart = async () => {
      if (token === null) return;

      try {
        const data: CartResponse = await getCart(token ?? '');
        setCartCount(data.item.length);
      } catch (err) {
        console.log('에러 발생 :', err);
      }
    };

    fetchCart();
  }, [token]);

  return (
    <>
      <Link href={isLoggedIn ? `/mypage/cart` : `/login`} className="relative" aria-label="장바구니">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 11L14 20M19 11L15 4M2 11H22M3.5 11L5.1 18.4C5.1935 18.8586 5.44485 19.2698 5.81028 19.5621C6.17572 19.8545 6.63211 20.0094 7.1 20H16.9C17.3679 20.0094 17.8243 19.8545 18.1897 19.5621C18.5552 19.2698 18.8065 18.8586 18.9 18.4L20.6 11M4.5 15.5H19.5M5 11L9 4M9 11L10 20"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {cartCount > 0 ? (
          <span className="absolute bottom-0 right-0 bg-oguogu-main text-oguogu-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
            {cartCount > 99 ? '99' : cartCount}
          </span>
        ) : (
          ''
        )}
      </Link>
    </>
  );
}
