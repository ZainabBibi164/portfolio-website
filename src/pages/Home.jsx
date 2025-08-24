import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaFileDownload, FaEnvelope } from "react-icons/fa";
import { SiFlutter, SiFirebase, SiJavascript } from "react-icons/si";

function TechOrb({ isDarkMode, style }) {
  return (
    <div className={`tech-orb ${isDarkMode ? "bg-teal" : "bg-coral"}`} style={style} />
  );
}

function Home({ isDarkMode, navbarHeight, reducedMotion }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const lines = useMemo(() => [
    "Hi, I'm Zainab 👋",
    "Flutter Developer 📱",
    "Software Engineer 💻",
    "Innovative Developer 💡",
  ], []);

  useEffect(() => {
    let index = 0;
    let currentText = "";
    let timeoutId = null;

    const type = () => {
      if (lines.length === 0) return; // Error handling: Skip if lines is empty

      if (index < lines[currentLine].length) {
        currentText = lines[currentLine].slice(0, index + 1);
        setText(currentText);
        index++;
        timeoutId = setTimeout(type, 120);
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          index = 0;
          currentText = "";
          setCurrentLine((prev) => (prev + 1) % lines.length);
        }, 1500);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [currentLine, lines]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, duration: 0.8 } },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  }), []);

  const cubeVariants = useMemo(() => ({
    hidden: { opacity: 0, rotateX: 0, rotateY: 0 },
    visible: {
      opacity: 1,
      rotateX: reducedMotion ? 0 : 360,
      rotateY: reducedMotion ? 0 : 360,
      transition: { duration: 20, repeat: reducedMotion ? 0 : Infinity, ease: "linear" },
    },
  }), [reducedMotion]);

  const footerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }), []);

  const quoteVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  }), []);

  const skills = useMemo(() => [
    { name: "JavaScript", icon: <SiJavascript className="text-3xl sm:text-4xl text-coral dark:text-white" aria-hidden="true" />, proficiency: "Advanced" },
    { name: "React", icon: <FaReact className="text-3xl sm:text-4xl text-teal dark:text-white" aria-hidden="true" />, proficiency: "Expert" },
    { name: "Flutter", icon: <SiFlutter className="text-3xl sm:text-4xl text-indigo dark:text-white" aria-hidden="true" />, proficiency: "Expert" },
    { name: "Firebase", icon: <SiFirebase className="text-3xl sm:text-4xl text-coral dark:text-white" aria-hidden="true" />, proficiency: "Advanced" },
    { name: "Node.js", icon: <FaNodeJs className="text-3xl sm:text-4xl text-teal dark:text-white" aria-hidden="true" />, proficiency: "Intermediate" },
    { name: "Python", icon: <FaPython className="text-3xl sm:text-4xl text-indigo dark:text-white" aria-hidden="true" />, proficiency: "Intermediate" },
    { name: "HTML", icon: <FaHtml5 className="text-3xl sm:text-4xl text-coral dark:text-white" aria-hidden="true" />, proficiency: "Expert" },
    { name: "CSS", icon: <FaCss3Alt className="text-3xl sm:text-4xl text-teal dark:text-white" aria-hidden="true" />, proficiency: "Expert" },
  ], []);

  return (
    <div className="relative">
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 glassmorphic-container"
        style={{ paddingTop: navbarHeight, paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 typing-effect relative"
            aria-label="Zainab Bibi's Introduction"
            aria-live="polite"
          >
            {text}
            <AnimatePresence>
              {isTyping && (
                <motion.span
                  className="absolute right-0 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                >
                  |
                </motion.span>
              )}
            </AnimatePresence>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-900 dark:text-cream mb-6 leading-relaxed"
          >
            A passionate Software Engineering student at Superior University Lahore, Pakistan, specializing in web and mobile flutter development. I love creating innovative solutions with modern technologies like React, Flutter, and Firebase.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.a
              whileHover={{ y: -2 }}
              whileFocus={{ y: -2 }}
              href="https://github.com/ZainabBibi164"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-coral text-gray-900 dark:text-cream rounded-md hover:bg-coral-dark dark:hover:text-coral-light transition-colors text-sm sm:text-base border-2 border-gradient"
              aria-label="Visit Zainab's GitHub profile"
            >
              <FaGithub className="mr-2 inline text-gray-900 dark:text-white" /> GitHub
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileFocus={{ y: -2 }}
              href="https://www.linkedin.com/in/zainab-bibi73bb/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo text-gray-900 dark:text-cream rounded-md hover:bg-indigo-dark dark:hover:text-coral-light transition-colors text-sm sm:text-base border-2 border-gradient"
              aria-label="Visit Zainab's LinkedIn profile"
            >
              <FaLinkedin className="mr-2 inline text-gray-900 dark:text-white" /> LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileFocus={{ y: -2 }}
              href="/assets/ZainabBibi_CV.pdf"
              download
              className="px-4 py-2 bg-teal text-gray-900 dark:text-cream rounded-md hover:bg-teal-dark dark:hover:text-coral-light transition-colors text-sm sm:text-base border-2 border-gradient"
              aria-label="Download Zainab's CV"
            >
              <FaFileDownload className="mr-2 inline text-gray-900 dark:text-white" /> Download CV
            </motion.a>
          </motion.div>
        </motion.div>
        <TechOrb isDarkMode={isDarkMode} style={{ top: "20px", right: "20px" }} />
        <div className="wave-bg" aria-hidden="true" />
      </section>

      <section className="py-16 px-4 glassmorphic-container relative" style={{ paddingTop: navbarHeight }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-indigo dark:text-white mb-4 typing-effect"
            aria-label="Skills Section"
          >
            My Tech Arsenal
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-900 dark:text-cream max-w-3xl mx-auto leading-relaxed">
            A collection of tools and technologies I wield to build innovative web and mobile solutions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(14, 35, 121, 0.4)" }}
              className="card p-6 flex flex-col items-center bg-white/15 dark:bg-white-100/15 border-2 border-transparent hover:border-gradient"
              role="article"
              aria-label={`Skill: ${skill.name}, Proficiency: ${skill.proficiency}`}
            >
              {skill.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-indigo dark:text-teal mt-4">{skill.name}</h3>
              <p className="text-sm text-gray-900 dark:text-cream">{skill.proficiency}</p>
              <TechOrb isDarkMode={isDarkMode} style={{}} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="cube-container mt-12 mx-auto w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]"
          initial="hidden"
          animate="visible"
          variants={cubeVariants}
        >
          <div className="cube w-full h-full relative transform-style-3d">
            <motion.div
              className="cube-face front absolute w-full h-full bg-white/20 backdrop-blur-md border-2 border-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              <FaReact className="text-4xl sm:text-5xl text-teal dark:text-white" />
            </motion.div>
            <motion.div
              className="cube-face back absolute w-full h-full bg-white/20 backdrop-blur-md border-2 border-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              <SiFlutter className="text-4xl sm:text-5xl text-indigo dark:text-white" />
            </motion.div>
            <motion.div
              className="cube-face right absolute w-full h-full bg-white/20 backdrop-blur-md border-2 border-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              <SiFirebase className="text-4xl sm:text-5xl text-coral dark:text-white" />
            </motion.div>
            <motion.div
              className="cube-face left absolute w-full h-full bg-white/20 backdrop-blur-md border-2 border-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              <FaNodeJs className="text-4xl sm:text-5xl text-teal dark:text-white" />
            </motion.div>
            <motion.div
              className="cube-face top absolute w-full h-full bg-white/20 backdrop-blur-md border-2 border-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              <SiJavascript className="text-4xl sm:text-5xl text-coral dark:text-white" />
            </motion.div>
            <motion.div
              className="cube-face bottom absolute w-full h-full bg-white/20 backdrop-blur-md border-2 border-gradient flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
            >
              <FaPython className="text-4xl sm:text-5xl text-indigo dark:text-white" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 glassmorphic-container relative" style={{ paddingTop: navbarHeight }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-indigo dark:text-teal mb-4 typing-effect"
            aria-label="About Section"
          >
            About Me
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-gray-900 dark:text-cream mb-6 leading-relaxed"
          >
            I'm Zainab Bibi, a Software Engineering student from Lahore, Pakistan, currently in my 7th semester at Superior University. with a passion for crafting innovative digital solutions. My journey began with a curiosity for coding, leading me to master technologies like React, Flutter, and Firebase. I thrive on challenges, whether it's building responsive web apps or creating seamless mobile experiences. When I'm not coding, you can find me exploring new tech trends or sipping chai while brainstorming my next project. My goal? To build impactful software that makes a difference.
          </motion.p>
          <motion.a
            whileHover={{ y: -2 }}
            whileFocus={{ y: -2 }}
            href="/contact"
            className="px-4 py-2 bg-teal text-gray-900 dark:text-cream rounded-md hover:bg-teal-dark dark:hover:text-coral-light transition-colors text-sm sm:text-base border-2 border-gradient"
            aria-label="Navigate to Contact Page"
          >
            <FaEnvelope className="mr-2 inline text-gray-900 dark:text-white" /> Contact Me
          </motion.a>
          <TechOrb isDarkMode={isDarkMode} style={{ top: "20px", right: "20px" }} />
        </motion.div>
      </section>

      <section className="py-12 px-4 glassmorphic-container relative" style={{ paddingTop: navbarHeight }}>
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo dark:text-teal mb-4"
            aria-label="Motivational Quote"
          >
            &quot;Innovation distinguishes between a leader and a follower.&quot; – Steve Jobs
          </h2>
          <p className="text-sm sm:text-base text-gray-900 dark:text-cream">
            This quote inspires my approach to development, pushing me to create unique solutions in every project.
          </p>
          <TechOrb isDarkMode={isDarkMode} style={{ top: "20px", right: "20px" }} />
        </motion.div>
      </section>

      <footer className="py-8 px-4 glassmorphic-container relative" style={{ paddingTop: navbarHeight }}>
        <motion.div
          variants={footerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <div className="flex gap-4">
            <motion.a
              whileHover={{ y: -2 }}
              whileFocus={{ y: -2 }}
              href="https://github.com/ZainabBibi164"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-coral dark:hover:text-coral-light text-sm sm:text-base"
              aria-label="Visit Zainab's GitHub profile"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileFocus={{ y: -2 }}
              href="https://www.linkedin.com/in/zainab-bibi73bb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-coral dark:hover:text-coral-light text-sm sm:text-base"
              aria-label="Visit Zainab's LinkedIn profile"
            >
              <FaLinkedin size={24} />
            </motion.a>
          </div>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-900 dark:text-cream"
          >
            &copy; {new Date().getFullYear()} Zainab Bibi. All rights reserved.
          </motion.p>
          <TechOrb isDarkMode={isDarkMode} style={{ top: "20px", right: "20px" }} />
        </motion.div>
      </footer>
    </div>
  );
}

export default Home;