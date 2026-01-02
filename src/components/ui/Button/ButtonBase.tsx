import React from "react";

interface ButtonBaseProps {
  eventClick?: () => void;
  label?: string;
  variant?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
}

function ButtonBase({
  eventClick,
  label,
  variant = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonBaseProps) {
  let baseStyle =
    "flex flex-row items-center gap-4 py-2 px-4 rounded-full w-fit cursor-pointer";

  if (fullWidth) {
    baseStyle += " w-full justify-center text-center";
  }

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
