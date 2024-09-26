// Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transform transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
    >
      {children}
    </button>
  );
};

export default Button;