// src/components/icons.tsx
// lucide-react 등 아이콘 라이브러리 대신 인라인 SVG로 직접 그립니다 (새 의존성 추가 금지 규칙).
import type { SVGProps } from "react";

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
      aria-hidden="true"
      {...props}
    >
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
      aria-hidden="true"
      {...props}
    >
      <rect x={3} y={5} width={18} height={16} rx={2} />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={28}
      height={28}
      aria-hidden="true"
      {...props}
    >
      <rect x={3} y={4} width={18} height={16} rx={2} />
      <circle cx={9} cy={10} r={1.75} />
      <path d="m5 18 5.5-5.5a2 2 0 0 1 2.8 0L19 18" />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={28}
      height={28}
      aria-hidden="true"
      {...props}
    >
      <circle cx={12} cy={8} r={4} />
      <path d="M4 21c0-4.2 3.8-7 8-7s8 2.8 8 7" />
    </svg>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={18}
      height={18}
      aria-hidden="true"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={18}
      height={18}
      aria-hidden="true"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
      aria-hidden="true"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={14}
      height={14}
      aria-hidden="true"
      {...props}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
