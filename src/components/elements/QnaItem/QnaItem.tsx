"use client";
import { getPostReplies } from "@/shared/data/functions/post";
import { responsePostReplies } from "@/shared/types/post";
import type { QnaItem } from "@/shared/types/qna";
import { useState } from "react";

interface QnaItemProps {
  state: boolean; // 답변 완료 여부
  isPrivate: boolean; // 나만 보기 여부 (비밀모드 조건)
  // 현재 보는 사람의 역할 (일단 3가지로 나눠서 진행했는데 아래 과정이 필요)
  /*
    1. 전역 상태(Zustand)에서 로그인 유저 _id 가져오기
    2. API 리턴 리뷰 데이터에서 작성자 _id 추출
    3. 로그인 유저가 작성자면 'owner'
       판매자면 'seller'
       둘 다 아니면 'other'
   */
  viewerRole: "owner" | "seller" | "other";
  res: QnaItem;
}

export default function QnaItem({ state = false, isPrivate = false, viewerRole = "other", res }: QnaItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [fetched, setFetched] = useState(false);
  const [date, setDate] = useState("");

  const handleContent = async () => {
    if (fetched || !state) return; // 답변 없으면 호출 안 함
    const data: responsePostReplies = await getPostReplies(res._id);

    if (data.ok) {
      setContent(data.item[0].content);
      setDate(data.item[0].createdAt);
      setFetched(true);
    } else {
      console.error(data.message);
    }
  };

  const toggleOpen = () => {
    const nextOpen = !isOpen;
    setIsOpen(!isOpen);
    if (nextOpen) handleContent(); // 열릴 때만 fetch 시도
  };

  // 이름 *표로 변환해주는 함수
  function maskName(name: string): string {
    if (!name) return "";
    if (name.length <= 2) return name; // 두 글자 이하면 마스킹 생략

    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
  }

  // 이메일 *표로 변환해주는 함수
  function maskEmail(email: string): string {
    if (!email) return "";
    const atIndex = email.indexOf("@");
    const prefix = atIndex !== -1 ? email.slice(0, atIndex) : email;
    const visible = prefix.slice(0, 3);
    const hidden = "*".repeat(Math.max(prefix.length - 3, 1));
    return visible + hidden;
  }

  const stateColor = state ? "main" : "black";
  const stateBgColor = isOpen ? "main-light" : "white";

  // 접근 허용 조건 (비밀모드가 아니거나, 비밀모드여도 글쓴이거나, 관리자(판매자)인 경우 접근 허용)
  const isViewerAllowed = !isPrivate || viewerRole === "owner" || viewerRole === "seller";

  return (
    <div className={`p-4 bg-oguogu-${stateBgColor} border-t border-oguogu-gray-1 shadow-sm`}>
      <div onClick={toggleOpen} className="cursor-pointer flex flex-col gap-3">
        <div className="flex justify-between">
          <span className={`text-oguogu-${stateColor} flex items-center gap-1`}>
            {isPrivate && (
              <svg
                className="relative top-[-2px]"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
              >
                <path
                  d="M1.5 16C1.0875 16 0.7345 15.8509 0.441 15.5528C0.1475 15.2546 0.0005 14.8957 0 14.4762V6.85714C0 6.4381 0.147 6.07949 0.441 5.78133C0.735 5.48317 1.088 5.33384 1.5 5.33333H2.25V3.80952C2.25 2.75556 2.61575 1.85727 3.34725 1.11467C4.07875 0.372064 4.963 0.000508457 6 5.20071e-07C7.037 -0.000507416 7.9215 0.371048 8.6535 1.11467C9.3855 1.85829 9.751 2.75657 9.75 3.80952V5.33333H10.5C10.9125 5.33333 11.2657 5.48267 11.5597 5.78133C11.8537 6.08 12.0005 6.4386 12 6.85714V14.4762C12 14.8952 11.8532 15.2541 11.5597 15.5528C11.2662 15.8514 10.913 16.0005 10.5 16H1.5ZM1.5 14.4762H10.5V6.85714H1.5V14.4762ZM6 12.1905C6.4125 12.1905 6.76575 12.0414 7.05975 11.7432C7.35375 11.4451 7.5005 11.0862 7.5 10.6667C7.4995 10.2471 7.35275 9.88851 7.05975 9.59086C6.76675 9.29321 6.4135 9.14387 6 9.14286C5.5865 9.14184 5.2335 9.29117 4.941 9.59086C4.6485 9.89054 4.5015 10.2491 4.5 10.6667C4.4985 11.0842 4.6455 11.443 4.941 11.7432C5.2365 12.0434 5.5895 12.1925 6 12.1905ZM3.75 5.33333H8.25V3.80952C8.25 3.1746 8.03125 2.63492 7.59375 2.19048C7.15625 1.74603 6.625 1.52381 6 1.52381C5.375 1.52381 4.84375 1.74603 4.40625 2.19048C3.96875 2.63492 3.75 3.1746 3.75 3.80952V5.33333Z"
                  fill="#969696"
                />
              </svg>
            )}{" "}
            {state ? "답변 완료" : "답변 대기 중"}
            {/* 잠금 표시 */}
          </span>
          <span className="text-[12px] text-oguogu-gray-4">{res.createdAt.split(" ")[0]}</span>
        </div>

        {isViewerAllowed ? (
          <div>
            <p className="text-[16px] text-oguogu-black">{res.title}</p>
            <p className="text-[12px] text-oguogu-gray-4">{res.content}</p>
          </div>
        ) : (
          <div className="text-[16px] text-oguogu-gray-3">[배송] 비밀글입니다.</div>
        )}

        <div className="flex gap-3">
          <p className="text-[12px] text-oguogu-black">{maskName(res.user.name)}</p>
          <p className="text-[12px] text-oguogu-black">({maskEmail(res.user.email || "")})</p>
        </div>
      </div>

      {/* 조건: 답변 있음 && 열림 상태 && 보기 권한 있음 */}
      {state && isOpen && isViewerAllowed && (
        <div className="mt-4 pt-4 border-t-1 border-oguogu-gray-4">
          <div className="flex justify-between mb-2">
            <span className="text-[12px] text-oguogu-black">상품 담당자</span>
            <span className="text-[12px] text-oguogu-gray-4">{date.split(" ")[0]}</span>
          </div>
          {content
            .split(".")
            .filter(Boolean)
            .map((line, i) => (
              <div key={i}>
                <p className="whitespace-pre-wrap break-words text-[12px] leading-[100%] text-oguogu-gray-4">
                  {line.trim()}.
                </p>
                <br />
              </div>
            ))}
        </div>
      )}

      {!state && isOpen && isViewerAllowed && (
        <div className="mt-4 pt-4 border-t-1 border-oguogu-gray-4">
          <p className="text-[12px] text-oguogu-gray-3">이 질문은 아직 답변을 기다리는 중입니다.</p>
        </div>
      )}

      {/* 열렸지만 권한 없는 경우 안내 */}
      {state && isOpen && !isViewerAllowed && (
        <div className="mt-4 pt-4 border-t-1 border-oguogu-gray-4">
          <p className="text-[12px] text-oguogu-gray-3">이 질문은 비공개로 설정되어 있어 열람할 수 없습니다.</p>
        </div>
      )}
    </div>
  );
}
