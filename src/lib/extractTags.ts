// src/lib/extractTags.ts
// 프로젝트 본문(제목+항목)에 실제로 등장하는 기술 키워드만 태그로 뽑아냅니다.
// 데이터에 없는 키워드를 지어내지 않기 위해, 고정된 후보 목록 중 본문에 "실제로 포함된" 것만 통과시킵니다.
const KNOWN_KEYWORDS = [
  "Docker",
  "AWS",
  "CI/CD",
  "GitHub Actions",
  "IAM",
  "MFA",
  "KMS",
  "CloudWatch",
  "Lambda",
  "SNS",
  "Slack",
  "OpenSSH",
  "UFW",
  "Fail2Ban",
  "Cloudflare",
  "NPU",
] as const;

export function extractTags(text: string): string[] {
  return KNOWN_KEYWORDS.filter((keyword) => text.includes(keyword));
}
