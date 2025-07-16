import React, { useState, useRef, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import PresetGradients from "./PresetGradients";
import { LIGHT_PRESETS, DARK_PRESETS } from "./PresetGradients";

// --- Preset Definitions ---
// --- Helper Functions & Components ---
const hexToRgba = (hex, alpha) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0, 0, 0, ${alpha})`;
    const r = parseInt(result[1], 16); const g = parseInt(result[2], 16); const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Header = ({ darkMode, setDarkMode }) => ( <header className="flex-shrink-0 fixed top-0 left-0 right-0 z-50 h-16 bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300"> <div className="container mx-auto flex items-center justify-between h-full px-6"> <div className="text-lg font-bold text-gray-800 dark:text-white">✨ Snip<span className="text-[#43cea2]">py</span></div> <label className="flex items-center cursor-pointer"> <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">{darkMode ? 'Dark' : 'Light'}</span> <div className="relative"><input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="sr-only peer" id="theme-toggle" /><div className="block bg-gray-300 dark:bg-gray-700 w-14 h-8 rounded-full"></div><div className="dot absolute left-1 top-1 bg-white peer-checked:bg-slate-800 w-6 h-6 rounded-full transition-transform duration-300 peer-checked:transform peer-checked:translate-x-6"></div></div> </label> </div> </header> );
const Footer = () => ( <footer className="flex-shrink-0 relative z-40 bg-white/60 dark:bg-gray-900/50 backdrop-blur-lg border-t border-gray-200/50 dark:border-white/10 py-4 transition-colors duration-300"> <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400 px-4"> <p>© {new Date().getFullYear()} Snippy. All Rights Reserved.</p> <div className="flex justify-center space-x-4 mt-4"> <a href="mailto:souravjyotisahariah@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"><FaEnvelope className="text-gray-500 dark:text-gray-400 hover:text-blue-500" size={20} /></a> <a href="https://github.com/jack026" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" size={20} /></a> <a href="https://linkedin.com/in/sourav-jyoti-sahariah" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin className="text-gray-500 dark:text-gray-400 hover:text-blue-700" size={20} /></a> <a href="https://sjs-protfolio.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio"><FaGlobe className="text-gray-500 dark:text-gray-400 hover:text-green-500" size={20} /></a> </div> </div> </footer> );

// --- Main Component ---

export default function AdvancedSnippetDesigner() {
    const languageMeta = { javascript: { ext: "js", icon: "JS" }, python: { ext: "py", icon: "Py" }, java: { ext: "java", icon: "Java" }, c: { ext: "c", icon: "C" }, cpp: { ext: "cpp", icon: "C++" }, typescript: { ext: "ts", icon: "TS" }, go: { ext: "go", icon: "Go" }, ruby: { ext: "rb", icon: "Rb" }, php: { ext: "php", icon: "PHP" }, swift: { ext: "swift", icon: "Swift" }, kotlin: { ext: "kt", icon: "Kt" }, css: { ext: "css", icon: "CSS" }, html: { ext: "html", icon: "HTML" }, json: { ext: "json", icon: "JSON" }, bash: { ext: "sh", icon: "SH" }, markdown: { ext: "md", icon: "MD" } };
    const supportedLanguages = Object.keys(languageMeta);
    const gradientDirections = [ { name: "Right", value: "to right" }, { name: "Bottom", value: "to bottom" }, { name: "Top Left", value: "to top left" }, { name: "Bottom Right", value: "to bottom right" } ];
    const DEFAULT_CODE = `// Welcome to Snippy! ✨\n// Double-click the filename to edit.\n\nfunction createSnippet(code) {\n  console.log(\`Pasting some \${code}...\`);\n  return true;\n}`;
    const selectClasses = "w-full bg-white/50 dark:bg-gray-700/80 dark:text-gray-200 rounded-md p-1.5 border-none focus:ring-2 focus:ring-blue-500 transition";

    const [darkMode, setDarkMode] = useState(true);
    const [backType, setBackType] = useState("gradient");
    const [backColor1, setBackColor1] = useState(DARK_PRESETS[0].colors[0]);
    const [backColor2, setBackColor2] = useState(DARK_PRESETS[0].colors[1]);
    const [backGradientDir, setBackGradientDir] = useState("to bottom right");
    const [backRadius, setBackRadius] = useState(24);
    const [canvasPadding, setCanvasPadding] = useState(56);
    
    const [frontBackType, setFrontBackType] = useState("solid");
    const [frontColor1, setFrontColor1] = useState("#0d1117");
    const [frontColor2, setFrontColor2] = useState("#41295a");
    const [frontGradientDir, setFrontGradientDir] = useState("to bottom right");
    const [frontRadius, setFrontRadius] = useState(16);
    const [frontWidth, setFrontWidth] = useState(640);
    const [frontOpacity, setFrontOpacity] = useState(1);

    const [code, setCode] = useState(DEFAULT_CODE);
    const [language, setLanguage] = useState("javascript");
    const [editing, setEditing] = useState(false);
    const [fileName, setFileName] = useState("my-snippet");
    const [isEditingFileName, setIsEditingFileName] = useState(false);
    
    const [previewScale, setPreviewScale] = useState(1);
    const previewRef = useRef(null);
    const previewContainerRef = useRef(null);
    const scaleWrapperRef = useRef(null);

    const handlePresetSelect = useCallback((colors) => {
        setBackType('gradient');
        setBackColor1(colors[0]);
        setBackColor2(colors[1]);
    }, []);

    useEffect(() => {
        const defaultPreset = darkMode ? DARK_PRESETS[0].colors : LIGHT_PRESETS[0].colors;
        handlePresetSelect(defaultPreset);
    }, [darkMode, handlePresetSelect]);
    
    useEffect(() => {
        const container = previewContainerRef.current;
        const content = scaleWrapperRef.current;
        if (!container || !content) return;

        const observer = new ResizeObserver(() => {
            const containerRect = container.getBoundingClientRect();
            const { offsetWidth, offsetHeight } = content;
            const padding = 16;
            const availableWidth = containerRect.width - padding;
            const availableHeight = containerRect.height - padding;

            if (offsetWidth > 0 && offsetHeight > 0) {
                const scale = Math.min(1, availableWidth / offsetWidth, availableHeight / offsetHeight);
                if (Math.abs(previewScale - scale) > 0.001) setPreviewScale(scale);
            }
        });
        observer.observe(container);
        observer.observe(content);

        return () => observer.disconnect();
    }, [previewScale]);


    const getCanvasBackgroundStyle = () => ({ background: backType === 'gradient' ? `linear-gradient(${backGradientDir}, ${backColor1}, ${backColor2})` : backColor1 });
    const getSnippetBackgroundStyle = () => frontBackType === 'gradient' ? { background: `linear-gradient(${frontGradientDir}, ${hexToRgba(frontColor1, frontOpacity)}, ${hexToRgba(frontColor2, frontOpacity)})` } : { background: hexToRgba(frontColor1, frontOpacity) };

    const handleDownload = async () => {
        const contentToCapture = previewRef.current;
        const scaledWrapper = scaleWrapperRef.current;
        if (!contentToCapture || !scaledWrapper) return;
    
        const name = fileName.trim() || "snippet";
        const originalTransform = scaledWrapper.style.transform;
    
        try {
            scaledWrapper.style.transform = 'scale(1)';
            await new Promise(resolve => setTimeout(resolve, 50));
    
            const canvas = await html2canvas(contentToCapture, { backgroundColor: null, scale: 2, useCORS: true });
            
            const link = document.createElement("a");
            link.download = `${name}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
    
        } catch (error) { 
            console.error("Error generating canvas:", error); 
        } finally {
            scaledWrapper.style.transform = originalTransform;
        }
    };
    
    const fileIcon = languageMeta[language]?.icon || "📄";
    const fileExt = languageMeta[language]?.ext || "txt";
    const pageBackground = darkMode ? "bg-gray-900 text-gray-100" : "bg-slate-100 text-gray-800";

    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${pageBackground}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="flex-grow flex flex-col md:flex-row gap-4 p-4 pt-20 overflow-hidden">
                {/* --- Left: Controls Panel --- */}
                <div className="flex-shrink-0 flex flex-col gap-6 bg-white/50 dark:bg-black/30 backdrop-blur-xl p-5 md:p-6 rounded-2xl shadow-lg w-full md:w-[340px] max-w-full border border-white/20 dark:border-white/10 md:max-h-full md:overflow-y-auto">
                    <h2 className="font-bold text-xl text-gray-800 dark:text-white">Customize</h2>
                    <div className="flex flex-col gap-3"> <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 border-b pb-1 border-gray-300/50 dark:border-gray-600/50">Canvas</h3> <label className="flex items-center justify-between text-sm"><span>Type</span><select value={backType} onChange={e => setBackType(e.target.value)} className={selectClasses}>{['solid', 'gradient'].map(o => <option key={o} value={o}>{o}</option>)}</select></label> <label className="flex items-center justify-between text-sm"><span>Color 1</span><input type="color" value={backColor1} onChange={e => setBackColor1(e.target.value)} className="w-8 h-8 rounded-md" /></label> {backType === 'gradient' && <><label className="flex items-center justify-between text-sm"><span>Color 2</span><input type="color" value={backColor2} onChange={e => setBackColor2(e.target.value)} className="w-8 h-8 rounded-md" /></label><label className="flex items-center justify-between text-sm"><span>Direction</span><select value={backGradientDir} onChange={e => setBackGradientDir(e.target.value)} className={selectClasses}>{gradientDirections.map(g => <option key={g.value} value={g.value}>{g.name}</option>)}</select></label></>} <label className="flex flex-col gap-1 text-sm"><span>Radius: {backRadius}px</span><input type="range" min={0} max={64} value={backRadius} onChange={e => setBackRadius(Number(e.target.value))} /></label> <label className="flex flex-col gap-1 text-sm"><span>Padding: {canvasPadding}px</span><input type="range" min={16} max={128} step={4} value={canvasPadding} onChange={e => setCanvasPadding(Number(e.target.value))} /></label> </div>
                    <div className="flex flex-col gap-3"> <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 border-b pb-1 border-gray-300/50 dark:border-gray-600/50">Snippet</h3> <label className="flex items-center justify-between text-sm"><span>Language</span><select value={language} onChange={e => setLanguage(e.target.value)} className={selectClasses}>{supportedLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}</select></label> <label className="flex items-center justify-between text-sm"><span>BG Type</span><select value={frontBackType} onChange={e => setFrontBackType(e.target.value)} className={selectClasses}>{['solid', 'gradient'].map(o => <option key={o} value={o}>{o}</option>)}</select></label> <label className="flex items-center justify-between text-sm"><span>{frontBackType === 'gradient' ? 'Color 1' : 'BG Color'}</span><input type="color" value={frontColor1} onChange={e => setFrontColor1(e.target.value)} className="w-8 h-8 rounded-md" /></label> {frontBackType === 'gradient' && <><label className="flex items-center justify-between text-sm"><span>Color 2</span><input type="color" value={frontColor2} onChange={e => setFrontColor2(e.target.value)} className="w-8 h-8 rounded-md" /></label><label className="flex items-center justify-between text-sm"><span>Direction</span><select value={frontGradientDir} onChange={e => setFrontGradientDir(e.target.value)} className={selectClasses}>{gradientDirections.map(g => <option key={g.value} value={g.value}>{g.name}</option>)}</select></label></>} <label className="flex flex-col gap-1 text-sm"><span>Width: {frontWidth}px</span><input type="range" min={320} max={1200} step={10} value={frontWidth} onChange={e => setFrontWidth(Number(e.target.value))} /></label> <label className="flex flex-col gap-1 text-sm"><span>Radius: {frontRadius}px</span><input type="range" min={0} max={48} value={frontRadius} onChange={e => setFrontRadius(Number(e.target.value))} /></label> <label className="flex flex-col gap-1 text-sm"><span>Opacity: {frontOpacity.toFixed(2)}</span><input type="range" min={0.1} max={1} step={0.05} value={frontOpacity} onChange={e => setFrontOpacity(Number(e.target.value))} /></label> </div>
                    <button className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white py-2.5 px-4 rounded-lg font-bold mt-4 hover:scale-105 hover:shadow-xl transition-all duration-200" onClick={handleDownload}>Download PNG</button>
                </div>

                {/* --- Right: Preview Area --- */}
                <main className="flex-grow flex flex-col items-center justify-between min-w-0">
                    <div ref={previewContainerRef} className="flex-grow flex items-center justify-center w-full h-full">
                        <div ref={scaleWrapperRef} style={{ transform: `scale(${previewScale})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}>
                            <div ref={previewRef} style={{ ...getCanvasBackgroundStyle(), borderRadius: `${backRadius}px`, boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.25)", display: 'inline-block', padding: `${canvasPadding}px` }}>
                                <div style={{ ...getSnippetBackgroundStyle(), borderRadius: `${frontRadius}px`, width: `${frontWidth}px`, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", overflow: 'hidden' }}>
                                    <div className="flex-shrink-0 h-12 bg-black/20 flex items-center px-4 border-b border-white/10">
                                        <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-red-500"></span><span className="w-3.5 h-3.5 rounded-full bg-yellow-500"></span><span className="w-3.5 h-3.5 rounded-full bg-green-500"></span></div>
                                        <div className="flex-1 text-center font-mono text-sm text-gray-400 px-2 min-w-0" onDoubleClick={() => setIsEditingFileName(true)}>
                                            <span className="bg-gray-700/50 text-sky-300 px-2 py-0.5 rounded-md text-xs mr-2">{fileIcon}</span>
                                            {isEditingFileName ? (
                                                <input autoFocus className="bg-transparent text-gray-300 text-center outline-none w-auto max-w-[200px]" value={fileName} onChange={e => setFileName(e.target.value.replace(/\s/g, '-'))} onBlur={() => setIsEditingFileName(false)} onKeyDown={e => e.key === 'Enter' && setIsEditingFileName(false)} spellCheck={false}/>
                                            ) : (
                                                <span className="text-gray-300 outline-none px-1">{fileName}</span>
                                            )}
                                            <span className="opacity-60">.{fileExt}</span>
                                        </div>
                                        <div className="w-12 flex-shrink-0"></div>
                                    </div>
                                    <div className="relative p-5 cursor-text text-left" onClick={() => setEditing(true)}>
                                        {editing && <textarea autoFocus value={code} onChange={e => setCode(e.target.value)} onBlur={() => setEditing(false)} className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-base leading-relaxed p-5 outline-none resize-none" style={{ whiteSpace: 'pre' }} spellCheck={false} />}
                                        <SyntaxHighlighter language={language} style={oneDark} customStyle={{ background: "transparent", fontSize: "1rem", lineHeight: "1.6", margin: 0, padding: 0, minHeight: '200px', pointerEvents: editing ? 'none' : 'auto' }} wrapLongLines={true}>{code}</SyntaxHighlighter>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full pt-4 px-4">
                        <PresetGradients onSelect={handlePresetSelect} presets={darkMode ? DARK_PRESETS : LIGHT_PRESETS} />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}