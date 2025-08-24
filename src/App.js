import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavBar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import "./styles/index.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const pageMeta = {
    "/": {
      title: "Zainab Bibi | Software Engineer Portfolio",
      description: "Explore Zainab Bibi's portfolio, showcasing web and mobile development projects built with React, Flutter, and Firebase.",
    },
    "/projects": {
      title: "Zainab Bibi | Projects",
      description: "Discover Zainab Bibi's coding projects, featuring real-world applications from GitHub, built with modern technologies.",
    },
    "/contact": {
      title: "Zainab Bibi | Contact",
      description: "Get in touch with Zainab Bibi to discuss collaboration, projects, or opportunities in software engineering.",
    },
    "/blog": {
      title: "Zainab Bibi | Blog",
      description: "Read Zainab Bibi's blog for insights, challenges, and technical discoveries from her software engineering journey.",
    },
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div
          className="min-h-screen"
          role="main"
          aria-label="Portfolio Content"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #689fc4ff 0%, #042925ff 100%)"
              : "linear-gradient(135deg, #ff8d79ff 0%, #ff7070ff 100%)",
            backgroundSize: "200% 200%",
            animation: reducedMotion ? "none" : "gradientFlow 15s ease-in-out infinite",
          }}
        >
          {!reducedMotion && <ParticlesBackground />}
          <Helmet>
            <title>{pageMeta["/"].title}</title>
            <meta name="description" content={pageMeta["/"].description} />
          </Helmet>
          <NavBar
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            setNavbarHeight={setNavbarHeight}
          />
          
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Helmet>
                      <title>{pageMeta["/"].title}</title>
                      <meta name="description" content={pageMeta["/"].description} />
                    </Helmet>
                    <Home isDarkMode={isDarkMode} navbarHeight={navbarHeight} />
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <Helmet>
                      <title>{pageMeta["/projects"].title}</title>
                      <meta name="description" content={pageMeta["/projects"].description} />
                    </Helmet>
                    <Projects isDarkMode={isDarkMode} navbarHeight={navbarHeight} />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Helmet>
                      <title>{pageMeta["/contact"].title}</title>
                      <meta name="description" content={pageMeta["/contact"].description} />
                    </Helmet>
                    <Contact isDarkMode={isDarkMode} navbarHeight={navbarHeight} />
                  </>
                }
              />
              <Route
                path="/blog"
                element={
                  <>
                    <Helmet>
                      <title>{pageMeta["/blog"].title}</title>
                      <meta name="description" content={pageMeta["/blog"].description} />
                    </Helmet>
                    <Blog isDarkMode={isDarkMode} navbarHeight={navbarHeight} />
                  </>
                }
              />
            </Routes>
          
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;