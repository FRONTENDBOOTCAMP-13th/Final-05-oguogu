/**
 * 뒤로가기 버튼에 사용되는 함수
 * @description 사용자가 URL을 직접 입력해서 접속한 경우, Header 의 뒤로가기(<) 버튼을 클릭했을 때 사이트 외부로 이동하는 것을 방지
 * @returns void
 */
function handleGoBack(): void {
  if (
    document.referrer.startsWith('https://final-05-oguogu.vercel.app/') ||
    document.referrer.startsWith('http://localhost:3000/')
  ) {
    window.history.back();
  } else {
    window.location.href = '/'; // 홈 또는 원하는 내부 경로
  }
}

export default handleGoBack;
