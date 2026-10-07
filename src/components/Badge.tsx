// src/components/Badge.tsx
// Projects의 태그 배지, TechStack의 스킬 배지가 똑같은 스타일을 반복 구현하고 있어서 공통화했습니다.
export function Badge({ children }: { children: string }) {
  return (
    <li className="rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-wide text-label">
      {children}
    </li>
  );
}
