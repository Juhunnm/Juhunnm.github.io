// src/data/timeline.ts
export type TimelineItem = {
  id: string;
  date: string;
  title: string;
  points: string[];
  // education: 학력/수상, experience: 실무·프로젝트 경험. Experiences 섹션(현재 미사용)에서
  // Timeline 데이터를 그대로 재사용하며 이 필드로 구분합니다.
  type: "education" | "experience";
  // data/projects.ts에 있는 해당 프로젝트의 상세 case study id. 연결되면 제목이 아래
  // Projects 섹션의 상세로 바로 이동하는 링크가 됩니다.
  projectId?: string;
};

// 사용자가 직접 정리해 준 실제 타임라인입니다 (2026-10-08).
export const timeline: TimelineItem[] = [
  {
    id: "p1",
    date: "2021.03 – 2025.02",
    title: "백석대학교 소프트웨어학과 졸업",
    type: "education",
    points: [
      "학부연구생 (2024.06 – 2025.01)",
      "SMART IT 창작물 경진대회 장려상 (2023.04)",
      "C 언어 프로그래밍 경진대회 장려상 (2023.06)",
      "JAVA 프로그래밍 경진대회 장려상 (2023.06)",
      "SIC 발명작품 공모전 장려상 (2024.11)",
    ],
  },
  {
    id: "p2",
    type: "experience",
    date: "2025.06.02 – 2025.07.28",
    title:
      "[ 청년 일경험 ] NPU 기반 파인튜닝 학습 모델 및 영상 객체 추출 응용개발",
    points: [],
  },
  {
    id: "p3",
    type: "experience",
    date: "2026.07.19 – 2026.08.16",
    title:
      "[ COMENTO ] 대기업 현직자와 함께 클라우드 IT AWS 구축부터 운영까지 실무 AtoZ",
    projectId: "aws-comento",
    points: [
      "VPC Multi-AZ, NAT Instance 구성, EKS 워크로드 배포",
      "IAM 최소권한·MFA, KMS 암호화, EFK 로그 중앙화",
      "CloudWatch → SNS → Lambda → Slack 알림체계",
    ],
  },
  {
    id: "p4",
    type: "experience",
    date: "2026.07.27 – 2026.08.14",
    title: "[ KOSA ] NIPA-NAVER Cloud Sovereign AI PBL 기반 프로젝트",
    projectId: "ncp-youtalk",
    // 교육과정(4과정 × 30H = 120H) 전체 나열 대신 핵심 4개만 한 줄로 요약했습니다.
    points: [
      "Sovereign AI 교육 120H: NCP 인프라·보안 아키텍처, 데이터 파이프라인, RAG·Agent, Agentic AI 개발·배포·운영",
      "NIPA-NAVER Cloud Sovereign AI PBL 대상",
      "YOU TALK(RAG 챗봇), 이중화·로드밸런서·NAT Gateway, RabbitMQ 비동기 처리",
    ],
  },
];

// Experiences 섹션(현재 App.tsx에서 사용하지 않음)용 필터입니다.
export const experiences = timeline.filter(
  (item) => item.type === "experience",
);
