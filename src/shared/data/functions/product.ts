// 일반 회원 기준으로 상품 관련 기능 함수

const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// CHECKLIST
// [x] 전체 상품 목록 조회
// [x] 특정 상품 조회
// [x] 자신의 상품 목록 조회 (판매자 계정)

// 1. 전체 상품 목록 조회
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 상품 정보를 불러오는데 실패했습니다.' };
  }
}

/*
  const res = await getProducts();
  console.log(res); 
 */

// 2. 특정 상품 불러오기
export async function getProduct(_id: number) {
  try {
    const res = await fetch(`${API_URL}/products/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 상품 정보를 불러오는데 실패했습니다.' };
  }
}

// 2. 자신의 상품 목록 조회 (판매자 계정)
export async function getProductSeller(token: string) {
  try {
    const res = await fetch(`${API_URL}/seller/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 상품 정보를 불러오는데 실패했습니다.' };
  }
}
