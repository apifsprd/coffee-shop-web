import React from "react";

interface ButtonBaseProps {
  eventClick?: () => void;
  label?: string;
  variant?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizesStyle = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-1 px-4",
  lg: "text-lg py-2 px-6",
};

function ButtonBase({
  eventClick,
  label,
  variant = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
  size = "md",
}: ButtonBaseProps) {
  let baseStyle =
    "flex flex-row items-center gap-4 rounded-full w-fit cursor-pointer hover:opacity-60 transition duration-300 ease-in-out";

  if (fullWidth) {
    baseStyle +=
      " w-full justify-center text-center transition-all active:scale-95";
  }

  baseStyle += ` ${sizesStyle[size]}`;

  switch (variant) {
    case "primary":
      return (
        <button
          className={`${baseStyle} bg-black text-white`}
          onClick={eventClick}
          type={type}
          disabled={disabled}
        >
          {label}
        </button>
      );
    case "secondary":
      return (
        <button
          className={`${baseStyle} bg-white text-black`}
          onClick={eventClick}
          type={type}
          disabled={disabled}
        >
          {label}
        </button>
      );
    case "outline":
      return (
        <button
          className={`${baseStyle} border border-black text-black`}
          onClick={eventClick}
          type={type}
          disabled={disabled}
        >
          {label}
        </button>
      );
    case "outline-inactive":
      return (
        <button
          className={`${baseStyle} border border-gray-300 text-gray-400`}
          onClick={eventClick}
          type={type}
          disabled={disabled}
        >
          {label}
        </button>
      );
    case "danger":
      return (
        <button
          className={`${baseStyle} bg-red-600 text-white`}
          onClick={eventClick}
          type={type}
          disabled={disabled}
        >
          {label}
        </button>
      );
  }
}

export default ButtonBase;
