import React, { useState, useEffect } from "react";
import { HiOutlineColorSwatch } from "react-icons/hi";

const themes = [
  { name: "red", label: "Ruby Red", hex: "#f13024", rgb: "241, 48, 36" },
  { name: "blue", label: "Electric Blue", hex: "#00bcff", rgb: "0, 188, 255" },
  { name: "green", label: "Emerald Green", hex: "#10b981", rgb: "16, 185, 129" },
  { name: "purple", label: "Amethyst Purple", hex: "#a855f7", rgb: "168, 85, 247" },
  { name: "orange", label: "Neon Orange", hex: "#f97316", rgb: "249, 115, 22" },
  { name: "pink", label: "Hot Pink", hex: "#ec4899", rgb: "236, 72, 153" },
  { name: "cyan", label: "Cyberpunk Cyan", hex: "#00f5ff", rgb: "0, 245, 255" },
  { name: "gold", label: "Sunset Gold", hex: "#ffb800", rgb: "255, 184, 0" },
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("red");
  const [ripple, setRipple] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      const theme = themes.find((t) => t.name === savedTheme);
      if (theme) {
        applyTheme(theme);
      }
    }
  }, []);

  const applyTheme = (theme, e) => {
    setActiveTheme(theme.name);
    localStorage.setItem("portfolio-theme", theme.name);
    document.documentElement.style.setProperty("--accent-color", theme.hex);
    document.documentElement.style.setProperty("--accent-color-rgb", theme.rgb);
    setIsOpen(false); // Close the popup drawer after selecting a color

    // Trigger ripple animation from the click coordinates
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || (rect.top + rect.height / 2);

      setRipple({
        x,
        y,
        color: theme.hex,
        id: Date.now(),
      });

      // Clear the ripple after the animation finishes
      setTimeout(() => {
        setRipple(null);
      }, 800);
    }
  };

  const activeThemeData = themes.find((t) => t.name === activeTheme) || themes[0];

  return (
    <>
      {/* Full-screen color ripple splash overlay */}
      {ripple && (
        <div
          key={ripple.id}
          className="fixed rounded-full pointer-events-none z-[9999]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "0px",
            height: "0px",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${ripple.color} 0%, rgba(0,0,0,0) 70%)`,
            boxShadow: `0 0 60px 30px ${ripple.color}`,
            animation: "theme-ripple 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
          }}
        />
      )}

      {/* Animation Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes theme-ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
          }
          100% {
            width: 250vmax;
            height: 250vmax;
            opacity: 0;
          }
        }
        @keyframes sonar-ping {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }
      `}} />

      <div className="fixed left-6 bottom-[96px] xl:bottom-6 z-50 flex items-center gap-x-4">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-black/90 text-white flex items-center justify-center rounded-full shadow-2xl border hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group relative"
          style={{
            boxShadow: `0 0 20px rgba(${activeThemeData.rgb}, 0.5)`,
            borderColor: `rgba(${activeThemeData.rgb}, 0.6)`,
          }}
          title="Customize Theme Color"
          aria-label="Customize Theme Color"
        >
          {/* Sonar Ping Ring Callout (visible when closed) */}
          {!isOpen && (
            <span 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid ${activeThemeData.hex}`,
                animation: "sonar-ping 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite",
                boxShadow: `0 0 10px ${activeThemeData.hex}`,
              }}
            />
          )}

          <span 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${activeThemeData.rgb}, 0.3) 0%, transparent 70%)`
            }}
          />
          <HiOutlineColorSwatch 
            className={`text-3xl transition-transform duration-500 ${isOpen ? "rotate-180" : "group-hover:rotate-45"}`} 
            style={{ color: activeThemeData.hex }}
          />
        </button>

        {/* Drawer Panel */}
        <div
          className={`flex flex-col gap-y-3 bg-[#0c0c14]/95 backdrop-blur-xl border rounded-2xl p-4 transition-all duration-500 ease-in-out origin-left shadow-2xl ${
            isOpen 
              ? "scale-100 opacity-100 translate-x-0 pointer-events-auto" 
              : "scale-75 opacity-0 -translate-x-10 pointer-events-none"
          }`}
          style={{
            borderColor: `rgba(${activeThemeData.rgb}, 0.25)`,
            boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(${activeThemeData.rgb}, 0.1)`,
          }}
        >
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold tracking-widest text-white/40 uppercase">
              Theme Accent
            </span>
            <span className="text-[12px] font-bold uppercase transition-colors duration-300" style={{ color: activeThemeData.hex }}>
              {activeThemeData.label}
            </span>
          </div>
          
          <div className="h-[1px] w-full bg-white/10" />

          <div className="grid grid-cols-4 gap-2">
            {themes.map((theme) => {
              const isSelected = activeTheme === theme.name;
              return (
                <button
                  key={theme.name}
                  onClick={(e) => applyTheme(theme, e)}
                  className="w-7 h-7 rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer relative group flex items-center justify-center"
                  style={{
                    backgroundColor: theme.hex,
                    borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.15)",
                    boxShadow: isSelected ? `0 0 12px ${theme.hex}` : "none",
                  }}
                  title={theme.label}
                  aria-label={`Switch to ${theme.label} theme`}
                >
                  {/* Active check dot */}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute" />
                  )}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                  
                  {/* Tooltip on hover */}
                  <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0d0d15]/95 text-[9px] text-white px-2 py-0.5 rounded pointer-events-none whitespace-nowrap border border-white/10 shadow-lg z-50">
                    {theme.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSwitcher;

