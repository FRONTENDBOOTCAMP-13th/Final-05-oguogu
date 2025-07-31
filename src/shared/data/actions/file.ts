const API_URL = 'https://fesp-api.koyeb.app/market';
const CLIENT_ID = 'febc13-final05-emjf';

// 1. 파일 업로드
export async function uploadFile(formData: FormData) {
  const fileForm = new FormData();
  fileForm.append('attach', formData.get('attach') as File);

  try {
    const res = await fetch(`${API_URL}/files`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
      },
      body: fileForm,
    });

    return await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '파일 등록에 실패했습니다.' };
  }
}
