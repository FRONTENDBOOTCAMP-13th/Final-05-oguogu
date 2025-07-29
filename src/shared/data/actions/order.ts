const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 수정 혹은 삭제를 할때 user_id를 인증하는 토큰이 필요함 (현재 2번 유저 토큰으로 테스트 중)
/* const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjEzNzE5OCwiZXhwIjoxNzUyMjIzNTk4LCJpc3MiOiJGRUJDIn0.BddWCFVqtTtBPD9bKZw3KelLPJG3BZkn8FG3JU960us';
 */
// CHECKLIST
// [x] 상품 구매
// [x] 주문별 주문 상태 수정
// [x] 상품별 주문 상태 수정
// [x] 주문별 주문 상태 수정 (판매자)

// 1. 상품 구매
export async function createOrder(
  products: {
    _id: number;
    quantity: number;
  }[],
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
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

/* 사용 예시
  const res = await createOrder(
     [
      {
        "_id": 1,
        "quantity": 1
      },
      {
        "_id": 2,
        "quantity": 2
      }
    ]
  );
  console.log(res);
 */

// 2. 주문별 주문 상태 수정
export async function updateOrder(
  _id: number,
  update: {
    state: string; //코드명으로 설정해야함 ex OS110
    memo?: string;
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/orders/${_id}`, {
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
/* 사용예시 
  const res = await updateOrderProduct(3, {
    'state' : 'OS999',
    'memo' : '환불 요청 드립니다.'
  })
  console.log(res); 
*/

// 3. 상품별 주문 상태 수정

export async function updateOrderProduct(
  _id: number,
  product_id: number,
  update: {
    state: string; //코드명으로 설정해야함 ex OS110
    memo: string;
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/orders/${_id}/products/${product_id}`, {
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

/* 사용예시 
  const res = await updateOrderProduct(3, 2, {
    'state' : 'OS999',
    'memo' : '환불 요청 드립니다.'
  })
  console.log(res); 
*/

// 4. 주문별 주문 상태 수정 (판매자)
export async function updateOrderSeller(
  _id: number,
  update: {
    state: string; //코드명으로 설정해야함 ex OS110
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/seller/orders/${_id}`, {
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
    return { ok: 0, message: '주문 상태 수정에 실패했습니다.' };
  }
}
