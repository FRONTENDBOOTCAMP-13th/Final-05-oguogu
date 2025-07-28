const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 1. 등록된 이미지 링크 가져오기
export async function getfileName(fileName: string) {
  try {
    const res = await fetch(`${API_URL}/${fileName}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    // 바이너리 파일로 읽기 (blob 사용)
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 오류로 이미지 파일을 읽어오지 못했습니다.' };
  }
}
