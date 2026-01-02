import React from "react";

interface ButtonIconProps {
  icon: React.ReactNode;
  iconOnly?: boolean;
  iconPosition?: "left" | "right";
  eventClick?: () => void;
  label?: string;
  variant?: string;
  isDisabled?: boolean;
}

function ButtonIcon({
  icon,
  iconOnly = false,
  iconPosition = "left",
  eventClick,
  label,
  variant = "primary",
  isDisabled = false,
}: ButtonIconProps) {
  let baseStyle =
    "flex flex-row items-center gap-4 py-2 px-4 rounded-full w-fit hover:opacity-60 transition duration-300 ease-in-out";

  if (iconPosition === "left") {
    baseStyle += " flex-row-reverse";
  }

  if (isDisabled) {
    baseStyle += " opacity-50 cursor-not-allowed";
  } else {
    baseStyle += " cursor-pointer";
  }

  switch (variant) {
    case "primary":
      return (
        <button
          className={`${baseStyle} bg-black text-white`}
          onClick={eventClick}
          disabled={isDisabled}
        >
          {!iconOnly && label}
          {icon}
        </button>
      );
    case "outline":
      return (
        <button
          className={`${baseStyle} border border-black text-black`}
          onClick={eventClick}
          disabled={isDisabled}
        >
          {!iconOnly && label}
          {icon}
        </button>
      );
  }
}

export default ButtonIcon;
