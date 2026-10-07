// src/components/ProjectDeck.tsx
// 프로젝트 하나를 케이스 스터디처럼 보여줍니다.
//   1. 헤더: 제목 / 기간·역할 / 기술 배지 / 개요
//   2. 화면: 스크롤하면 화면에 "고정(pin)"되고, 그 상태에서 계속 스크롤하면 이미지가 한 장씩 넘어갑니다.
//      마지막 이미지까지 넘기면 고정이 풀리고 페이지가 이어서 내려갑니다.
// 트러블슈팅/상세 섹션은 이미지(포트폴리오) 안에 담겨 있어 화면에서는 뺐습니다.
// (데이터는 projects.ts의 sections에 그대로 남아 있습니다.)
// 파일명은 기존 import를 유지하려고 그대로 뒀습니다 (파일 삭제·이름 변경 금지 규칙).
import { useEffect, useRef, useState } from "react";
import type { ProjectCase } from "../data/projects";
import { Badge } from "./Badge";
import { ImageIcon } from "./icons";

// 이미지 한 장을 넘기는 데 필요한 스크롤 거리(화면 높이 기준 %). 클수록 천천히 넘어갑니다.
const STEP_VH = 70;

// 이미지 한 장의 상태에 따른 모양: 현재 장은 제자리, 지나간 장은 위로 살짝 줄어들며 사라지고,
// 아직 안 온 장은 아래에서 올라올 준비를 합니다. (뒤의 장이 앞의 장을 덮으며 "착착" 넘어가는 느낌)
function slideClass(index: number, active: number) {
  if (index === active) return "translate-y-0 scale-100 opacity-100";
  if (index < active) return "-translate-y-8 scale-95 opacity-0";
  return "translate-y-24 opacity-0";
}

function PinnedGallery({
  title,
  images,
}: {
  title: string;
  images: NonNullable<ProjectCase["images"]>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // 섹션 안에서 얼마나 스크롤했는지(0~1)를 구해 현재 이미지 번호로 바꿉니다.
  // 스크롤 이벤트는 매우 자주 발생하므로 requestAnimationFrame으로 프레임당 한 번만 계산합니다.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    function update() {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.getBoundingClientRect().height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / scrollable));
      setActive(Math.min(images.length - 1, Math.floor(progress * images.length)));
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    schedule(); // 새로고침 등으로 이미 스크롤된 상태로 열려도 맞는 장이 보이게 합니다.
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [images.length]);

  const counter = `${String(active + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

  return (
    // 바깥 박스가 (화면 높이 + 넘길 거리)만큼 길어서, 안쪽 sticky 무대가 그동안 화면에 고정됩니다.
    <div
      ref={sectionRef}
      role="group"
      aria-label={`${title} 포트폴리오 (스크롤하면 이미지가 넘어갑니다)`}
      style={{ height: `calc(100vh + ${(images.length - 1) * STEP_VH}vh)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col gap-4 py-6">
        <div className="flex items-baseline justify-between gap-4 text-xs tracking-widest text-dim">
          <span className="truncate">{title}</span>
          <span aria-hidden="true" className="shrink-0 text-label">
            {counter}
          </span>
        </div>

        {/* 모든 이미지를 같은 칸에 겹쳐 두고, 현재 장만 보이게 합니다.
            16:9 슬라이드가 화면 높이에 맞춰 잘림 없이 들어가도록 폭을 계산합니다. */}
        <div className="grid min-h-0 flex-1 place-items-center">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`col-start-1 row-start-1 aspect-video w-[min(100%,calc((100vh_-_9rem)*16/9))] transition-all duration-700 ease-out motion-reduce:transition-none ${slideClass(index, active)}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="size-full rounded-lg border border-white/10 object-contain"
              />
            </div>
          ))}
        </div>

        {/* 진행 점 + 첫 장에서만 보이는 스크롤 안내. 장식이라 스크린리더에서는 숨깁니다. */}
        <div aria-hidden="true" className="flex h-8 items-center justify-center gap-4">
          {active === 0 ? (
            <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-label">
              SCROLL
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="motion-safe:animate-bounce"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          ) : (
            <ul className="m-0 flex list-none items-center gap-2 p-0">
              {images.map((image, index) => (
                <li
                  key={image.src}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-6 bg-strong" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectDeck({ project }: { project: ProjectCase }) {
  const overview = project.sections.find((s) => s.label === "개요");
  const hasImages = project.images && project.images.length > 0;

  return (
    <article aria-labelledby={`${project.id}-title`}>
      {/* 헤더 */}
      <header className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3
            id={`${project.id}-title`}
            className="m-0 text-2xl font-bold leading-snug text-strong md:text-4xl"
          >
            {project.title}
          </h3>
          <p className="m-0 flex items-baseline gap-4 text-xs tracking-widest text-dim">
            <span>{project.period}</span>
            <span className="text-label">{project.role}</span>
          </p>
        </div>

        {project.tech.length > 0 && (
          <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </ul>
        )}

        {overview && (
          <p className="m-0 mt-6 max-w-3xl text-base leading-[1.9] text-subtle md:text-lg">
            {overview.body as string}
          </p>
        )}
      </header>

      {/* 화면: 스크롤하면 고정되고 이미지가 한 장씩 넘어갑니다 */}
      <div className="mx-auto mt-10 max-w-7xl">
        {hasImages ? (
          <PinnedGallery title={project.title} images={project.images!} />
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 text-dim">
            <ImageIcon aria-hidden="true" />
            <span className="text-xs tracking-wide">화면/다이어그램 준비 중</span>
          </div>
        )}
      </div>
    </article>
  );
}
