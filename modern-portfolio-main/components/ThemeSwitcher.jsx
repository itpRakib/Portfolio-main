import React, { useState, useEffect } from "react";
import { HiOutlineColorSwatch } from "react-icons/hi";

const themes = [
  { name: "red", hex: "#f13024", rgb: "241, 48, 36" },
  { name: "blue", hex: "#00bcff", rgb: "0, 188, 255" },
  { name: "green", hex: "#10b981", rgb: "16, 185, 129" },
  { name: "purple", hex: "#a855f7", rgb: "168, 85, 247" },
  { name: "orange", hex: "#f97316", rgb: "249, 115, 22" },
  { name: "pink", hex: "#ec4899", rgb: "236, 72, 153" },
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("red");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      const theme = themes.find((t) => t.name === savedTheme);
      if (theme) {
        applyTheme(theme);
      }
    }
  }, []);

  const applyTheme = (theme) => {
    setActiveTheme(theme.name);
    localStorage.setItem("portfolio-theme", theme.name);
    document.documentElement.style.setProperty("--accent-color", theme.hex);
    document.documentElement.style.setProperty("--accent-color-rgb", theme.rgb);
  };

  return (
    <div className="fixed right-6 top-1/3 z-50 flex items-center gap-x-2">
      {/* Drawer */}
      <div
        className={`flex items-center gap-x-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-2 transition-all duration-500 ease-out origin-right ${
          isOpen ? "scale-100 opacity-100 translate-x-0" : "scale-75 opacity-0 translate-x-5 pointer-events-none"
        }`}
      >
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => applyTheme(theme)}
            className="w-6 h-6 rounded-full border transition-all duration-300 hover:scale-125 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: theme.hex,
              borderColor: activeTheme === theme.name ? "#ffffff" : "transparent",
              boxShadow: activeTheme === theme.name ? `0 0 10px ${theme.hex}` : "none",
            }}
            title={`Switch to ${theme.name}`}
            aria-label={`Switch to ${theme.name} theme`}
          />
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-accent text-white flex items-center justify-center rounded-full shadow-lg border border-white/10 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: "0 4px 15px rgba(var(--accent-color-rgb), 0.4)",
        }}
        title="Customize Theme Color"
        aria-label="Customize Theme Color"
      >
        <HiOutlineColorSwatch className="text-xl animate-pulse" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
