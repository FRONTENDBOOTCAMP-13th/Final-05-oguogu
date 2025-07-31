const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 일반 유저 (2번) 인증 토큰
/* const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjE5NzI0OCwiZXhwIjoxNzUyMjgzNjQ4LCJpc3MiOiJGRUJDIn0.9LIJV9KkT_099ySlrNebTDe4QoS-yXvqRZskBVMpyns';
 */
// CHECKLIST
// [x] 구매 후기 등록
// [x] 구매 후기 수정
// [x] 구매 후기 삭제

//  1. 구매 후기 등록
export async function createReplie(
  data: {
    order_id: number;
    product_id: number;
    rating?: number;
    content: string;
    extra?: { name: string; imagePath?: string | null };
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/replies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '등록 실패했습니다.' };
  }
}

// 2. 구매 후기 수정
export async function updateReplie(
  _id: number,
  update: Partial<{
    rating: number;
    content: string;
    extra: object;
  }>,
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/replies/${_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(update),
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '등록 실패했습니다.' };
  }
}

// 3. 구매 후기 삭제
export async function deleteReplie(_id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/replies/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '등록 실패했습니다.' };
  }
}
