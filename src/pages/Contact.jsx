import  { useState } from "react";
import React from "react";
import { loadFull } from "tsparticles";


import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import confetti from "canvas-confetti";

function Contact({ isDarkMode, navbarHeight }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const FORM_URL = "https://formspree.io/f/movloqea";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Invalid email address");
      }

      // Prepare form data
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("message", formData.message);

      // Send to Formspree
      const response = await fetch(FORM_URL, {
        method: "POST",
        body: formDataObj,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FF6B9A", "#2EC4B6", "#4B5EAA"], // softer pink shade
      });

      setSuccess("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(`❌ ${err.message || "Failed to send message. Please try again."}`);
      console.error("Formspree Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Particles initialization
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // Input classes
  const inputClasses =
    "w-full px-4 py-3 border border-transparent rounded-xl bg-white/20 dark:bg-gray-800/20 text-gray-900 dark:text-cream text-sm backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-teal/50 transition-all duration-300 shadow-inner placeholder-gray-400 dark:placeholder-gray-300";

  // Animation variants
  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#2EC4B6", transition: { duration: 0.3 } },
    blur: { scale: 1, borderColor: "transparent", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 20px rgba(46,196,182,0.7)" },
    tap: { scale: 0.95 },
    pulse: { boxShadow: "0 0 10px rgba(46,196,182,0.5), 0 0 20px rgba(46,196,182,0.3)" },
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-cream/50 via-white to-coral/5 dark:from-gray-900/50 dark:via-gray-800 dark:to-teal/5 relative overflow-hidden"
      style={{ paddingTop: navbarHeight }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 60, density: { enable: true, value_area: 1000 } },
            color: { value: isDarkMode ? "#2EC4B6" : "#FF6B6B" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 4, random: true },
            move: { enable: true, speed: 1.5, direction: "none", random: true },
            line_linked: {
              enable: true,
              distance: 120,
              color: isDarkMode ? "#2EC4B6" : "#FF6B6B",
              opacity: 0.3,
              width: 1.5,
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
            },
            modes: {
              grab: { distance: 200, line_linked: { opacity: 0.6 } },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        }}
        className="absolute inset-0 z-0"
      />
      <motion.div
        className={`absolute w-48 h-48 rounded-full blur-3xl opacity-25 ${
          isDarkMode ? "bg-teal" : "bg-coral"
        }`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", right: "10%" }}
      />
      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-indigo dark:text-teal mb-12 drop-shadow-2xl relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Get in Touch
        <motion.div
          className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-coral to-teal"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.h2>
      <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} scale={1.03} className="w-full max-w-lg z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="relative bg-white/15 dark:bg-gray-800/15 p-8 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/30 dark:border-teal/30 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-2xl"
            animate={{
              borderColor: [
                "rgba(255,107,107,0.6)",
                "rgba(46,196,182,0.6)",
                "rgba(75,94,170,0.6)",
                "rgba(255,107,107,0.6)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative mb-6">
            <motion.label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-500 dark:text-gray-200 text-sm transition-all duration-300 transform origin-left pointer-events-none"
              animate={{
                transform: formData.name ? "translateY(-1.5rem) scale(0.75)" : "translateY(0) scale(1)",
                color: formData.name ? "#2EC4B6" : isDarkMode ? "#d1d5dbff" : "#6B7280",
              }}
            >
              Your Name
            </motion.label>
            <motion.input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              required
          
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
            />
          </div>
          <div className="relative mb-6">
            <motion.label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 dark:text-gray-200 text-sm transition-all duration-300 transform origin-left pointer-events-none"
              animate={{
                transform: formData.email ? "translateY(-1.5rem) scale(0.75)" : "translateY(0) scale(1)",
                color: formData.email ? "#2EC4B6" : isDarkMode ? "#D1D5DB" : "#6B7280",
              }}
            >
              Your Email
            </motion.label>
            <motion.input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            
              variants={inputVariants}
              whileFocus="focus"
              animate="blur"
            />
          </div>
          <div className="relative mb-6">
            <motion.label
              htmlFor="message"
              className="absolute left-4 top-3 text-gray-500 dark:text-gray-200 text-sm transition-all duration-300 transform origin-left pointer-events-none"
              animate={{
                transform: formData.message ? "translateY(-1.5rem) scale(0.75)" : "translateY(0) scale(1)",
                color: formData.message ? "#2EC4B6" : isDarkMode ? "#D1D5DB" : "#6B7280",
              }}
            >
              Your Message
            </motion.label>
            <motion.textarea
              id="message"
              name="message"
             autoComplete="off"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={inputClasses}
            required
            variants={inputVariants}
            whileFocus="focus"
            animate="blur"
/>

            
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: error || success ? 1 : 0, y: error || success ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            {success && <p className="text-teal text-sm text-center font-medium">{success}</p>}
          </motion.div>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            animate="pulse"
            variants={buttonVariants}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gradient-to-r from-coral to-teal text-white font-semibold rounded-xl shadow-lg relative overflow-hidden"
          >
            <motion.span
              animate={{ opacity: isLoading ? 0.5 : 1 }}
              className="relative z-10"
            >
              {isLoading ? "Sending..." : "Send Message 🚀"}
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal to-coral opacity-0"
              whileHover={{ opacity: 0.4 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.form>
      </Tilt>
     
    </section>
  );
}

export default Contact;