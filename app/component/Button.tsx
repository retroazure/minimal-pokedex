import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-buttonBlue text-white py-2 px-6 rounded-full shadow-lg hover:bg-buttonBlueHover transform transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-blue-300"
    >
      {children}
    </button>
  );
};

export default Button;