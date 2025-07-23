const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// CHECKLIST
// [x] 장바구니 목록 조회 - 로그인

// 1. 장바구니 목록 조회
export async function getCart(token: string) {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 로드에 실패했습니다.' };
  }
}
