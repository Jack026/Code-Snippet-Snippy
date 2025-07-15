import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

// --- Helper Components (Header & Footer) ---

const Header = ({ darkMode, setDarkMode }) => (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between h-full px-6">
            <div className="text-lg font-bold text-gray-800 dark:text-white">
                ✨ Snip<span className="text-[#43cea2]">py</span>
            </div>
            <label className="flex items-center cursor-pointer">
                <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {darkMode ? 'Dark' : 'Light'}
                </span>
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        className="sr-only peer"
                        id="theme-toggle"
                    />
                    <div className="block bg-gray-300 dark:bg-gray-700 w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white peer-checked:bg-slate-800 w-6 h-6 rounded-full transition-transform duration-300 peer-checked:transform peer-checked:translate-x-6"></div>
                </div>
            </label>
        </div>
    </header>
);

const Footer = () => (
  <footer className="relative bottom-0 left-0 right-0 z-40 bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/10 py-4 transition-colors duration-300">
    <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
      <p>© {new Date().getFullYear()} Snippy. All Rights Reserved.</p>
      
      {/* Social Icons */}
      <div className="flex justify-center space-x-4 mt-4">
        <a href="mailto:souravjyotisahariah@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope className="text-gray-500 dark:text-gray-400 hover:text-blue-500" size={20} />
        </a>
        <a href="https://github.com/jack026" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-gray-500 dark:text-gray-400 hover:text-black" size={20} />
        </a>
        <a href="https://linkedin.com/in/sourav-jyoti-sahariah" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-gray-500 dark:text-gray-400 hover:text-blue-700" size={20} />
        </a>
        <a href="https://sjs-protfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
          <FaGlobe className="text-gray-500 dark:text-gray-400 hover:text-green-500" size={20} />
        </a>
      </div>
    </div>
  </footer>
);


// --- Main Component ---

export default function AdvancedSnippetDesigner() {
    // Language data: extension and SVG icon
    const languageMeta = {
        javascript: { ext: "js", icon: "JS" },
        python: { ext: "py", icon: "Py" },
        java: { ext: "java", icon: "Java" },
        c: { ext: "c", icon: "C" },
        cpp: { ext: "cpp", icon: "C++" },
        typescript: { ext: "ts", icon: "TS" },
        go: { ext: "go", icon: "Go" },
        ruby: { ext: "rb", icon: "Rb" },
        php: { ext: "php", icon: "PHP" },
        swift: { ext: "swift", icon: "Swift" },
        kotlin: { ext: "kt", icon: "Kt" },
        css: { ext: "css", icon: "CSS" },
        html: { ext: "html", icon: "HTML" },
        json: { ext: "json", icon: "JSON" },
        bash: { ext: "sh", icon: "SH" },
        markdown: { ext: "md", icon: "MD" },
    };

    const supportedLanguages = Object.keys(languageMeta);

    const gradientDirections = [
        { name: "Right", value: "to right" },
        { name: "Bottom", value: "to bottom" },
        { name: "Top Left", value: "to top left" },
        { name: "Bottom Right", value: "to bottom right" },
    ];

    const DEFAULT_CODE = `// Welcome to SnippetDesigner! ✨\nconst framework = "React";\nconst utility = "TailwindCSS";\n\nfunction createSnippet(code) {\n  console.log(\`Pasting some \${code}...\`);\n  return true;\n}`;

    // --- State Management ---
    const [darkMode, setDarkMode] = useState(false); // Dark mode on by default
    const [backType, setBackType] = useState("gradient");
    const [backColor1, setBackColor1] = useState("#43cea2");
    const [backColor2, setBackColor2] = useState("#185a9d");
    const [backGradientDir, setBackGradientDir] = useState("to bottom right");
    const [backRadius, setBackRadius] = useState(24);
    const [backOpacity, setBackOpacity] = useState(1);

    const [frontColor1, setFrontColor1] = useState("#0d1117");
    const [frontRadius, setFrontRadius] = useState(16);
    const [frontWidth, setFrontWidth] = useState(600);
    const [code, setCode] = useState(DEFAULT_CODE);
    const [language, setLanguage] = useState("javascript");
    const [editing, setEditing] = useState(false);
    const [fileName, setFileName] = useState("my-snippet");
    const previewRef = useRef();

    const getBackgroundStyle = (type, color1, color2, dir, opacity) => {
        const background = type === 'gradient'
            ? `linear-gradient(${dir}, ${color1}, ${color2})`
            : color1;
        return { background, opacity };
    };

    const handleDownload = async () => {
        if (!previewRef.current) return;
        const name = fileName.trim() || "snippet";
        try {
            const canvas = await html2canvas(previewRef.current, {
                backgroundColor: null,
                scale: 2, // Higher resolution
                useCORS: true,
            });
            const link = document.createElement("a");
            link.download = `${name}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (error) {
            console.error("Error generating canvas:", error);
        }
    };

    const fileIcon = languageMeta[language]?.icon || "📄";
    const fileExt = languageMeta[language]?.ext || "txt";
    const pageBackground = darkMode ? "bg-gray-900 text-gray-100" : "bg-slate-100 text-gray-800";

    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${pageBackground}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="flex flex-col md:flex-row flex-grow items-center justify-center gap-8 px-4 py-8 md:p-10 mt-16">
                {/* --- Left: Controls Panel --- */}
                <div className="flex flex-col gap-6 bg-white/50 dark:bg-gray-800/40 backdrop-blur-xl p-5 md:p-6 rounded-2xl shadow-lg w-full md:w-[340px] max-w-full border border-white/20 dark:border-black/10">
                    <h2 className="font-bold text-xl text-gray-800 dark:text-white">Customize</h2>

                    {/* Background Controls */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 border-b pb-1 border-gray-300/50 dark:border-gray-600/50">Canvas</h3>
                        <label className="flex items-center justify-between text-sm"><span>Type</span><select value={backType} onChange={e => setBackType(e.target.value)} className="bg-white/50 dark:bg-gray-700/50 rounded-md p-1 border-none"><option value="solid">Solid</option><option value="gradient">Gradient</option></select></label>
                        <label className="flex items-center justify-between text-sm"><span>Color 1</span><input type="color" value={backColor1} onChange={e => setBackColor1(e.target.value)} className="w-8 h-8 rounded-md" /></label>
                        {backType === 'gradient' && <>
                            <label className="flex items-center justify-between text-sm"><span>Color 2</span><input type="color" value={backColor2} onChange={e => setBackColor2(e.target.value)} className="w-8 h-8 rounded-md" /></label>
                            <label className="flex items-center justify-between text-sm"><span>Direction</span><select value={backGradientDir} onChange={e => setBackGradientDir(e.target.value)} className="bg-white/50 dark:bg-gray-700/50 rounded-md p-1 border-none">{gradientDirections.map(g => <option key={g.value} value={g.value}>{g.name}</option>)}</select></label>
                        </>}
                        <label className="flex flex-col gap-1 text-sm"><span>Radius: {backRadius}px</span><input type="range" min={0} max={64} value={backRadius} onChange={e => setBackRadius(Number(e.target.value))} /></label>
                        <label className="flex flex-col gap-1 text-sm"><span>Opacity: {backOpacity}</span><input type="range" min={0.1} max={1} step={0.05} value={backOpacity} onChange={e => setBackOpacity(Number(e.target.value))} /></label>
                    </div>

                    {/* Snippet Controls */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 border-b pb-1 border-gray-300/50 dark:border-gray-600/50">Snippet</h3>
                        <label className="flex items-center justify-between text-sm"><span>Language</span><select value={language} onChange={e => setLanguage(e.target.value)} className="bg-white/50 dark:bg-gray-700/50 rounded-md p-1 w-32 border-none">{supportedLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}</select></label>
                        <label className="flex items-center justify-between text-sm"><span>BG Color</span><input type="color" value={frontColor1} onChange={e => setFrontColor1(e.target.value)} className="w-8 h-8 rounded-md" /></label>
                        <label className="flex flex-col gap-1 text-sm"><span>Width: {frontWidth}px</span><input type="range" min={400} max={1000} step={10} value={frontWidth} onChange={e => setFrontWidth(Number(e.target.value))} /></label>
                        <label className="flex flex-col gap-1 text-sm"><span>Radius: {frontRadius}px</span><input type="range" min={0} max={48} value={frontRadius} onChange={e => setFrontRadius(Number(e.target.value))} /></label>
                    </div>

                    <button className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white py-2.5 px-4 rounded-lg font-bold mt-4 hover:scale-105 hover:shadow-xl transition-all duration-200" onClick={handleDownload}>Download PNG</button>
                </div>

                {/* --- Right: Preview Area --- */}
                <div className="flex-1 flex items-center justify-center w-full min-w-[300px] p-4">
                    <div
                        ref={previewRef}
                        style={{
                            ...getBackgroundStyle(backType, backColor1, backColor2, backGradientDir, backOpacity),
                            borderRadius: `${backRadius}px`,
                            padding: '40px',
                            boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.25)",
                            display: 'inline-block',
                        }}
                    >
                        <div
                            style={{
                                background: frontColor1,
                                borderRadius: `${frontRadius}px`,
                                width: `${frontWidth}px`,
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: 'hidden'
                            }}
                        >
                            {/* Top Bar */}
                            <div className="h-12 bg-black/20 flex items-center px-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-red-500"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-500"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>
                                </div>
                                <div className="flex-1 text-center font-mono text-sm text-gray-400">
                                    <span className="bg-gray-700/50 text-sky-300 px-2 py-0.5 rounded-md text-xs mr-2">{fileIcon}</span>
                                    <input className="bg-transparent text-gray-300 text-center outline-none w-48" value={fileName} onChange={e => setFileName(e.target.value.replace(/\s/g, '-'))} spellCheck={false}/>
                                    <span className="opacity-60">.{fileExt}</span>
                                </div>
                                <div className="w-12"></div>
                            </div>

                            {/* Code Area */}
                            <div className="relative p-5 cursor-text text-left" onClick={() => setEditing(true)}>
                                {editing ? (
                                    <textarea
                                        autoFocus
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        onBlur={() => setEditing(false)}
                                        className="absolute inset-0 w-full h-full bg-inherit text-transparent caret-white font-mono text-base leading-relaxed p-5 outline-none resize-none"
                                        style={{ whiteSpace: 'pre' }}
                                        spellCheck={false}
                                    />
                                ) : null}
                                <SyntaxHighlighter
                                    language={language}
                                    style={oneDark}
                                    customStyle={{
                                        background: "transparent",
                                        fontSize: "1rem",
                                        lineHeight: "1.6",
                                        margin: 0,
                                        padding: 0,
                                        minHeight: '200px',
                                        pointerEvents: editing ? 'none' : 'auto', // make text unselectable when editing
                                    }}
                                    wrapLongLines={true}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}