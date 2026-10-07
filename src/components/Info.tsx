import profilePhoto from "../assets/my_img.JPG";
import { profile } from "../data/profile";
import { ContactRow } from "./ContactRow";
import { GitHubIcon, MailIcon } from "./icons";
import { SectionHeading } from "./SectionHeading";
import { TechStackList } from "./TechStack";

// About 안의 작은 소제목(수상/자격/기술스택)입니다. ABOUT ME와 같은 톤(캡션 스타일)을 쓰되,
// 의미상 하위 항목이라 h3을 씁니다.
function SubLabel({ children }: { children: string }) {
  return (
    <h3 className="m-0 text-xs uppercase tracking-[0.16em] text-dim">
      {children}
    </h3>
  );
}

export default function Info() {
  const contactList = (
    <ul className="m-0 flex list-none flex-col gap-3 p-0 text-sm text-label">
      <li>
        <ContactRow
          icon={<MailIcon className="text-dim" aria-hidden="true" />}
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </ContactRow>
      </li>
      <li>
        <ContactRow
          icon={<GitHubIcon className="text-dim" aria-hidden="true" />}
          href={profile.github}
        >
          github.com/Juhunnm
        </ContactRow>
      </li>
    </ul>
  );

  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-7xl py-24">
      <SectionHeading eyebrow="About" title="About Me" headingId="about-heading" />

      {/*
        왼쪽: 사진 + 이름 + 연락처 (다른 섹션과 독립적으로 늘 눈에 띄어야 하는 "프로필 카드" 느낌).
        오른쪽: 소개 문단 + 수상/자격증/Tech Stack (텍스트 중심 정보).
        md 이상에서 2단 그리드, 그 아래서는 세로로 쌓입니다.
      */}
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[280px_1fr] md:gap-20">
        {/* 왼쪽 컬럼: 프로필 카드 */}
        <div className="flex flex-row items-center gap-6 md:flex-col md:items-start md:gap-8">
          {/* 증명사진(3:4)이라 aspect-[3/4]로 잘림 없이 보여줍니다. */}
          <img
            src={profilePhoto}
            alt={`${profile.name} 프로필 사진`}
            width={535}
            height={693}
            className="aspect-[3/4] w-24 shrink-0 rounded-2xl border border-white/10 object-cover md:w-full"
          />

          <div>
            <div className="text-2xl font-extrabold tracking-tight text-strong md:text-[28px]">
              {profile.name}
            </div>
            <div className="mt-1 text-[13px] tracking-[0.08em] text-dim">
              {profile.nameEn}
            </div>

            <div className="mt-6 hidden md:block">{contactList}</div>
          </div>
        </div>

        {/* 오른쪽 컬럼: 소개 + 수상/자격/스택 */}
        <div className="flex flex-col justify-between gap-14 md:h-full">
          {/* [임시 주석 처리] 핵심 역량: 슬로건 한 줄 + 카드 3개 (모바일 1열, lg 이상 3열)
              다시 쓰려면 이 줄의 여는 주석과 아래 닫는 주석("끝")만 지우면 됩니다.
              데이터는 data/profile.ts의 coreCompetency에 그대로 있습니다.
          <div>
            <SubLabel>Core Competency</SubLabel>
            <p className="m-0 mt-4 break-keep text-xl font-bold leading-snug text-strong md:text-2xl">
              {profile.coreCompetency.slogan}
            </p>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3">
              {profile.coreCompetency.features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 p-5"
                >
                  <h4 className="m-0 break-keep text-base font-bold leading-snug text-strong">
                    {feature.title}
                  </h4>
                  {feature.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="m-0 break-keep text-sm leading-[1.8] text-subtle"
                    >
                      {paragraph}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
          끝 */}

          {/* 짧은 소개 한 줄 */}
          <p className="m-0 break-keep text-xl font-bold leading-snug text-strong md:text-3xl">
            {profile.tagline}
          </p>

          {/* 위: 학력 / 수상 / 자격증 3열 (모바일 1열) */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            <div>
              <SubLabel>Education</SubLabel>
              <div className="mt-4 flex flex-col gap-2.5 text-sm text-label">
                <span>
                  {profile.education.school} {profile.education.major}
                </span>
                <span className="text-dim">{profile.education.period}</span>
                <span>학점 {profile.education.gpa}</span>
              </div>
            </div>

            <div>
              <SubLabel>Awards</SubLabel>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0 text-sm text-label">
                {profile.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </div>

            <div>
              <SubLabel>Certifications</SubLabel>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0 text-sm text-label">
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 아래(오른쪽 하단): Tech Stack. md 이상에서는 컬럼 높이를 왼쪽 프로필 카드에 맞춰 늘리고
              justify-between으로 맨 아래에 붙여, 프로필 카드 하단과 같은 선에 놓이게 합니다. */}
          <div className="border-t border-white/10 pt-10">
            <SubLabel>Tech Stack</SubLabel>
            <div className="mt-6">
              <TechStackList />
            </div>
          </div>

          {/* 연락처는 모바일 폭(좁은 1열)에서는 여기 오른쪽 컬럼 끝에 보여줍니다. */}
          <div className="md:hidden">{contactList}</div>
        </div>
      </div>
    </section>
  );
}
