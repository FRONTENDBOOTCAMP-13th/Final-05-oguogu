interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 상품 상세 페이지의 루트 레이아웃 컴포넌트
 *
 * - QnA 및 리뷰 데이터를 가져와 카테고리 헤더 및 카운트 정보를 제공합니다.
 * - 하위 섹션(children)을 포함합니다.
 *
 * @param {LayoutProps} props - 레이아웃 컴포넌트의 props
 * @param {Promise<{ _id: string }>} props.params - URL 파라미터 (_id)
 * @param {React.ReactNode} props.children - 내부 콘텐츠
 */

export default function RootLayout({ children }: LayoutProps) {
  return <div className="min-w-[320px] max-w-[768px] mx-auto relative bg-oguogu-white z-50">{children}</div>;
}
