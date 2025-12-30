import React from "react";

interface ButtonIconProps {
  icon: React.ReactNode;
  iconOnly?: boolean;
  iconPosition?: "left" | "right";
  eventClick?: () => void;
  label?: string;
  variant?: string;
}

function ButtonIcon({
  icon,
  iconOnly = false,
  iconPosition = "left",
  eventClick,
  label,
  variant = "primary",
}: ButtonIconProps) {
  let baseStyle =
    "flex flex-row items-center gap-4 py-2 px-4 rounded-full w-fit cursor-pointer";

  if (iconPosition === "left") {
    baseStyle += " flex-row-reverse";
  }

  switch (variant) {
    case "primary":
      return (
        <button
          className={`${baseStyle} bg-black text-white`}
          onClick={eventClick}
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
        >
          {!iconOnly && label}
          {icon}
        </button>
      );
  }
}

export default ButtonIcon;
