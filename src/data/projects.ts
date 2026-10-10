// src/data/projects.ts
// Projects 섹션 전용 데이터입니다. 채팅으로 직접 받은 프로젝트(현재 3개)의 상세 내용을 그대로 옮겨
// 담았습니다 (표현을 바꾸지 않고, 명백한 오탈자 1~2곳만 바로잡았습니다 — 아래 각주 참고).
// 프로젝트마다 서술 구조가 달라서(문제/해결/결과형 vs 개요/보안/운영형 vs 한 문단형),
// 고정된 필드 대신 "라벨 + 본문" 섹션 배열로 유연하게 표현합니다.

import homelab1 from "../assets/homlab_1.png";
import homelab2 from "../assets/homlab_2.png";
import homelab3 from "../assets/homlab_3.png";
import homelab4 from "../assets/homlab_4.png";
import homelab5 from "../assets/homlab_5.png";
import homelab6 from "../assets/homlab_6.png";
import ncp1 from "../assets/NCP_Talk_1.png";
import ncp2 from "../assets/NCP_Talk_2.png";
import ncp3 from "../assets/NCP_Talk_3.png";
import ncp4 from "../assets/NCP_Talk_4.png";
import ncp5 from "../assets/NCP_Talk_5.png";
import ncp6 from "../assets/NCP_Talk_6.png";
import comento1 from "../assets/comento_aws_1.png";
import comento2 from "../assets/comento_aws_2.png";
import comento3 from "../assets/comento_aws_3.png";
import comento4 from "../assets/comento_aws_4.png";
import comento5 from "../assets/comento_aws_5.png";
import comento6 from "../assets/comento_aws_6.png";

export type ProjectSection = {
  label: string;
  // 단계별로 나열해야 하는 내용(해결 과정 등)은 intro(도입 문장) + body(목록)로,
  // 그냥 문단이면 body만 문자열로 씁니다.
  intro?: string;
  body: string | string[];
};

export type ProjectCase = {
  id: string;
  title: string;
  period: string;
  role: string;
  // 본문에 실제로 등장한 기술만 담았습니다.
  tech: string[];
  summary: string;
  sections: ProjectSection[];
  images?: { src: string; alt: string }[];
};

export const projects: ProjectCase[] = [
  {
    id: "raspberry-pi-home-server",
    title: "온프레미스 라즈베리파이 홈서버",
    period: "개인 진행",
    role: "설계·구축·운영 전담",
    tech: [
      "Docker Compose",
      "SSH (ed25519)",
      "UFW",
      "Fail2Ban",
      "Cloudflare Tunnel",
      "GitHub Actions",
      "Grafana",
    ],
    summary:
      "집에 남는 라즈베리파이5로 개인 홈서버를 직접 설계·구축·운영까지 전담했습니다.",
    images: [
      { src: homelab1, alt: "라즈베리파이 기반 온프레미스 인프라 설계 및 구축 프로젝트 표지와 기술 스택" },
      { src: homelab2, alt: "프로젝트 개요와 주요 구현 항목: 서버 구축 및 보안, 컨테이너 및 서비스 운영, 모니터링 및 운영 관리, 크롤링 및 설정 관리" },
      { src: homelab3, alt: "아키텍처 다이어그램: Cloudflare Tunnel, Nginx, 내부 전용 네트워크의 프론트엔드·백엔드·DB·크롤러, Prometheus·Grafana 모니터링, GitHub Self-hosted Runner" },
      { src: homelab4, alt: "아키텍처 핵심 요소: 서버 보안 강화, Cloudflare Tunnel 외부 노출, 컨테이너 구성 및 네트워크 분리, 모니터링" },
      { src: homelab5, alt: "트러블슈팅: 서브패스 경로 중복, 터널 구성 후 설정 오류 3건의 증상·원인·해결·재발 방지" },
      { src: homelab6, alt: "NCP 아키텍처 설계: 문제 상황, 해결, 기대 효과와 VPC 구성 다이어그램 (실제 구축은 미진행)" },
    ],
    sections: [
      {
        label: "개요",
        body: "Raspberry Pi 5를 활용해 개인 홈서버를 직접 설계·구축하고 운영까지 전담했습니다. Docker Compose를 기반으로 Grafana와 개인 웹 애플리케이션 등 서비스를 컨테이너별로 분리하고, 내부 전용 네트워크와 외부 접근 네트워크를 구분해 데이터베이스의 외부 직접 접근을 차단하는 등 보안과 운영 효율성을 고려한 인프라를 구성했습니다.",
      },
      {
        label: "문제 상황",
        body: "서버를 처음 열었을 때는 포트를 그대로 인터넷에 노출한 상태였고, 로그를 보니 짧은 시간에 수십~수백 건의 외부 로그인 시도가 들어오고 있었습니다. 당시 인증 방식은 비밀번호 기반이었기 때문에 무차별 대입 공격에 취약한 구조였습니다.",
      },
      {
        label: "해결 과정",
        intro:
          "보안 조치를 한 번에 적용하면 스스로 접속이 막히는 잠금(lock-out) 위험이 있어, 순서를 정해 단계적으로 진행했습니다.",
        body: [
          "먼저 SSH 키인증(ed25519)을 새로 등록하고, 키로 정상 접속되는지 먼저 확인했습니다.",
          "접속이 확인된 뒤에야 비밀번호 인증과 root 직접 로그인을 차단했습니다 — 순서를 바꾸면 중간에 서버에서 완전히 차단될 수 있어 이 순서를 지켰습니다.",
          "UFW 방화벽으로 꼭 필요한 포트만 열고, Fail2Ban을 설치해 반복적으로 실패하는 로그인 IP를 자동으로 차단하도록 구성했습니다.",
          "포트 자체를 외부에 노출하지 않기 위해 Cloudflare Tunnel을 도입해 인바운드 포트를 전부 폐쇄하고, 아웃바운드 연결만으로 외부 접속을 중계하도록 바꿨습니다.",
          "서비스가 늘어나며 Grafana 대시보드의 경로가 다른 서비스 경로와 중복되는 버그가 발생했는데, 단순히 예외처리로 덮지 않고 서브도메인 구조로 전환해 경로 자체가 겹치지 않도록 근본적으로 해결했습니다.",
          "배포 과정도 자동화하기 위해 GitHub Actions self-hosted runner를 구축해 CI/CD 파이프라인을 만들었습니다.",
        ],
      },
      {
        label: "결과",
        body: "Fail2Ban이 누적 388회의 무차별 대입 시도 중 12개의 공격 IP를 자동으로 차단했고, 인바운드 포트를 하나도 열어두지 않은 상태에서도 외부에서 정상적으로 서비스에 접근할 수 있는 구조를 완성했습니다. Grafana 경로중복 버그는 재발하지 않았고, GitHub Actions 기반 CI/CD로 배포 시간도 크게 줄었습니다.",
      },
      {
        label: "느낀 점",
        // "SK쉴더스 프로젝트에서 망분리와 보안그룹 체인을 설계할 때 활용"까지 포함된 원문을 그대로 담았습니다.
        body: '"잘 동작하는 구조"와 "안전한 구조"는 다르다는 것을 직접 겪으며 체감했습니다. 이후 이 구조를 NCP 클라우드 환경으로 확장한다면 어떻게 대응될지도 스스로 분석해봤습니다 — Docker의 내부·외부 네트워크 분리는 VPC와 서브넷 분리로, UFW의 포트 통제는 ACG(Access Control Group)로, Cloudflare Tunnel로 인바운드를 막던 방식은 로드밸런서와 공인 IP를 분리해 매핑하는 구조로 대응될 것이라 정리했습니다. 이 경험이 이번 SK쉴더스 프로젝트에서 망분리와 보안그룹 체인을 설계할 때 바로 활용할 수 있는 기반이라고 생각합니다.',
      },
    ],
  },
  {
    id: "aws-comento",
    title: "대기업 현직자와 함께 클라우드 IT AWS 구축부터 운영까지 실무 AtoZ",
    period: "4주",
    role: "VPC·IAM·KMS·모니터링 전반 설계",
    tech: [
      "VPC",
      "Multi-AZ",
      "NAT Instance",
      "EKS",
      "IAM",
      "MFA",
      "KMS",
      "EFK",
      "CloudWatch",
      "SNS",
      "Lambda",
      "Slack",
    ],
    summary:
      "실제 서비스가 올라갈 수 있는 가용성·비용·보안을 고려한 AWS 인프라를 직접 설계했습니다.",
    images: [
      { src: comento1, alt: "AWS EKS 기반 쿠버네티스 클라우드 인프라 구축 및 모니터링 자동화 프로젝트 표지" },
      { src: comento2, alt: "프로젝트 개요: 설계, 로그, 알림 세 가지 구성과 사용한 기술 스택" },
      { src: comento3, alt: "AWS 아키텍처 다이어그램과 설계 요점: 외부 접점 최소화, 비용, 모니터링, 운영 자동화" },
      { src: comento4, alt: "핵심 설계 결정 과정: 계정 권한, 네트워크, 로그 수집, 비용 관리의 문제·해결·결과" },
      { src: comento5, alt: "장애 알림 자동화: CloudWatch, SNS, Lambda, Slack 흐름과 부하 테스트 및 Slack 수신 알림 화면" },
      { src: comento6, alt: "비용 효율화를 위한 NAT 구성 설계: NAT Gateway 대비 NAT Instance 3개월 예상 비용 비교, 약 78% 비용 절감" },
    ],
    sections: [
      {
        label: "개요",
        body: "코멘토 4주 AWS 실무 인프라 교육과정에서 가용성·비용 효율성·보안을 고려한 클라우드 인프라를 직접 설계하고 구축했습니다. VPC와 서브넷을 Multi-AZ로 구성해 고가용성 기반을 마련하고, EC2 기반 NAT Instance를 직접 운영해 관리형 NAT Gateway 대비 비용 절감 방안을 실습했습니다. 또한 Amazon EKS 클러스터를 구축하고 컨테이너 워크로드를 배포하며 클라우드 인프라 설계부터 컨테이너 운영까지 경험했습니다.",
      },
      {
        label: "보안 설정",
        body: "IAM 정책을 직접 설계해 각 역할에 해당하는 최소권한만 부여하는 원칙을 적용하고 MFA를 활성화했습니다. Webhook URL같은 민감정보는 코드에 직접 쓰지 않고 KMS로 암호화해 저장하고, 사용할 때부터 복호화하도록 구성했습니다.",
      },
      {
        label: "운영·모니터링",
        body: "EFK(Elasticsearch, Fluentd, Kibana) 로그 파이프라인을 구축해 여러 인스턴스에 분산된 로그를 한 곳에서 바로 조회하도록 중앙화했습니다. CloudWatch→SNS→Lambda→Slack 연계로, 장애가 발생하자마자 팀 채팅방에 자동으로 알림이 가는 알림 체계를 구축했습니다.",
      },
      {
        label: "느낀 점",
        // 원문의 "설정감"→"설정값", "커져질지"→"커질지"는 명백한 오탈자로 보여 바로잡았습니다.
        body: "최소권한과 암호화는 그냥 걸어두는 설정값이 아니라, 어떤 경로로 권한을 쥐었을 때 피해가 얼마나 커질지를 바탕으로 방어 우선순위를 정해야 하는 기술이란 것을 배운 과정이었습니다.",
      },
    ],
  },
  {
    id: "ncp-youtalk",
    title: "YOU TALK | NCP 기반 YouTube RAG 챗봇",
    period: "11일",
    role: "프론트엔드 리드 · 이중화·로드밸런서·NAT Gateway 설계 공동 진행",
    tech: ["RAG", "HyperCLOVA X", "RabbitMQ", "로드밸런서", "NAT Gateway"],
    summary:
      "YouTube 콘텐츠와 HyperCLOVA X를 연결한 RAG 챗봇을 11일 만에 완성했습니다.",
    images: [
      { src: ncp1, alt: "YOU TALK 표지: RAG 기반 유튜브 영상 탐색 및 질의응답 AI 서비스와 기술 스택" },
      { src: ncp2, alt: "문제 제기: 영상을 다 시청하기 싫으셨던 적 있으셨나요?" },
      { src: ncp3, alt: "핵심 기능: 폴더·영상별 채팅 분리, 임베딩 검색, 영상 추가, 근거 표시 모드, TTS 답변 듣기, 파일 변환·내보내기" },
      { src: ncp4, alt: "계층을 나눈 NCP 아키텍처: 요청 흐름, 담당 역할, VPC 구성 다이어그램" },
      { src: ncp5, alt: "외부 API 차단을 메시지큐로 푼 과정: 문제 상황, 해결, 기대 효과와 영상 분석·RAG 데이터 흐름도" },
      { src: ncp6, alt: "Web과 App으로 나뉜 CI/CD 파이프라인 흐름도와 담당 역할" },
    ],
    sections: [
      {
        label: "개요",
        body: "사용자가 입력한 YouTube 링크를 분석하고, 영상 자막을 기반으로 대화할 수 있는 RAG 기반 챗봇 서비스 YOU TALK을 개발했습니다. HyperCLOVA X를 활용해 영상 내용을 바탕으로 질문에 답변하고, 근거가 되는 자막 정보를 함께 제공하여 사용자가 영상의 핵심 내용을 쉽게 파악하고 심층적으로 탐색할 수 있도록 구현했습니다.",
      },
      {
        label: "문제 상황",
        body: "서비스 사용자가 늘면서 짧은 시간에 YouTube 검색과 HyperCLOVA X 호출이 동시에 몰리는 상황이 발생했습니다. 외부 API마다 초당·분당 호출 횟수 제한이 걸려 있었는데, 요청이 순간적으로 집중되자 이 제한을 넘는 호출들이 거절당하면서 사용자에게 답변이 아예 전달되지 않거나 오류 화면이 뜨는 경우가 반복됐습니다. 특히 여러 사용자가 비슷한 시간에 질문을 던지는 시연·테스트 상황에서 이 문제가 두드러졌습니다.",
      },
      {
        label: "해결 과정",
        body: "요청을 바로 처리하는 대신 RabbitMQ 큐에 쌓아 순서대로 처리하도록 구조를 바꿨습니다. 사용자의 요청이 도착하면 큐에 쌓이고, 워커가 API 호출 제한에 맞춰 하나씩 꺼내 YouTube 검색과 HyperCLOVA X 호출을 처리했습니다. 요청이 한꺼번에 몰려도 API로 나가는 호출은 일정한 속도를 유지해 제한을 넘지 않았습니다. 사용자 화면에는 처리 중 상태를 보여주고 완료되면 답변을 전달해, 기다리는 동안에도 응답이 오고 있음을 알 수 있게 했습니다. 이 구조는 프론트엔드의 이중화·로드밸런서·NAT Gateway 설계와 마찬가지로 백엔드 팀원과 함께 직접 설계했습니다.",
      },
      {
        label: "결과",
        body: "구조를 바꾼 뒤로는 요청이 몰려도 오류로 끊어지지 않고 순차적으로 처리되어, 처음 목표했던 11일이라는 짧은 기간 안에 서비스를 안정적으로 완성할 수 있었습니다.",
      },
      {
        label: "느낀 점",
        body: "외부 API에 크게 의존하는 서버는 코드가 올바르게 동작하는 것만으로는 부족하고, 요청이 얼마나 몰릴 때 얼마나 빠르게 처리할 수 있는지까지 미리 설계해야 한다는 것을 직접 겪으며 배웠습니다.",
      },
    ],
  },
];

// Projects 섹션 맨 아래에 보여줄 마무리 문단입니다.
export const closingStatement = {
  title: "배운 점과 성장 방향",
  body: [
    "세 프로젝트를 관통하는 흐름은 구조를 설계하고 방어하는 엔지니어라는 관점이었습니다. UFW·Fail2Ban으로 침입 시도를 걸러내고, IAM·KMS로 최소권한을 설정하고, VPC·망분리로 단계별 차단을 설계하는 습관을 길렀습니다.",
    "SK쉴더스 Cloud Security Lab에서는 이 구조를 반대로 제가 설계한 방어가 실제로 뚫릴 수 있는지를 공격자 관점에서 진단해보고, VPC·망분리 설계부터 OWASP Top 10:2025 기반의 권한 탈취→DB 피벗 시나리오까지 경험하여, '구축할 수 있고 진단도 할 수 있는 엔지니어'로 성장하고자 합니다.",
  ],
};
