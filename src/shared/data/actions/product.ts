import { Extra, Item, MainImage } from '@/shared/types/product';

const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmViYzEzLWZpbmFsMDUtZW1qZi91c2VyLW5lby5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MjEzNzE5OCwiZXhwIjoxNzUyMjIzNTk4LCJpc3MiOiJGRUJDIn0.BddWCFVqtTtBPD9bKZw3KelLPJG3BZkn8FG3JU960us';

// CHECKLIST
// [x] 상품 등록
// [x] 상품 수정
// [x] 상품 삭제

//  1. 상품 등록
export async function createProduct(
  data: {
    price: number;
    quantity: number;
    name: string;
    content: string;
    shippingFees?: number;
    mainImages?: MainImage[];
    show?: boolean;
    extra?: Extra;
  },
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/seller/products`, {
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

//  2. 상품 수정 [일단 토큰은 하드코딩되어 있는 상태 추후 zustand store에서 관리해야 합니다.]
export async function updateProduct(_id: number, update: Partial<Item>, token: string) {
  try {
    const res = await fetch(`${API_URL}/seller/products/${_id}`, {
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
    return { ok: 0, message: '상품 수정에 실패했습니다.' };
  }
}

//  3. 상품 삭제 [실패 ok 리턴은 오는데 실제 db에서 삭제가 안됨]
export async function deleteProduct(_id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/seller/products/${_id}`, {
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
    return { ok: 0, message: '상품 수정에 실패했습니다.' };
  }
}
