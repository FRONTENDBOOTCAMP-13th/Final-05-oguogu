'use client';

import LoginInput from '@/components/elements/LoginItem/LoginInput';
import { updateUser } from '@/shared/data/actions/user';
import { useAuthStore } from '@/shared/store/authStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AccountFormProps {
  setRegisteredAccount: (
    account: string,
    extraUpdates: {
      settlementAccount: string;
      settlementOwner: string;
      settlementBank: string;
    },
  ) => void;
  onCancel?: () => void;
}

export default function AccountForm({ setRegisteredAccount, onCancel }: AccountFormProps) {
  const [bank, setBank] = useState('');
  const [owner, setOwner] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const { userInfo, token } = useAuthStore(state => ({
    userInfo: state.userInfo,
    token: state.token,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bank || !owner || !accountNumber) {
      toast.error('모든 항목을 입력해 주세요.');
      return;
    }

    const fullAccount = `${bank} ${accountNumber}`;

    if (!userInfo || !token) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    setLoading(true); // ✅ 로딩 시작

    const updateResult = await updateUser(
      userInfo._id,
      {
        extra: {
          ...userInfo.extra, // 기존 extra 정보 유지
          settlementAccount: accountNumber,
          settlementOwner: owner,
          settlementBank: bank,
        },
      },
      token,
    );

    console.log('[계좌 등록 응답]', updateResult);
    console.log('[디버그] 유저 ID:', userInfo?._id);
    console.log('[디버그] 등록할 계좌 정보:', {
      settlementAccount: accountNumber,
      settlementOwner: owner,
      settlementBank: bank,
    });
    console.log('[디버그] 토큰:', token);

    if (updateResult.ok) {
      setRegisteredAccount(fullAccount, {
        settlementAccount: accountNumber,
        settlementOwner: owner,
        settlementBank: bank,
      });
      toast.success('계좌가 등록되었습니다!');
    } else {
      toast.error(updateResult.message || '등록 실패');
    }
    setLoading(false); // ✅ 로딩 종료
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="min-w-[320px] w-full p-4 space-y-4 bg-white border border-oguogu-gray-2 rounded-lg drop-shadow"
      >
        {/* 은행 선택 */}
        <div className="flex flex-col">
          <label htmlFor="bank">
            은행<sup className="text-[10px]">*</sup>
          </label>
          <select
            id="bank"
            value={bank}
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
        <div className="flex flex-col">
          <label htmlFor="owner">
            계좌주<sup className="text-[10px]">*</sup>
          </label>
          {/* <LoginInput
            id="owner"
            type="text"
            placeholder="실제 계좌를 소유한 사람의 이름을 입력해 주세요"
            value={owner}
            onChange={setOwner}
          /> */}
        </div>

        {/* 계좌번호 */}
        <div className="flex flex-col">
          <label htmlFor="accountNumber">
            계좌번호<sup className="text-[10px]">*</sup>
          </label>
          {/* <LoginInput
            id="accountNumber"
            type="text"
            value={accountNumber}
            onChange={setAccountNumber}
            placeholder="-를 제외한 숫자만 입력해 주세요"
          /> */}
        </div>

        {/* 버튼 */}
        <section className="flex items-center justify-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm text-white rounded h-7 bg-oguogu-main hover:bg-oguogu-main-dark"
          >
            {loading ? '등록 중...' : '정산 계좌 등록'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-sm border rounded h-7 text-oguogu-black border-oguogu-gray-2 bg-oguogu-white hover:bg-oguogu-gray-1"
            >
              취소
            </button>
          )}
        </section>
      </form>
    </div>
  );
}
