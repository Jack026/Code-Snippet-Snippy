import React, { useState } from "react";

const languages = [
  "javascript", "python", "typescript", "css", "html", "java", "csharp", "cpp", "go", "ruby"
];

export default function AddSnippetModal({ open, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    onAdd({ title, code, language });
    setTitle("");
    setCode("");
    setLanguage("javascript");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add a Snippet</h2>
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Title
          <input
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 mt-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Snippet title"
          />
        </label>
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Language
          <select
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 mt-1"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </label>
        <label className="block mb-4 font-medium text-gray-700 dark:text-gray-300">
          Code
          <textarea
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 mt-1 font-mono"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
            rows={6}
            placeholder="Paste your code here"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}