const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 일반 유저 (2번) 인증 토큰
/* const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjE5NzI0OCwiZXhwIjoxNzUyMjgzNjQ4LCJpc3MiOiJGRUJDIn0.9LIJV9KkT_099ySlrNebTDe4QoS-yXvqRZskBVMpyns';
 */
// CHECKLIST
// [x] 구매 목록 조회
// [x] 구매 목록의 상태값 조회
// [x] 구매 상세 조회
// [x] 주문 목록 조회 (판매자)

// 1. 구매 목록 조회
export async function getOrders(token: string) {
  try {
    const res = await fetch(`${API_URL}/orders`, {
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

// 2. 구매 목록의 상태값 조회
export async function getOrderState({ token }: { token: string }) {
  try {
    const res = await fetch(`${API_URL}/orders/state`, {
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

// 3. 구매 상세 조회
export async function getOrder(_id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/orders/${_id}`, {
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

// 4. 주문 목록 조회 (판매자)
export async function getOrdersSeller(token: string) {
  try {
    const res = await fetch(`${API_URL}/seller/orders`, {
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
