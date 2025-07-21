export const handleCopyUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('현재 URL을 복사 완료했다구🙂');
  } catch (err) {
    console.error('URL 복사 실패:', err);
  }
};
