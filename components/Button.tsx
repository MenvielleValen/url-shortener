import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  disabled,
  type = "button",
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-indigo-500 hover:bg-indigo-600 transition-colors flex items-center justify-center text-white p-2 rounded-md pl-3 pr-3 disabled:opacity-75 disabled:hover:bg-indigo-500 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};
