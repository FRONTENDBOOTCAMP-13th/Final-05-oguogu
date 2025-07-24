const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 수정 혹은 삭제를 할때 user_id를 인증하는 토큰이 필요함 (현재 2번 유저 토큰으로 테스트 중)
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjEzNzE5OCwiZXhwIjoxNzUyMjIzNTk4LCJpc3MiOiJGRUJDIn0.BddWCFVqtTtBPD9bKZw3KelLPJG3BZkn8FG3JU960us';

// CHECKLIST
// [x] 장바구니에 상품 추가
// [x] 장바구니 상품 수량 수정
// [x] 장바구니 상품 여러건 삭제
// [x] 장바구니 상품 한건 삭제
// [] 장바구니 비우기 => 성공했다고 리턴은 오는데 실제로 비워지지는 않음
// [x] 장바구니 합치기 (수량 추가)
// [] 장바구니 상품 전체 교체 => 성공 리턴은 오는데 변화가 없음

// 1. 장바구니에 상품 추가
export async function createCart(data: { product_id: number; quantity: number }, token: string) {
  try {
    const res = await fetch(`${API_URL}/carts`, {
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

// 2. 장바구니에 상품 수량 수정
export async function updateCart(
  _id: number,
  data: {
    quantity: number;
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/carts/${_id}`, {
      method: 'PATCH',
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

// 3. 장바구니에 상품 한건 삭제
export async function deleteCart(_id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/carts/${_id}`, {
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

// 3. 장바구니에 상품 여러건 삭제
export async function deleteSelectCart(carts: number[], token: string) {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify({ carts }),
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}

// 4. 장바구니 비우기
export async function cleanupCart(token: string) {
  try {
    const res = await fetch(`${API_URL}/carts/cleanup`, {
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

// 5. 장바구니 합치기 (기존에 등록된 상품에서 수량 추가 가능)
export async function addCart(
  products: {
    _id: number;
    quantity: number;
  }[],
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify({ products }),
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}

// 5. 장바구니 상품 전체 교체
export async function replaceCart(
  products: {
    _id: number;
    quantity: number;
  }[],
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify({ products }),
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '회원 등록에 실패했습니다.' };
  }
}
