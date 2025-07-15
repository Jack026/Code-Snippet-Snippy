import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DEFAULT_CODE = `const msg = 'Wow this is awesome!';
console.log(msg);

const plug = 'You should use snappify';
console.log(plug);`;

export default function SnippetDesigner() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [background, setBackground] = useState("#232936");
  const [radius, setRadius] = useState(24);
  const [opacity, setOpacity] = useState(1);
  const [boxWidth, setBoxWidth] = useState(600);
  const [boxHeight, setBoxHeight] = useState(340);
  const [title, setTitle] = useState("snippet.js");
  const [langColor, setLangColor] = useState("#f7df1e"); // JS yellow
  const snippetRef = useRef();

  // Download as PNG
  const handleDownload = async () => {
    if (snippetRef.current) {
      const canvas = await html2canvas(snippetRef.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement("a");
      link.download = "snippet.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center py-10">
      {/* Controls */}
      <div className="flex flex-col gap-4 min-w-[220px] bg-white/50 backdrop-blur-md p-6 rounded-lg shadow">
        <label>
          <span className="font-semibold">Box Color</span>
          <input type="color" value={background} onChange={e => setBackground(e.target.value)} className="ml-2 w-10 h-10 p-0 border-none" />
        </label>
        <label>
          <span className="font-semibold">Opacity</span>
          <input type="range" min={0.5} max={1} step={0.01} value={opacity} onChange={e => setOpacity(e.target.value)} />
        </label>
        <label>
          <span className="font-semibold">Corner Radius</span>
          <input type="range" min={0} max={36} step={1} value={radius} onChange={e => setRadius(e.target.value)} />
        </label>
        <label>
          <span className="font-semibold">Width</span>
          <input type="number" min={300} max={1200} value={boxWidth} onChange={e => setBoxWidth(e.target.value)} className="ml-2 w-20" />
        </label>
        <label>
          <span className="font-semibold">Height</span>
          <input type="number" min={200} max={800} value={boxHeight} onChange={e => setBoxHeight(e.target.value)} className="ml-2 w-20" />
        </label>
        <label>
          <span className="font-semibold">Title</span>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="ml-2 w-32" />
        </label>
        <label>
          <span className="font-semibold">Lang Color</span>
          <input type="color" value={langColor} onChange={e => setLangColor(e.target.value)} className="ml-2 w-10 h-10 p-0 border-none" />
        </label>
        <label>
          <span className="font-semibold">Code</span>
          <textarea
            rows={6}
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full mt-2 bg-gray-100 rounded p-2 font-mono"
          />
        </label>
        <button
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded font-bold mt-4 hover:scale-105 transition"
          onClick={handleDownload}
        >
          Download as PNG
        </button>
      </div>
      {/* Snippet Preview */}
      <div
        ref={snippetRef}
        style={{
          width: boxWidth + "px",
          height: boxHeight + "px",
          borderRadius: radius + "px",
          background: background,
          opacity: opacity,
          boxShadow: "0 8px 32px 0 rgba(58, 52, 94, 0.28)"
        }}
        className={`relative overflow-hidden`}
      >
        {/* Top Bar */}
        <div
          style={{
            height: "52px",
            borderTopLeftRadius: radius + "px",
            borderTopRightRadius: radius + "px",
            background: "#232936",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-400 inline-block"></span>
            <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block"></span>
            <span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span>
          </div>
          {/* Filename & Lang */}
          <span className="ml-6 font-mono text-base text-white flex items-center gap-2">
            <span style={{ color: langColor, fontWeight: 700 }}>JS</span>
            <span className="ml-1 text-gray-200">{title}</span>
          </span>
        </div>
        {/* Code */}
        <div style={{ padding: "24px 32px", height: `calc(${boxHeight}px - 52px)`, overflow: "auto" }}>
          <SyntaxHighlighter
            language="javascript"
            style={materialDark}
            customStyle={{
              background: "transparent",
              fontSize: "1.15rem",
              margin: 0,
              padding: 0,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}