// import toast from 'react-hot-toast';

// export default function SetAccountBtn() {
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     /* 정보 미입력을 방지 */
//     if (!bank || !owner || !accountNum) {
//       toast.error('모든 항목을 입력해 주세요.');
//       return;
//     }

//     /* 데이터 없는 경우를 방지 */
//     if (!id || !token) {
//       toast.error('로그인이 필요합니다.');
//       return;
//     }

//     if (updateResult.ok) {
//       setRegisteredAccount(fullAccount, {
//         settlementAccount: accountNumber,
//         settlementOwner: owner,
//         settlementBank: bank,
//       });
//       toast.success('계좌가 등록되었습니다!');
//     } else {
//       toast.error(updateResult.message || '등록 실패');
//     }
//   };

//   return (
//     <button
//       type="submit"
//       onClick={handleSubmit}
//       className="w-full text-sm text-white rounded h-7 bg-oguogu-main hover:bg-oguogu-main-dark"
//     >
//       정산 계좌 등록
//     </button>
//   );
// }
