import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const AnimatedInput = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  isTextArea = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || "");
  const shouldReduceMotion = useReducedMotion();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setLocalValue(e.target.value);
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const hasContent = localValue.length > 0;
  const isFloating = isFocused || hasContent;

  const labelTransition = shouldReduceMotion 
    ? { duration: 0 } 
    : { type: "spring", stiffness: 350, damping: 25 };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Outer border glow on focus */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none z-10"
        animate={{
          boxShadow: isFocused 
            ? "0 0 15px rgba(var(--accent-color-rgb), 0.3)" 
            : "0 0 0px rgba(var(--accent-color-rgb), 0)",
          borderColor: isFocused ? "var(--accent-color)" : "rgba(255, 255, 255, 0.2)"
        }}
        transition={{ duration: 0.2 }}
        style={{
          borderWidth: "1px",
          borderStyle: "solid"
        }}
      />

      {isTextArea ? (
        <textarea
          name={name}
          id={`input-${name}`}
          value={value !== undefined ? value : localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-label={label}
          className="textarea w-full bg-transparent outline-none p-6 pt-8 text-white placeholder-transparent border-none relative z-0"
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={`input-${name}`}
          value={value !== undefined ? value : localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-label={label}
          className="input w-full bg-transparent outline-none pl-6 pt-6 pb-2 text-white placeholder-transparent border-none relative z-0"
          {...props}
        />
      )}

      {/* Floating Label */}
      <motion.label
        htmlFor={`input-${name}`}
        initial={false}
        animate={{
          y: isFloating ? (isTextArea ? 6 : 4) : (isTextArea ? 24 : 15),
          x: isFloating ? 16 : 24,
          scale: isFloating ? 0.75 : 1,
          color: isFocused 
            ? "var(--accent-color)" 
            : isFloating 
              ? "rgba(255, 255, 255, 0.6)" 
              : "rgba(255, 255, 255, 0.3)",
        }}
        transition={labelTransition}
        style={{ originX: 0, originY: 0 }}
        className="absolute left-0 top-0 pointer-events-none select-none font-light z-20"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </motion.label>
    </div>
  );
};

export default AnimatedInput;
