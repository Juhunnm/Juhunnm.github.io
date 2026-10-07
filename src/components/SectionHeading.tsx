// src/components/SectionHeading.tsx
// 섹션마다 반복되는 라벨 스타일(ABOUT ME 같은 상단 캡션)을 공통 컴포넌트로 뺐습니다.
// headingId를 지정하면 상위 <section aria-labelledby={headingId}>와 연결해
// 스크린리더 랜드마크 목록에 섹션 제목이 그대로 노출됩니다.
export function SectionHeading({
  eyebrow,
  title,
  headingId,
}: {
  eyebrow: string;
  title: string;
  headingId?: string;
}) {
  return (
    <div className="mb-10">
      <span className="text-xs uppercase tracking-[0.16em] text-dim">
        {eyebrow}
      </span>
      <h2
        id={headingId}
        className="m-0 mt-2 text-3xl font-extrabold tracking-tight text-strong md:text-4xl"
      >
        {title}
      </h2>
    </div>
  );
}
