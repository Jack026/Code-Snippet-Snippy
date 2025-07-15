import React, { useState } from "react";
import AddSnippetModal from "../components/AddSnippetModal";
import SnippetCard from "../components/SnippetCard";
import { useSnippets } from "../hooks/useSnippets";

export default function Home() {
  const { snippets, addSnippet } = useSnippets();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Code Snippets</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition"
          onClick={() => setShowModal(true)}
        >
          + Add Snippet
        </button>
      </div>
      {snippets.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-16">
          No snippets yet. Click "Add Snippet" to create your first!
        </div>
      ) : (
        snippets.map((snip, idx) => <SnippetCard key={idx} snippet={snip} />)
      )}
      <AddSnippetModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={addSnippet}
      />
    </main>
  );
}