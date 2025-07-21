const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 수정 혹은 삭제를 할때 user_id를 인증하는 토큰이 필요함 (현재 2번 유저 토큰으로 테스트 중)
/* const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjEzNzE5OCwiZXhwIjoxNzUyMjIzNTk4LCJpc3MiOiJGRUJDIn0.BddWCFVqtTtBPD9bKZw3KelLPJG3BZkn8FG3JU960us';
 */
// CHECKLIST
// [x] 북마크 추가
// [x] 북마크 삭제

// 1. 북마크 추가
export async function createBookmark(
  data: {
    target_id: number;
    memo?: string;
    extra?: { type: string };
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product`, {
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
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}

// 2. 북마크 삭제
export async function deleteBookmark(
  _id: number,
  data = {
    target_id: 'any',
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/bookmarks/${_id}`, {
      method: 'DELETE',
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
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}
