import { useEffect, useState } from "react";

const STORAGE_KEY = "Snippy_snippets";

export function useSnippets() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setSnippets(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = (snippet) => setSnippets(prev => [...prev, snippet]);

  return { snippets, addSnippet };
}