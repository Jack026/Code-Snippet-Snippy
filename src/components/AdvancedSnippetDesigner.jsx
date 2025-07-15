import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismStyles from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "./Header";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

// Language data: extension and SVG icon
const languageMeta = {
  javascript: {
    ext: "js",
    icon: (
      <svg width="20" height="20" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#F7DF1E"/>
        <text x="6" y="22" fontSize="16" fontWeight="bold" fill="#222">JS</text>
      </svg>
    )
  },
  python: {
    ext: "py",
    icon: (
      <svg width="20" height="20" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#3776AB"/>
        <text x="6" y="22" fontSize="16" fontWeight="bold" fill="#fff">Py</text>
      </svg>
    )
  },
  // ...add other languages as needed
};

const supportedLanguages = Object.keys(languageMeta);

function getBackgroundStyle({ type, color1, color2, gradientDir, opacity }) {
  if (type === "gradient") {
    return {
      background: `linear-gradient(${gradientDir}, ${color1}, ${color2})`,
      opacity: opacity,
    };
  } else {
    return {
      background: color1,
      opacity: opacity,
    };
  }
}

const DEFAULT_CODE = `const msg = 'Wow this is awesome!';
console.log(msg);

const plug = 'You should use snappify';
console.log(plug);`;

const gradientDirections = [
  { name: "Right", value: "90deg" },
  { name: "Left", value: "270deg" },
  { name: "Top", value: "0deg" },
  { name: "Bottom", value: "180deg" },
  { name: "Diagonal TL-BR", value: "135deg" },
  { name: "Diagonal TR-BL", value: "225deg" },
];

export default function AdvancedSnippetDesigner() {
  // Back box state
  const [backType, setBackType] = useState("gradient");
  const [backColor1, setBackColor1] = useState("#43cea2"); // greenish
  const [backColor2, setBackColor2] = useState("#185a9d"); // blue
  const [backGradientDir, setBackGradientDir] = useState("135deg");
  const [backRadius, setBackRadius] = useState(0);
  const [backOpacity, setBackOpacity] = useState(1);
  const [backWidth, setBackWidth] = useState(680);
  const [backHeight, setBackHeight] = useState(380);

  // Snippet box state
  const [frontType, setFrontType] = useState("solid");
  const [frontColor1, setFrontColor1] = useState("#232936");
  const [frontColor2, setFrontColor2] = useState("#232936");
  const [frontGradientDir, setFrontGradientDir] = useState("90deg");
  const [frontRadius, setFrontRadius] = useState(24);
  const [frontOpacity, setFrontOpacity] = useState(1);
  const [frontWidth, setFrontWidth] = useState(600);
  const [frontHeight, setFrontHeight] = useState(340);
  const [langColor, setLangColor] = useState("#f7df1e");
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("javascript");
  const [editing, setEditing] = useState(false);
  const [fileName, setFileName] = useState("snippet");
  const previewRef = useRef();

  // Download as PNG, always save as .png
  const handleDownload = async () => {
    if (previewRef.current) {
      const name = fileName.trim() ? fileName.trim() : "snippet";
      const canvas = await html2canvas(previewRef.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement("a");
      link.download = `${name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Icon/ext
  const fileIcon = languageMeta[language]?.icon || null;
  const fileExt = languageMeta[language]?.ext || "txt";

  // Responsive: use flex-col on mobile, flex-row on desktop
  // Center the whole preview area
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#2b5876] relative transition-colors duration-500">
      <ThemeToggle />
      <Header />
      <div className="flex flex-col md:flex-row flex-grow items-center justify-center gap-6 px-2 py-6 md:px-10 md:py-10">
        {/* Left: All Controls together */}
        <div className="flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-5 md:p-6 rounded-xl shadow w-full md:w-[320px] max-w-full">
          <h2 className="font-bold text-[#185a9d] dark:text-[#43cea2] mb-2">Customize</h2>
          {/* Back Box Controls */}
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Back Box</h3>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Type</span>
              <select value={backType} onChange={e => setBackType(e.target.value)} className="ml-2">
                <option value="solid">Solid</option>
                <option value="gradient">Gradient</option>
              </select>
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Color 1</span>
              <input type="color" value={backColor1} onChange={e => setBackColor1(e.target.value)} className="ml-2 w-8 h-8 border-none" />
            </label>
            {backType === "gradient" && (
              <>
                <label className="flex items-center justify-between">
                  <span className="font-semibold">Color 2</span>
                  <input type="color" value={backColor2} onChange={e => setBackColor2(e.target.value)} className="ml-2 w-8 h-8 border-none" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="font-semibold">Direction</span>
                  <select value={backGradientDir} onChange={e => setBackGradientDir(e.target.value)} className="ml-2">
                    {gradientDirections.map(g => <option key={g.value} value={g.value}>{g.name}</option>)}
                  </select>
                </label>
              </>
            )}
            <label className="flex items-center justify-between">
              <span className="font-semibold">Opacity</span>
              <input type="range" min={0.5} max={1} step={0.01} value={backOpacity} onChange={e => setBackOpacity(e.target.value)} />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Corner Radius</span>
              <input type="range" min={0} max={48} step={1} value={backRadius} onChange={e => setBackRadius(e.target.value)} />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Width</span>
              <input type="number" min={300} max={1200} value={backWidth} onChange={e => setBackWidth(Number(e.target.value))} className="ml-2 w-20" />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Height</span>
              <input type="number" min={200} max={800} value={backHeight} onChange={e => setBackHeight(Number(e.target.value))} className="ml-2 w-20" />
            </label>
          </div>
          {/* Snippet Box Controls */}
          <div className="flex flex-col gap-2 mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Snippet Box</h3>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Type</span>
              <select value={frontType} onChange={e => setFrontType(e.target.value)} className="ml-2">
                <option value="solid">Solid</option>
                <option value="gradient">Gradient</option>
              </select>
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Color 1</span>
              <input type="color" value={frontColor1} onChange={e => setFrontColor1(e.target.value)} className="ml-2 w-8 h-8 border-none" />
            </label>
            {frontType === "gradient" && (
              <>
                <label className="flex items-center justify-between">
                  <span className="font-semibold">Color 2</span>
                  <input type="color" value={frontColor2} onChange={e => setFrontColor2(e.target.value)} className="ml-2 w-8 h-8 border-none" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="font-semibold">Direction</span>
                  <select value={frontGradientDir} onChange={e => setFrontGradientDir(e.target.value)} className="ml-2">
                    {gradientDirections.map(g => <option key={g.value} value={g.value}>{g.name}</option>)}
                  </select>
                </label>
              </>
            )}
            <label className="flex items-center justify-between">
              <span className="font-semibold">Opacity</span>
              <input type="range" min={0.5} max={1} step={0.01} value={frontOpacity} onChange={e => setFrontOpacity(e.target.value)} />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Corner Radius</span>
              <input type="range" min={0} max={36} step={1} value={frontRadius} onChange={e => setFrontRadius(e.target.value)} />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Width</span>
              <input type="number" min={200} max={1200} value={frontWidth} onChange={e => setFrontWidth(Number(e.target.value))} className="ml-2 w-20" />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Height</span>
              <input type="number" min={100} max={800} value={frontHeight} onChange={e => setFrontHeight(Number(e.target.value))} className="ml-2 w-20" />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Lang Color</span>
              <input type="color" value={langColor} onChange={e => setLangColor(e.target.value)} className="ml-2 w-8 h-8 border-none" />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-semibold">Language</span>
              <select value={language} onChange={e => setLanguage(e.target.value)} className="ml-2 w-32">
                {supportedLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </label>
            <button
              className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white py-2 rounded font-bold mt-4 hover:scale-105 transition"
              onClick={handleDownload}
            >
              Download as PNG
            </button>
          </div>
        </div>

        {/* Center: Preview - always centered */}
        <div className="flex flex-1 items-center justify-center w-full min-w-[200px]">
          <div
            ref={previewRef}
            style={{
              position: "relative",
              width: backWidth,
              height: backHeight,
              maxWidth: "100vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Back box */}
            <div
              style={{
                ...getBackgroundStyle({
                  type: backType,
                  color1: backColor1,
                  color2: backColor2,
                  gradientDir: backGradientDir,
                  opacity: backOpacity,
                }),
                borderRadius: `${backRadius}px`,
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
                boxShadow: "0 8px 32px 0 rgba(58, 52, 94, 0.20)",
              }}
            />
            {/* Snippet box - always centered within back box */}
            <div
              style={{
                ...getBackgroundStyle({
                  type: frontType,
                  color1: frontColor1,
                  color2: frontColor2,
                  gradientDir: frontGradientDir,
                  opacity: frontOpacity,
                }),
                borderRadius: `${frontRadius}px`,
                width: frontWidth,
                height: frontHeight,
                position: "absolute",
                top: `calc(50% - ${frontHeight / 2}px)`,
                left: `calc(50% - ${frontWidth / 2}px)`,
                zIndex: 2,
                boxShadow: "0 8px 32px 0 rgba(58, 52, 94, 0.18)",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top Bar */}
              <div
                style={{
                  height: "52px",
                  borderTopLeftRadius: `${frontRadius}px`,
                  borderTopRightRadius: `${frontRadius}px`,
                  background: "#232936",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 24px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-400 inline-block"></span>
                  <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block"></span>
                  <span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span>
                </div>
                {/* Language Icon and Editable Filename */}
                <span className="ml-6 flex items-center gap-2 font-mono text-base text-white">
                  <span>{fileIcon}</span>
                  <input
                    className="ml-1 bg-transparent border-b border-dashed border-gray-300 dark:border-gray-500 text-inherit font-mono outline-none w-32"
                    value={fileName}
                    onChange={e => setFileName(e.target.value.replace(/\s/g, ''))}
                    spellCheck={false}
                    maxLength={32}
                  />
                  <span className="opacity-70">.{fileExt}</span>
                </span>
              </div>
              {/* Code - editable, not scrollable */}
              <div
                style={{
                  padding: "24px 32px",
                  height: `calc(${frontHeight}px - 52px)`,
                  position: "relative",
                  flexGrow: 1,
                  cursor: editing ? "text" : "pointer",
                  overflow: "hidden"
                }}
                onClick={() => setEditing(true)}
              >
                {editing ? (
                  <textarea
                    autoFocus
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    onBlur={() => setEditing(false)}
                    className="absolute inset-0 w-full h-full bg-transparent text-white font-mono text-lg outline-none resize-none"
                    style={{
                      background: "rgba(35,41,54,0.9)",
                      borderRadius: "8px",
                      padding: 0,
                      minHeight: "100%",
                      zIndex: 10,
                    }}
                    spellCheck={false}
                  />
                ) : (
                  <SyntaxHighlighter
                    language={language}
                    style={prismStyles.materialDark}
                    customStyle={{
                      background: "transparent",
                      fontSize: "1.15rem",
                      margin: 0,
                      padding: 0,
                      minHeight: "100%",
                      maxHeight: "100%",
                      overflow: "hidden",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word"
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}