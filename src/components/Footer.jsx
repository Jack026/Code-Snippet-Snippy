import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope,FaGlobe } from "react-icons/fa";

function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <a href="mailto:souravjyotisahariah@gmail.com" target="_blank" rel="noopener noreferrer">
        <FaEnvelope className="text-gray-500 dark:text-gray-400 hover:text-blue-500" size={20} />
      </a>
      <a href="https://github.com/jack026" target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-gray-500 dark:text-gray-400 hover:text-black" size={20} />
      </a>
      <a href="https://linkedin.com/sourav-jyoti-sahariah" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-gray-500 dark:text-gray-400 hover:text-blue-700" size={20} />
      </a>
      <a href="https://sjs-protfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
        <FaGlobe className="text-gray-500 dark:text-gray-400 hover:text-green-500" size={20} />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Snippy. Made By SJS Creation.
      <SocialLinks />
    </footer>
  );
}