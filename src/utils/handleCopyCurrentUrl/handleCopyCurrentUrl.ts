import toast from 'react-hot-toast';

export const handleCopyUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.error('복사 완료');
  } catch (err) {
    console.error('URL 복사 실패:', err);
  }
};
