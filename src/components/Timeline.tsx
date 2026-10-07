// src/components/Timeline.tsx
import { timeline } from "../data/timeline";

export function Timeline() {
  return (
    <section id="timeline" aria-labelledby="timeline-heading" className="py-24">
      <h2 id="timeline-heading" className="sr-only">
        Timeline
      </h2>

      {/*
        1. ol 자체를 기준으로 가운데 세로선(before)을 left-1/2 + -translate-x-1/2로 긋습니다.
        2. 각 li도 ol과 동일한 폭(기본 100%)을 그대로 쓰고, 점(dot)을 li 기준 left-1/2 +
           -translate-x-1/2로 둡니다. "같은 폭의 요소에서 같은 방식(left-1/2 -translate-x-1/2)으로
           중앙을 잡는다"는 원칙만 지키면, padding/margin 값이 바뀌어도 점이 항상 세로선 위에 정확히
           놓입니다. (기존에는 w-1/2 + mr-auto/ml-auto로 반쪽만 차지시키고 점을 -5px로 미세 오프셋하는
           방식이라, 폭 계산이 어긋나면 점과 선이 쉽게 틀어졌습니다.)
        3. 좌/우 내용 배치는 md 이상에서 grid-cols-2로 나누고, 짝수 항목은 1열(왼쪽), 홀수 항목은
           2열(오른쪽)에 순서만 바꿔 넣습니다. 375px 모바일에서는 grid를 쓰지 않고 한 컬럼 + 왼쪽
           점으로 단순화합니다.
      */}
      <ol className="relative m-0 mx-auto max-w-4xl list-none p-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:-translate-x-1/2 md:before:bg-white/15">
        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0;
          const content = (
            <div className={isLeft ? "md:text-right" : "md:text-left"}>
              <div className="text-xs tracking-widest text-dim">{item.date}</div>
              <h3 className="mt-1 text-lg font-bold">
                {/* projectId가 연결된 항목만 아래 Projects 섹션의 해당 상세로 링크됩니다. */}
                {item.projectId ? (
                  <a
                    href={`#${item.projectId}`}
                    className="no-underline hover:underline"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              {/* bullet이 없는 항목(예: 청년 일경험)은 빈 목록과 여백을 만들지 않습니다. */}
              {item.points.length > 0 && (
                <ul
                  className={`mt-3 flex flex-col gap-1.5 text-sm leading-relaxed marker:text-dim list-disc pl-5 md:pl-0 ${
                    isLeft ? "md:items-end md:pr-5" : "md:items-start md:pl-5"
                  }`}
                >
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          );

          return (
            <li key={item.id} className="relative pb-12 pl-8 last:pb-0 md:pl-0">
              {/* 점: li와 동일한 중앙 기준(left-1/2 -translate-x-1/2)이라 before 선과 항상 일치합니다. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 size-2.5 rounded-full bg-strong ring-4 ring-bg z-10 md:left-1/2 md:-translate-x-1/2"
              />

              <div className="md:grid md:grid-cols-2 md:gap-x-10">
                {isLeft ? (
                  <>
                    {content}
                    <div aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <div aria-hidden="true" />
                    {content}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
