// src/components/TechStack.tsx
// Tech Stack을 About(Info) 섹션 안으로 통합하면서, 리스트 부분(TechStackList)만 따로 떼어내
// Info.tsx에서도 재사용할 수 있게 했습니다. TechStack(섹션 전체)은 더 이상 App.tsx에서 쓰이지
// 않지만, 파일 삭제가 금지되어 있어 컴포넌트 자체는 남겨뒀습니다.
import { profile } from "../data/profile";
import { SectionHeading } from "./SectionHeading";

// 숙련도(상/중/하)마다 모양을 달리해 한눈에 구분되게 합니다.
// 색만으로 구분하지 않도록 왼쪽에 "상/중/하" 글자 라벨도 항상 같이 보여줍니다.
const levelStyle: Record<string, string> = {
  상: "border-strong bg-strong text-black font-bold",
  중: "border-white/50 text-strong",
  하: "border-white/20 text-label",
};

export function TechStackList() {
  const groups = Object.entries(profile.stack) as [string, string[]][];

  return (
    // 상/중처럼 레벨과 스킬 목록이 묶여 있는 구조라 dl/dt/dd로 관계를 명시합니다.
    <dl className="m-0 flex flex-col gap-5">
      {groups.map(([level, skills]) => (
        <div key={level} className="grid grid-cols-[1.5rem_1fr] items-center gap-3">
          <dt className="text-sm font-bold text-dim">{level}</dt>
          <dd className="m-0">
            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className={`rounded-full border px-4 py-2 text-sm tracking-wide ${
                    levelStyle[level] ?? levelStyle["하"]
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="mx-auto max-w-4xl py-24"
    >
      <SectionHeading
        eyebrow="Skills"
        title="Tech Stack"
        headingId="tech-stack-heading"
      />
      <TechStackList />
    </section>
  );
}
