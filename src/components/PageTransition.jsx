import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function PageTransition({ children, navbarHeight }) {
  const location = useLocation();
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Define route-specific animation variants
  const getVariants = (pathname) => {
    switch (pathname) {
      case "/":
        return {
          initial: { opacity: 0, scale: 0.9, y: 30 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: -30 },
          transition: { duration: 0.6, ease: "easeOut" },
        };
      case "/projects":
        return {
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -100 },
          transition: { duration: 0.5, ease: "easeInOut" },
        };
      case "/contact":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.4, ease: "linear" },
        };
      case "/blog":
        return {
          initial: { opacity: 0, scale: 0.8, rotate: 5 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          exit: { opacity: 0, scale: 0.8, rotate: -5 },
          transition: { duration: 0.7, ease: "easeOut" },
        };
      default:
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 },
          transition: { duration: 0.5 },
        };
    }
  };

  const variants = reducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : getVariants(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
        className="relative"
        style={{ paddingTop: navbarHeight }}
        role="region"
        aria-live="polite"
        aria-label="Page content"
      >
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: reducedMotion
              ? "transparent"
              : `linear-gradient(135deg, #FF6B6B 0%, #2EC4B6 50%, #4B5EAA 100%)`,
            backgroundSize: "200% 200%",
            animation: reducedMotion ? "none" : "gradientFlow 10s ease-in-out infinite",
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;