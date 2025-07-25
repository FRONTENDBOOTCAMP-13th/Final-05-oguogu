const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// CHECKLIST
// [x] 타입별 게시글 조회
// [x] 게시글 상세 조회
// [x] 댓글 목록
// [ ] 내가 작성한 게시글 목록
// [ ] 지정한 사용자가 작성한 게시글 목록
// [ ] 판매자의 상품에 등록괸 게시글 목록

// 1. 타입별 게시글 조회 ex : getPosts('notice')
export async function getPosts(type: string, token?: string) {
  try {
    const res = await fetch(`${API_URL}/posts?type=${type}`, {
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

// 2. 게시글 상세 조회
export async function getPost(_id: number) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
      headers: {
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

// 3. 댓글 목록
export async function getPostReplies(_id: number) {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies`, {
      headers: {
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
