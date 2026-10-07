// src/components/ContactRow.tsx
// Info(ABOUT ME 카드)와 Contact 섹션에서 "아이콘 + 텍스트" 줄이 거의 동일하게 반복되어 공통화했습니다.
import type { ReactNode } from "react";

export function ContactRow({
  icon,
  href,
  children,
}: {
  icon: ReactNode;
  href?: string;
  children: ReactNode;
}) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href) {
    // 외부 사이트(https)는 새 탭으로 열고, 새 탭에서 이 페이지를 조작하지 못하도록 rel을 붙입니다.
    const external = href.startsWith("https://");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-3 text-label no-underline hover:text-strong"
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-3">{content}</div>;
}
