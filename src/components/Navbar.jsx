import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar({ isDarkMode, toggleDarkMode, setNavbarHeight }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
     { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (navRef.current) {
      setNavbarHeight(navRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (navRef.current) {
        setNavbarHeight(navRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setNavbarHeight, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 left-0 w-full bg-cream/90 dark:bg-gray-900/90 shadow-lg z-50 navbar"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1
          className="text-base sm:text-lg md:text-xl font-bold text-indigo dark:text-cream"
          aria-label="Zainab Bibi's Portfolio"
        >
          Zainab Bibi
        </h1>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm md:text-base text-gray-900 dark:text-cream hover:text-coral dark:hover:text-coral-light transition-colors"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileFocus={{ scale: 1.1 }}
            onClick={toggleDarkMode}
            className="text-gray-900 dark:text-cream hover:text-coral dark:hover:text-coral-light text-base"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </motion.button>
          <button
            className="md:hidden text-gray-900 dark:text-cream text-base"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <motion.div
        initial="hidden"
        animate={isMenuOpen ? "visible" : "hidden"}
        variants={menuVariants}
        className="md:hidden bg-cream/95 dark:bg-gray-900/95 shadow-md z-50"
      >
        <div className="flex flex-col items-center space-y-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleMenu}
              className="text-sm font-semibold text-gray-900 dark:text-coral-light hover:text-coral dark:hover:text-teal transition-colors px-4 py-2 rounded-md"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default NavBar;