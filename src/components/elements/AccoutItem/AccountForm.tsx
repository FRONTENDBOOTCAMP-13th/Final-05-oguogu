'use client';

import LoginInput from '@/components/elements/LoginItem/LoginInput';
import { useState } from 'react';

export default function AccountForm() {
  const [bank, setBank] = useState('');
  const [owner, setOwner] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  return (
    <div className="flex items-center justify-center p-4">
      <div className="min-w-[320px] w-full p-4 space-y-4 bg-white border border-oguogu-gray-2 rounded-lg drop-shadow">
        {/* 은행 선택 */}
        <div className="flex flex-col">
          <label htmlFor="bank">
            은행<sup className="text-[10px]">*</sup>
          </label>
          <select
            id="bank"
            value={bank}
            onChange={e => setBank(e.target.value)}
            className="text-xs text-center border rounded h-7 border-oguogu-gray-2 text-oguogu-gray-4"
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
        <div className="flex flex-col">
          <label htmlFor="owner">
            계좌주<sup className="text-[10px]">*</sup>
          </label>
          <LoginInput
            id="owner"
            type="text"
            placeholder="실제 계좌를 소유한 사람의 이름을 입력해 주세요"
            value={owner}
            onChange={setOwner}
          />
        </div>

        {/* 계좌번호 */}
        <div className="flex flex-col">
          <label htmlFor="accountNumber">
            계좌번호<sup className="text-[10px]">*</sup>
          </label>
          <LoginInput
            id="accountNumber"
            type="text"
            value={accountNumber}
            onChange={setAccountNumber}
            placeholder="-를 제외한 숫자만 입력해 주세요"
          />
        </div>

        <section className="flex justify-center items-center gap-2 text-[12px]">
          <button
            onClick={() => {
              console.log({ bank, owner, accountNumber });
              if (!bank || !owner || !accountNumber) {
                alert('모든 항목을 입력해 주세요.');
                return;
              }
              alert('계좌가 등록되었습니다!');
            }}
            className="w-full mt-2 text-xs text-white rounded h-7 bg-oguogu-main hover:bg-oguogu-main-dark"
          >
            정산 계좌 등록
          </button>
          <button className="w-full mt-2 text-xs border rounded h-7 text-oguogu-black border-oguogu-gray-2 bg-oguogu-white hover:bg-oguogu-gray-1">
            취소
          </button>
        </section>
      </div>
    </div>
  );
}
