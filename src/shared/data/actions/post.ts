const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 수정 혹은 삭제를 할때 user_id를 인증하는 토큰이 필요함 (현재 2번 유저 토큰으로 테스트 중)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjEzNzE5OCwiZXhwIjoxNzUyMjIzNTk4LCJpc3MiOiJGRUJDIn0.BddWCFVqtTtBPD9bKZw3KelLPJG3BZkn8FG3JU960us';

// CHECKLIST
// [x] 게시글 등록
// [x] 게시글 수정
// [x] 게시글 삭제
// [x] 댓글 등록
// [x] 댓글 수정
// [x] 댓글 삭제

// 1. 게시글 등록
export async function createPost(
  data: {
    type: 'qna' | 'notice' | 'farm' | 'faq';
    title?: string;
    content?: string;
    product_id?: number;
    image?: string;
    extra?: object;
  },
  token?: string,
) {
  try {
    const res = await fetch(`${API_URL}/posts`, {
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

// 2. 게시글 수정
export async function updatePost(
  _id: number,
  update: Partial<{
    title: string;
    content: string;
    image: string;
    extra: object;
  }>,
) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
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
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}

// 3. 게시글 삭제
export async function deletePost(_id: number) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
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
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}

// 4. 게시글 댓글 등록
export async function createPostReplies(
  _id: number,
  data: {
    content: string;
  },
) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies`, {
      method: 'POST',
      headers: {
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

// 5. 게시글 댓글 수정
export async function updatePostReplies(
  _id: number,
  reply_id: number,
  update: {
    content: string;
  },
) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies/${reply_id}`, {
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
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}

// 6. 게시글 댓글 삭제
export async function deletePostReplies(_id: number, reply_id: number) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies/${reply_id}`, {
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
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}
