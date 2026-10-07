// src/components/FloatingToc.tsx
// 노션식 플로팅 목차입니다.
// - 본문 목차(tocId)가 화면 위로 지나가 안 보이게 되면, 우측 가장자리에 짧은 막대(미리보기)가 나타납니다.
// - 막대에 마우스를 올리거나 키보드로 포커스하면 항목 이름이 있는 패널로 펼쳐집니다.
// - 현재 화면 중앙에 있는 항목이 강조됩니다(scroll spy).
// - 해당 섹션(sectionId)을 벗어나면 다시 사라집니다.
// 스크롤 이벤트 대신 IntersectionObserver를 써서 스크롤 중 계산 비용을 줄였습니다.
// 폭이 좁은 화면(lg 미만)에서는 본문을 가려서 숨깁니다.
import { useEffect, useState } from "react";

type TocItem = { id: string; title: string };

export function FloatingToc({
  items,
  tocId,
  sectionId,
  label,
}: {
  items: TocItem[];
  tocId: string;
  sectionId: string;
  label: string;
}) {
  const [passedToc, setPassedToc] = useState(false);
  const [inSection, setInSection] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  // 본문 목차가 "위로" 사라졌는지 / 섹션 안에 있는지 감시합니다.
  // (목차가 아직 아래에 있어 안 보이는 경우와 구분하려고 boundingClientRect.top을 같이 봅니다.)
  useEffect(() => {
    const toc = document.getElementById(tocId);
    const section = document.getElementById(sectionId);
    if (!toc || !section) return;

    const tocObserver = new IntersectionObserver(([entry]) => {
      setPassedToc(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const sectionObserver = new IntersectionObserver(([entry]) => {
      setInSection(entry.isIntersecting);
    });
    tocObserver.observe(toc);
    sectionObserver.observe(section);
    return () => {
      tocObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [tocId, sectionId]);

  // 화면 세로 중앙선에 걸친 항목을 현재 항목으로 봅니다.
  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const show = passedToc && inSection;

  return (
    // 숨겨진 동안에는 invisible이라 탭 이동/스크린리더에서도 빠집니다.
    <div
      className={`group fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-300 lg:block ${
        show ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* 접힌 상태: 항목 수만큼의 짧은 막대. 현재 항목은 더 길고 밝게 */}
      <ul
        aria-hidden="true"
        className="m-0 flex list-none flex-col items-end gap-3 p-3 transition-opacity group-focus-within:opacity-0 group-hover:opacity-0"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={`h-0.5 rounded-full transition-all ${
              item.id === activeId ? "w-6 bg-strong" : "w-3 bg-white/30"
            }`}
          />
        ))}
      </ul>

      {/* 펼친 상태: 마우스를 올리거나 링크에 포커스가 오면 나타납니다.
          접혀 있어도 링크는 DOM에 있어 키보드로 Tab 이동하면 focus-within으로 펼쳐집니다. */}
      <nav
        aria-label={label}
        className="pointer-events-none absolute right-0 top-1/2 w-64 -translate-y-1/2 translate-x-2 rounded-xl border border-white/15 bg-black/85 p-2 opacity-0 backdrop-blur transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100"
      >
        <ol className="m-0 flex list-none flex-col p-0">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={item.id === activeId ? "location" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm leading-snug no-underline hover:bg-white/10 ${
                  item.id === activeId ? "font-bold text-strong" : "text-dim hover:text-label"
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
