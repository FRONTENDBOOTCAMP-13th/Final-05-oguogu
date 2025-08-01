/* 판매자 계좌 정보 */
// prettier-ignore
export interface UserAccoutType {
  ok: 0 | 1;                                                // 데이터 정상 통신 여부
  item: UserAccountExtraType;                               // 전달 받는 데이터
}

// prettier-ignore
export interface UserAccountExtraType {
  extra: {
    accountInfo: {
      settlementBank: string;                                 // 정산 은행
      settlementOwner: string;                                // 계좌 소유주
      settlementAccount: string;                              // 계좌 번호
    }
  };
}
