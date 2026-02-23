import Link from "next/link";
import React from "react";

interface ButtonBaseProps {
  eventClick?: () => void;
  label?: string;
  variant?: string;
  type?: "button" | "link";
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  shape?: "pill" | "rounded";
}

const sizesStyle = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-1 px-4",
  lg: "text-lg py-2 px-6",
};

const VARIANTS: { [key: string]: string } = {
  primary: "bg-primary text-white",
  secondary: "bg-white text-black",
  danger: "bg-red-600 text-white",
  outline: "bg-white text-black border border-black",
  outlineDanger: "bg-white text-red-600 border border-red-600",
};

function ButtonBase({
  eventClick,
  label,
  variant = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
  size = "md",
  href = "#",
  shape = "pill",
}: ButtonBaseProps) {
  let baseStyle = `flex flex-row items-center gap-4  w-fit cursor-pointer hover:opacity-60 transition duration-300 ease-in-out `;

  if (fullWidth) {
    baseStyle +=
      " w-full justify-center text-center transition-all active:scale-95";
  }
  baseStyle += ` ${sizesStyle[size]}`;
  baseStyle += ` ${VARIANTS[variant]}`;

  if (shape === "pill") {
    baseStyle += " rounded-full";
  }

  if (shape === "rounded") {
    baseStyle += " rounded-md";
  }

  if (disabled) {
    baseStyle += " opacity-50 cursor-not-allowed";
  }

  switch (type) {
    case "button":
      return (
        <button
          className={`${baseStyle}`}
          onClick={eventClick}
          disabled={disabled}
        >
          {label}
        </button>
      );
    case "link":
      return (
        <Link href={href} className={`${baseStyle} `} onClick={eventClick}>
          {label}
        </Link>
      );
  }
}

export default ButtonBase;
