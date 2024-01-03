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
      <main className="p-2 mt-[92px]">
        <HeroSection />
        <FeatureSection />
        <AboutSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
