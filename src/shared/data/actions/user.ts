const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 일반 유저 (2번) 인증 토큰
// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjE5NzI0OCwiZXhwIjoxNzUyMjgzNjQ4LCJpc3MiOiJGRUJDIn0.9LIJV9KkT_099ySlrNebTDe4QoS-yXvqRZskBVMpyns';

// CHECKLIST
// [x] 회원 가입
// [x] 로그인
// [x] 회원 정보 수정

// 1. 회원 가입
// data 양식에 맞게 입력을 하면 회원 가입이 진행됨. 현재 객체로 정의 되어있는데 추후에 form으로 바로 넘어오도록 수정 필요함.
export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address: string;
  type: 'user' | 'seller' | 'admin';
  extra?: object; // 타입별 유동적 구조
}) {
  try {
    const res = await fetch(`${API_URL}/users`, {
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

// 2. 로그인
export async function loginUser(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
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
    return { ok: 0, message: '회원 정보가 없습니다.' };
  }
}

// 3. 회원 정보 수정
export async function updateUser(
  _id: number,
  update: Partial<{
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
    extra: object;
  }>,
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/users/${_id}`, {
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
    return { ok: 0, message: '회원 정보가 없습니다.' };
  }
}
