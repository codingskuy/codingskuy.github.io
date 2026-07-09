import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ActivityTransparencySection } from "./components/ActivityTransparencySection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ScrollSmoother } from "@/components/ScrollSmoother";
import logo from "@/assets/ic_logo_codingskuy.png";
import { HeroSection } from "./components/HeroSection";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { AboutSection } from "./components/AboutSection";
import { MetricsSection } from "./components/MetricsSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { MediaHubSection } from "./components/MediaHubSection";
import { LearningPathsSection } from "./components/LearningPathsSection";
import { AILabSection } from "./components/AILabSection";
import { OpenSourceSection } from "./components/OpenSourceSection";
import { ContentLibrarySection } from "./components/ContentLibrarySection";
import { CommunitySection } from "./components/CommunitySection";
import { NewsletterSection } from "./components/NewsletterSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logo;
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDark = () => setDarkMode((prev) => !prev);

  return (
    <div
      className="min-h-screen"
      style={{
        background: darkMode ? "#060b18" : "#f0f4ff",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <ScrollSmoother />
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />

      <main>
        <HeroSection darkMode={darkMode} />
        <AboutSection darkMode={darkMode} />
        <ShowcaseSection darkMode={darkMode} />
        <MetricsSection darkMode={darkMode} />
        <ActivityTransparencySection darkMode={darkMode}/>
        <LearningPathsSection darkMode={darkMode} />
        <PhilosophySection darkMode={darkMode}/>
        <PortfolioSection darkMode={darkMode} />
        <MediaHubSection darkMode={darkMode} />
        <ContentLibrarySection darkMode={darkMode} />
        <AILabSection darkMode={darkMode} />
        <CommunitySection darkMode={darkMode} />
        <OpenSourceSection darkMode={darkMode} />
        <NewsletterSection darkMode={darkMode} />
        {/* <ContactSection darkMode={darkMode} /> */}
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
