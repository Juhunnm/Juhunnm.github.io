import { Hero } from "./components/Hero";
import Info from "./components/Info";
import { Timeline } from "./components/Timeline";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <>
      <Hero />

      <main>
        {/* 메인화면 */}
        <Info />

        {/* 기본 정보 */}
        <Timeline />

        {/* 프로젝트 목차 */}
        <Projects />

        <Contact />
      </main>
    </>
  );
}
