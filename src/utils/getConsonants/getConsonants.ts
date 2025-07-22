// 한글 자음 추출 함수
export default function getConsonants(str: string) {
  const CHO = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ",
    "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
  ];
  return Array.from(str) // 문자열을 한 글자씩 쪼개기
    .map(char => {
      const code = char.charCodeAt(0) - 44032; // 한글 시작점 기준 위치 계산
      if (code >= 0 && code <= 11171) {
        return CHO[Math.floor(code / 588)]; // 초성 인덱스 계산
      }
      return char; // 한글이 아니면 그대로 반환
    })
    .join(""); // 결과 문자열로 합치기
}
