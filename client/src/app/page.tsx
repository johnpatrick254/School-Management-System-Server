import AboutSection from "@/components/landing-page/AboutSection";
import FeatureSection from "@/components/landing-page/FeatureSection";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import TeamSection from "@/components/landing-page/TeamSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <HeroSection />
        <FeatureSection />
        <AboutSection />
        <TeamSection />
      </main>
      <div className="relative pt-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          fill="#07102c"
          className="absolute -bottom-0.5"
        >
          <path d="M0,256L80,261.3C160,267,320,277,480,261.3C640,245,800,203,960,181.3C1120,160,1280,160,1360,160L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      <Footer />
    </>
  );
}
