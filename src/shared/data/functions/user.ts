const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// CHECKLIST
// [x] 전체 회원 목록 조회
// [x] ID로 회원 검색
// [x] 이메일 중복 여부 확인
// [x] 이름 중복 여부 확인
// [x] 특정 회원의 특정 정보 조회

// 1. 전체 회원 목록 조회
export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 회원 정보를 불러오는데 실패했습니다.' };
  }
}

// 2. ID로 회원 검색
export async function getUser(_id: number) {
  try {
    const res = await fetch(`${API_URL}/users/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 회원 정보를 불러오는데 실패했습니다.' };
  }
}

// 3. 이메일 중복 여부 확인 [중복되면 ok = 0 없다면 ok = 1]
export async function getCheckEmailExists(email: string) {
  try {
    const res = await fetch(`${API_URL}/users/email?email=${email}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 이메일 확인에 실패했습니다.' };
  }
}

// 4. 이름 중복 여부 확인 [중복되면 ok = 0 없다면 ok = 1]
export async function getCheckNameExists(name: string) {
  try {
    const res = await fetch(`${API_URL}/users/name?name=${name}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 이름 확인에 실패했습니다.' };
  }
}

// 5. 특정 회원의 특정 정보 조회 (예: extra, name, address, type)
export async function getUserDetail(_id: number, field: string) {
  try {
    const res = await fetch(`${API_URL}/users/${_id}/${field}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '회원 세부정보를 불러오는 데 실패했습니다.' };
  }
}
