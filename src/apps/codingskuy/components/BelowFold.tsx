import { ActivityTransparencySection } from "./ActivityTransparencySection";
import { PhilosophySection } from "./PhilosophySection";
import { ShowcaseSection } from "./ShowcaseSection";
import { AboutSection } from "./AboutSection";
import { PortfolioSection } from "./PortfolioSection";
import { MediaHubSection } from "./MediaHubSection";
import { LearningPathsSection } from "./LearningPathsSection";
import { AILabSection } from "./AILabSection";
import { OpenSourceSection } from "./OpenSourceSection";
import { ContentLibrarySection } from "./ContentLibrarySection";
import { CommunitySection } from "./CommunitySection";
import { Footer } from "./Footer";

// Everything below the first screen ships as one deferred chunk so the hero
// can paint without waiting for it.
export default function BelowFold({ darkMode }: { darkMode: boolean }) {
  return (
    <>
      <AboutSection darkMode={darkMode} />
      <ShowcaseSection darkMode={darkMode} />
      <ActivityTransparencySection darkMode={darkMode} />
      <LearningPathsSection darkMode={darkMode} />
      <PhilosophySection darkMode={darkMode} />
      <PortfolioSection darkMode={darkMode} />
      <MediaHubSection darkMode={darkMode} />
      <ContentLibrarySection darkMode={darkMode} />
      <AILabSection darkMode={darkMode} />
      <CommunitySection darkMode={darkMode} />
      <OpenSourceSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </>
  );
}
