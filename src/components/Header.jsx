import React from "react";

export default function Header() {
  return (
    <header className="py-6 text-center">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
        Snippy
      </h2>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        A modern, open code snippet collection
      </p>
    </header>
  );
}