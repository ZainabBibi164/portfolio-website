import { useState } from "react";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import React from "react";

function Blog({ isDarkMode, navbarHeight }) {
  const sampleBlogs = [
    {
      id: "1",
      title: "My First Coding Project",
      date: "2023-03-15",
      excerpt: "The journey of diving into code, battling bugs, and discovering my love for programming.",
      content:
        "My first coding project involved building management systems using C++, OOP, and DSA. It taught me the importance of core logic building and understanding what coding really means. The project was challenging, but I pushed through — learning to write clean code and debug efficiently. It laid the foundation for my passion in software engineering.",
    },
    {
      id: "2",
      title: "Building with Flutter",
      date: "2025-04-10",
      excerpt: "Discovering the power of Flutter and how it shaped the direction of my app development journey.",
      content:
        "Flutter’s widget-based architecture and hot reload made prototyping fast and enjoyable. I developed a Local Service Provider app using Firebase as the backend, which gave me hands-on experience with real-world app development. This project helped me realize that mobile development is my calling — and inspired me to choose it for my Final Year Project. And honestly? This is just the beginning!",
    },
  ];

  const [activeBlog, setActiveBlog] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-start px-4 py-16 bg-transparent relative"
      style={{ paddingTop:  `calc(${navbarHeight}px + 2rem)` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-indigo dark:text-teal mb-8 typing-effect "
          aria-label="Blog Section" 
        >
          My Blog
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-900 dark:text-cream max-w-3xl mx-auto leading-relaxed">
          Sharing my journey as a Software Engineering student, with insights, challenges, and technical discoveries.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {sampleBlogs.length === 0 ? (
          <p className="text-gray-900 dark:text-cream text-center col-span-full" aria-label="No blogs found">
            No blog posts available yet.
          </p>
        ) : (
          sampleBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ boxShadow: "0 10px 20px rgba(75, 94, 170, 0.4)" }}
              className="card p-6 cursor-pointer bg-white dark:bg-gray-800 border-2 border-gradient relative overflow-hidden"
              onClick={() => setActiveBlog(blog.id === activeBlog ? null : blog.id)}
              role="article"
              aria-label={`Blog: ${blog.title}`}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-indigo dark:text-teal mb-2 typing-effect">
                {blog.title}
              </h3>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                <FaClock className="mr-2 text-coral dark:text-cream" /> {blog.date}
              </div>
              <p className="text-gray-900 dark:text-cream text-sm sm:text-base mb-4">{blog.excerpt}</p>
              {activeBlog === blog.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-900 dark:text-cream text-sm sm:text-base blog-content"
                >
                  {blog.content}
                </motion.p>
              )}
              <div
                className="text-coral dark:text-coral-light hover:underline text-sm sm:text-base mt-2"
                aria-label={activeBlog === blog.id ? "Hide blog content" : "Read more"}
              >
                {activeBlog === blog.id ? "Hide" : "Read More"}
              </div>
              <div className={`tech-orb ${isDarkMode ? "bg-teal" : "bg-coral"}`} />
            </motion.div>
          ))
        )}
      </div>
      <div className="wave-bg" />
    </section>
  );
}

export default Blog;