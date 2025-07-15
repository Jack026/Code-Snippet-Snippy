import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../hooks/useTheme";

export default function SnippetCard({ snippet }) {
  const { theme } = useTheme();

  return (
    <div className="rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 shadow-lg mb-4 border border-gray-200 dark:border-gray-800">
      <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
        {snippet.title}
      </h3>
      <SyntaxHighlighter
        language={snippet.language}
        style={theme === "dark" ? materialDark : materialLight}
        customStyle={{ borderRadius: "0.5rem", padding: "1rem", fontSize: "1rem" }}
      >
        {snippet.code}
      </SyntaxHighlighter>
      <div className="flex justify-end mt-4">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-2 py-1 rounded text-xs">
          {snippet.language}
        </span>
      </div>
    </div>
  );
}