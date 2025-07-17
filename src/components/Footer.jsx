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
      <a href="https://souravjyotisahariah.site" target="_blank" rel="noopener noreferrer">
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
const FooterWithDarkMode = ({ darkMode }) => {
  return (
    <footer className="relative bottom-0 left-0 right-0 z-40 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/10 py-4 transition-colors duration-300">
      <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Designed with ❤️. Create and share beautiful code snippets.</p>
        <p>© {new Date().getFullYear()} SnippetDesigner. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
