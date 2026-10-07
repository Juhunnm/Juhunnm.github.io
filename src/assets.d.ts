// vite/client의 이미지 모듈 선언은 소문자 확장자(.jpg)만 포함합니다.
// 카메라/스캔 파일처럼 대문자 확장자(.JPG)로 저장된 이미지를 import할 수 있게 추가합니다.
declare module "*.JPG" {
  const src: string;
  export default src;
}
