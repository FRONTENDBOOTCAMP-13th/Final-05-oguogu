import AccountForm from '@/components/elements/AccoutItem/AccountForm';
import GetLoggedInUserData from '@/features/getLoggedInUserData/getLoggedInUserData';

export default function AccountItem() {
  const settlementInfo = [
    { label: '정산 주기', value: '매월 10일' },
    { label: '정산 대상 기간', value: '2025.07.01 ~ 2025.07.31' },
    { label: '정산 계좌', value: '미등록' },
  ];

  return (
    <div className="flex flex-col justify-start min-h-screen gap-6 p-4">
      {/* 정산 금액 + 정보 */}
      <div>
        {/* 정산 금액 */}
        <section className="flex flex-col items-center gap-2 p-4 pb-8 text-base">
          <p>
            <GetLoggedInUserData type="name" />님의 7월 정산 예정 금액은
          </p>
          <p>
            <span className="text-2xl font-bold text-oguogu-main">8,354,980</span>
            <span className="text-2xl text-oguogu-black">원 입니다.</span>
          </p>
        </section>
        {/* 정산 정보 */}
        <section className="flex flex-col gap-2 pt-4 pb-4 text-xs border-t border-b border-oguogu-gray-2">
          {settlementInfo.map(({ label, value }) => (
            <div key={label} className="flex gap-1">
              <span className="text-oguogu-gray-4 min-w-[80px]">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </section>
      </div>

      {/* 정산 계좌 입력 폼 */}
      <AccountForm />
    </div>
  );
}
