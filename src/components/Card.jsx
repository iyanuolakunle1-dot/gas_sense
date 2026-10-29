/**
 * Card.jsx
 * --------
 * Rounded container card wrapper used across pages.
 */
import React from "react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[26px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] ${className}`}>
    {children}
  </div>
);

export default Card;
