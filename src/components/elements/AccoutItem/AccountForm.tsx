'use client';

import { updateUser } from '@/shared/data/actions/user';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AccountFormProps {
  id: number;
  token: string;
  setRegisteredAccount?: (
    account: string,
    extraUpdates: {
      settlementAccount: string;
      settlementOwner: string;
      settlementBank: string;
    },
  ) => void;
  onCancel?: () => void;
}

export default function AccountForm({ id, token }: AccountFormProps) {
  const [bank, setBank] = useState('');
  const [owner, setOwner] = useState('');
  const [accountNum, setAccountNum] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* 정보 미입력을 방지 */
    if (!bank || !owner || !accountNum) {
      toast.error('모든 항목을 입력해 주세요.');
      return;
    }

    /* 데이터 없는 경우를 방지 */
    if (!id || !token) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    await updateUser(id, { extra: { accountBank: bank, accountOwner: owner, accountNum: accountNum } }, token);
    toast.success('계좌 등록 성공');
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="min-w-[320px] w-full p-4 space-y-4 bg-white border border-oguogu-gray-2 rounded-lg drop-shadow"
      >
        {/* 은행 선택 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="bank">
            은행<sup className="text-[10px]">*</sup>
          </label>
          <select
            id="bank"
            name="accountBank"
            onChange={e => setBank(e.target.value)}
            className="text-sm text-center border rounded h-7 border-oguogu-gray-2 text-oguogu-gray-4"
            required
          >
            <option value="">은행 선택</option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="하나은행">하나은행</option>
            <option value="카카오뱅크">카카오뱅크</option>
            <option value="농협">농협</option>
            <option value="기업은행">기업은행</option>
          </select>
        </div>

        {/* 계좌주 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="owner">
            계좌주<sup className="text-[10px]">*</sup>
          </label>
          <input
            id="owner"
            name="accoutOwner"
            type="text"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            placeholder="실제 계좌를 소유한 사람의 이름을 입력해 주세요"
            className="w-full h-[36px] font-normal text-[14px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2"
          />
        </div>

        {/* 계좌번호 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="accountNumber">
            계좌번호<sup className="text-[10px]">*</sup>
          </label>
          <input
            id="accountNumber"
            name="accoutNum"
            type="text"
            placeholder="- 를 제외한 숫자만 입력해 주세요"
            value={accountNum}
            onChange={e => setAccountNum(e.target.value)}
            className="w-full h-[36px] font-normal text-[14px] pl-2 py-3 border-b border-oguogu-gray-2 placeholder-oguogu-gray-2"
          />
        </div>

        {/* 버튼 */}
        <section className="flex items-center justify-center gap-2">
          <button
            type="submit"
            className="w-full text-sm text-white rounded h-7 bg-oguogu-main hover:bg-oguogu-main-dark"
          >
            정산 계좌 등록
          </button>
          {/* {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-gray-2 bg-oguogu-white hover:bg-oguogu-gray-1"
            >
              취소
            </button>
          )} */}
        </section>
      </form>
    </div>
  );
}
