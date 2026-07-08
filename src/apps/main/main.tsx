
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import App from "./App.tsx";
import { ChefGenieLandingPage } from "@/apps/chefgenie/pages";
import { CodingSkuyLandingPage } from "@/apps/codingskuy/pages";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/index.css";

const normalizePath = (path: string) => {
  const cleaned = path.replace(/\/+$/, "");
  return cleaned || "/";
};

const getCurrentPath = () => {
  const hashValue = window.location.hash.slice(1);
  if (hashValue.startsWith("/")) {
    return normalizePath(hashValue);
  }

  return normalizePath(window.location.pathname);
};

function Root() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const syncRoute = () => {
      setCurrentPath(getCurrentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  if (currentPath === "/chefgenie") {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <ChefGenieLandingPage />
        </ThemeProvider>
      </LanguageProvider>
    );
  }

  if (currentPath === "/portfolio") {
    return <App />;
  }

  return (
    <LanguageProvider>
      <CodingSkuyLandingPage />
    </LanguageProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
  
