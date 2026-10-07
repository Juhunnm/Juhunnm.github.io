// src/components/Projects.tsx
// 목차 + 프로젝트별 케이스 스터디(ProjectDeck)를 보여줍니다.
// 각 케이스는 헤더 → 스크롤하면 고정되며 한 장씩 넘어가는 이미지 순입니다.
import { projects } from "../data/projects";
import { FloatingToc } from "./FloatingToc";
import { ProjectDeck } from "./ProjectDeck";
import { SectionHeading } from "./SectionHeading";

// FloatingToc의 effect 의존성이 렌더마다 바뀌지 않도록 컴포넌트 밖에서 한 번만 만듭니다.
const tocItems = projects.map(({ id, title }) => ({ id, title }));

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="pb-24 pt-40 md:pt-48">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Work" title="Projects" headingId="projects-heading" />

        {/* 목차: 프로젝트 제목을 누르면 아래 해당 케이스로 이동합니다. */}
        <nav id="projects-toc" aria-label="프로젝트 목차">
          <ol className="m-0 flex list-none flex-col gap-0 border-y border-white/10 p-0">
            {projects.map((item, index) => (
              <li key={item.id} className="border-b border-white/10 last:border-none">
                <a
                  href={`#${item.id}`}
                  className="flex items-baseline justify-between gap-6 py-7 text-label no-underline hover:text-strong md:py-8"
                >
                  <span className="flex items-baseline gap-5 md:gap-8">
                    <span className="text-xs text-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold md:text-xl">{item.title}</span>
                  </span>
                  <span className="shrink-0 text-xs tracking-widest text-dim">
                    {item.period}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* 프로젝트별 케이스 스터디: 세로 스크롤로 나열 */}
      <div className="mt-48 flex flex-col gap-40 md:mt-64">
        {projects.map((item) => (
          <div key={item.id} id={item.id} className="scroll-mt-10">
            <ProjectDeck project={item} />
          </div>
        ))}
      </div>

      {/* 본문 목차가 화면 위로 사라지면 우측에 뜨는 미니 목차 (노션 스타일) */}
      <FloatingToc
        items={tocItems}
        tocId="projects-toc"
        sectionId="projects"
        label="프로젝트 바로가기"
      />
    </section>
  );
}
