// src/components/Hero.tsx
import { profile } from "../data/profile";

export function Hero() {
  const { greeting } = profile;

  return (
    // 화면 높이보다 12rem 짧게 잡아서, 첫 화면 아래에 다음 섹션(About)의 제목이 살짝 보이게 합니다.
    // "아래에 더 있다"는 걸 한눈에 알 수 있게 하려는 용도입니다.
    <section className="relative isolate flex min-h-[calc(100svh-12rem)] flex-col justify-between">
      {/* 배경 그라데이션: 은은한 빛 번짐 두 개 + 아래쪽은 검정으로 자연스럽게 이어지게 합니다.
          body padding(24px 28px)을 상쇄해 화면 끝까지 채우고(-inset), 장식이라 스크린리더에서는 숨깁니다.
          overflow-hidden은 이 배경 레이어에만 걸어 가로 스크롤이 생기지 않게 합니다. */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-7 -inset-y-6 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-40 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.32),transparent)] blur-3xl" />
        <div className="absolute -left-40 top-1/3 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.26),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-black" />
      </div>

      {/* 상단 라벨 */}
      <header className="flex justify-between text-xs uppercase tracking-[0.16em] text-dim">
        <span>Portfolio 2026</span>
        <span>Cloud</span>
      </header>

      {/* 중앙: 인사말 (줄마다 줄바꿈, 단어 단위로 끊어 읽기 좋게 break-keep) */}
      <div className="flex flex-col gap-8">
        <h1 className="m-0 break-keep text-[clamp(2.25rem,7.5vw,7rem)] font-extrabold leading-[1.1] tracking-tight text-strong">
          {greeting.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">{profile.name}입니다.</span>
        </h1>

        <div className="flex max-w-[44ch] flex-col gap-2 text-base leading-relaxed text-muted md:text-xl">
          {greeting.summary.map((sentence) => (
            <p key={sentence} className="m-0 break-keep">
              {sentence}
            </p>
          ))}
        </div>
      </div>

      {/* 하단: 스크롤 안내 */}
      <footer className="flex items-end justify-between text-xs tracking-[0.16em] text-dim">
        <span>
          {profile.name} - {profile.nameEn}
        </span>
        <a href="#about" className="flex items-center gap-2 text-dim no-underline hover:text-strong">
          SCROLL
          <span aria-hidden="true" className="inline-block motion-safe:animate-bounce">
            ↓
          </span>
        </a>
      </footer>
    </section>
  );
}
