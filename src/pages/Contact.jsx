import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import confetti from "canvas-confetti";

function Contact({ isDarkMode, navbarHeight }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);

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

      // Send email via EmailJS
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      // Save to Firestore
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date().toISOString(),
        emailStatus: "sent",
      });

      // Trigger confetti on success
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setSuccess("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(`❌ ${err.message || "Failed to send message. Please try again."}`);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Particles initialization
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Typing effect for heading
  const headingText = "Get in Touch";
  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Input classes
  const inputClasses =
    "w-full px-4 py-3 border border-transparent rounded-xl bg-white/10 dark:bg-gray-800/10 text-gray-900 dark:text-cream text-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-coral focus:border-teal/50 transition-all shadow-inner";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-cream/50 via-white to-coral/5 dark:from-gray-900/50 dark:via-gray-800 dark:to-teal/5 relative overflow-hidden"
      style={{ paddingTop: navbarHeight }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: isDarkMode ? "#2EC4B6" : "#FF6B6B" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "none", random: true },
            line_linked: { enable: true, distance: 150, color: isDarkMode ? "#2EC4B6" : "#FF6B6B", opacity: 0.2, width: 1 },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
            modes: { grab: { distance: 200, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Glowing Orb */}
      <motion.div
        className={`absolute w-40 h-40 rounded-full blur-2xl opacity-20 ${isDarkMode ? "bg-teal" : "bg-coral"}`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", right: "10%" }}
      />

      {/* Animated Heading with Typing Effect */}
      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-indigo dark:text-teal mb-12 drop-shadow-2xl relative z-10"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        {headingText.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        <motion.div
          className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-coral to-teal"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.h2>

      {/* Form with Tilt Effect */}
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} className="w-full max-w-lg z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="relative bg-white/10 dark:bg-gray-800/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 dark:border-teal/20 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glowing Border Effect */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-2xl"
            animate={{
              borderColor: ["rgba(255,107,107,0.5)", "rgba(46,196,182,0.5)", "rgba(75,94,170,0.5)", "rgba(255,107,107,0.5)"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Name Input */}
          <div className="relative mb-6">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              required
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all duration-300 transform origin-left pointer-events-none"
              style={{ transform: formData.name ? "translateY(-1.5rem) scale(0.75)" : "translateY(0) scale(1)" }}
            >
              Your Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all duration-300 transform origin-left pointer-events-none"
              style={{ transform: formData.email ? "translateY(-1.5rem) scale(0.75)" : "translateY(0) scale(1)" }}
            >
              Your Email
            </label>
          </div>

          {/* Message Input */}
          <div className="relative mb-6">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={inputClasses}
              required
              placeholder=" "
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-3 text-gray-500 dark:text-gray-300 text-sm transition-all duration-300 transform origin-left pointer-events-none"
              style={{ transform: formData.message ? "translateY(-1.5rem) scale(0.75)" : "translateY(0) scale(1)" }}
            >
              Your Message
            </label>
          </div>

          {/* Error/Success Messages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: error || success ? 1 : 0, y: error || success ? 0 : 10 }}
            className="mb-6"
          >
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-teal text-sm text-center">{success}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(46,196,182,0.5)" }}
            whileTap={{ scale: 0.95 }}
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
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.form>
      </Tilt>

      {/* Wave Background */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-coral/20 to-teal/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </section>
  );
}

export default Contact;