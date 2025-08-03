'use client';

import { useRouter } from 'next/navigation';

export default function OrderSuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[85%] rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
        <div className="text-4xl">🧺</div>
        <p className="text-base  text-oguogu-black">주문이 완료되었어요!</p>
        <p className="text-sm text-oguogu-gray-4">주문 내역을 확인하시겠어요, 아니면 쇼핑을 계속할까요?</p>
        <div className="flex flex-col gap-2 w-full mt-4">
          <button
            onClick={() => router.push('/mypage/order')}
            className="bg-oguogu-main text-white text-sm  py-3 rounded-xl shadow hover:opacity-90 transition"
          >
            주문 내역 확인하기
          </button>
          <button
            onClick={onClose}
            className="border border-oguogu-main text-oguogu-main text-sm  py-3 rounded-xl hover:bg-oguogu-main/10 transition"
          >
            계속 쇼핑하기
          </button>
        </div>
      </div>
    </div>
  );
}
