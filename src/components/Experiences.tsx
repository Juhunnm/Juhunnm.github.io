// src/components/Experiences.tsx
// 실무/활동 경험을 이력서 형태의 요약 리스트로 보여줍니다.
// Timeline(전체 연표)과 데이터는 같지만, 여기서는 experience 항목만 간결하게 요약합니다.
import { experiences } from "../data/timeline";
import { SectionHeading } from "./SectionHeading";

export function Experiences() {
  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="mx-auto max-w-4xl py-24">
      <SectionHeading
        eyebrow="Career"
        title="Experiences"
        headingId="experiences-heading"
      />

      <ul className="m-0 flex list-none flex-col gap-0 p-0">
        {experiences.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-1 border-b border-white/10 py-6 last:border-none md:flex-row md:items-baseline md:justify-between md:gap-6"
          >
            <h3 className="m-0 text-base font-bold text-strong md:max-w-[70%]">
              {item.title}
            </h3>
            <span className="shrink-0 text-xs tracking-widest text-dim">
              {item.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
