/**
 * Button.jsx
 * ----------
 * Reusable button component with three visual variants.
 *
 * Props:
 *   variant: "primary" | "outline" | "danger-text"
 *   onClick: function
 *   disabled: boolean
 *   className: string
 *   children: ReactNode
 */
import React from "react";

const Button = ({
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  const base =
    "w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[#0D6E5D] text-white hover:bg-[#0A574A] focus:ring-[#0D6E5D] active:scale-[0.98] disabled:opacity-50 shadow-sm shadow-[#0D6E5D]/20",
    outline:
      "border-2 border-[#0D6E5D] text-[#0D6E5D] bg-transparent hover:bg-[#E1F3EE]/40 focus:ring-[#0D6E5D] active:scale-[0.98] disabled:opacity-50",
    "danger-text":
      "text-[#E53935] bg-transparent hover:bg-red-50 focus:ring-red-300 active:scale-[0.98] disabled:opacity-50",
  };

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
