import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300">
            <div className="container mx-auto flex items-center justify-between h-full px-4">
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                    ✨ Snippet<span className="text-[#43cea2]">Designer</span>
                </div>
                <label className="flex items-center cursor-pointer">
                    <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {darkMode ? 'Dark' : 'Light'} Mode
                    </span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="sr-only"
                        />
                        <div className="block bg-gray-300 dark:bg-gray-700 w-14 h-8 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${darkMode ? 'transform translate-x-6 bg-gray-900' : ''}`}></div>
                    </div>
                </label>
            </div>
        </header>
    );
};

