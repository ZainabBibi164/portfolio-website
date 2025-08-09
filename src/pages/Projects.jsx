import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

function Projects({ isDarkMode, navbarHeight }) {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/ZainabBibi164/repos", {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: process.env.REACT_APP_GITHUB_TOKEN
              ? `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
              : undefined,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          }
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const data = await response.json();
        const projectList = data
          .filter((repo) => !repo.name.toLowerCase().includes("labtask"))
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            category: determineCategory(repo.name, repo.description || ""),
            description: repo.description || "No description available",
            link: repo.html_url,
            image: `https://picsum.photos/seed/${repo.id}/400/300`, // Dynamic placeholder
            techStack: extractTechStack(repo.description || "", repo.language || ""),
          }));

        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const determineCategory = (name, description) => {
    const lowerName = name.toLowerCase();
    const lowerDesc = description.toLowerCase();
    if (lowerName.includes("portfolio") || lowerDesc.includes("web")) return "Web";
    if (lowerDesc.includes("mobile")) return "Mobile";
    if (lowerDesc.includes("backend")) return "Backend";
    return "Other";
  };

  const extractTechStack = (description, language) => {
    const techKeywords = [
      "React", "Node.js", "Python", "JavaScript", "TypeScript", "HTML", "CSS",
      "Express", "MongoDB", "SQL", "GraphQL", "Next.js", "Angular", "Vue"
    ];
    const detected = techKeywords.filter(tech => 
      description.toLowerCase().includes(tech.toLowerCase()) || 
      language.toLowerCase().includes(tech.toLowerCase())
    );
    return detected.length > 0 ? detected : [language || "Unknown"];
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="p-5 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg">
          <div className="w-full h-48 rounded-lg bg-gray-200 animate-pulse mb-4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 dark:text-red-400 text-center py-10 text-base"
        role="alert"
      >
        {error}
      </motion.div>
    );
  }

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-start px-4 py-16 bg-gradient-to-b from-cream/50 via-white to-coral/5 dark:from-gray-900/50 dark:via-gray-800 dark:to-teal/5 relative"
      style={{ paddingTop: `calc(${navbarHeight}px + 4rem)` }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-indigo dark:text-teal mb-8 drop-shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        My Project Journey
      </motion.h2>
      <motion.p
        className="text-base sm:text-lg text-gray-900 dark:text-cream mb-12 text-center max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Explore my coding adventures — each project is a chapter of challenges, solutions, and growth, pulled live from my GitHub.
      </motion.p>
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {["all", "Web", "Mobile", "Backend", "Other"].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(46,196,182,0.7)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(category)}
            className={`px-6 py-3 text-base rounded-full font-medium text-gray-900 dark:text-cream ${
              filter === category 
                ? "bg-gradient-to-r from-coral to-teal dark:from-coral-dark dark:to-teal" 
                : "bg-white/70 dark:bg-gray-800/70 hover:bg-coral-light/30"
            } border border-teal/50 backdrop-blur-md transition-all duration-300`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
      <AnimatePresence>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {filteredProjects.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-900 dark:text-cream text-center col-span-full text-lg"
              >
                No projects found for this category.
              </motion.p>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 15px 30px rgba(75,94,170,0.4)",
                    transition: { duration: 0.3 }
                  }}
                  className="p-6 flex flex-col bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md border border-teal/30 relative overflow-hidden"
                >
                  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                    <LazyLoadImage
                      src={project.image}
                      alt={`${project.title} preview`}
                      effect="blur"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      placeholderSrc="https://picsum.photos/seed/placeholder/400/300"
                      onError={(e) => {
                        console.error(`Failed to load image: ${project.image}`);
                        e.target.src = "https://picsum.photos/seed/fallback/400/300";
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 text-sm text-white bg-teal rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-indigo dark:text-teal mb-2">{project.title}</h3>
                  <p className="text-gray-900 dark:text-cream text-sm mb-4 flex-grow line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-coral/20 dark:bg-coral-dark/20 text-coral dark:text-coral-light rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-coral dark:text-coral-light hover:text-coral-dark text-base font-medium transition-colors duration-300"
                  >
                    View on GitHub →
                  </a>
                  <motion.div
                    className={`absolute w-32 h-32 rounded-full blur-2xl opacity-10 ${isDarkMode ? "bg-teal" : "bg-coral"}`}
                    style={{ top: "-20px", right: "-20px" }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;