import Link from "next/link";
import React from "react";

interface ButtonIconProps {
  icon: React.ReactNode;
  iconOnly?: boolean;
  iconPosition?: "left" | "right";
  eventClick?: () => void;
  label?: string;
  variant?: string;
  isDisabled?: boolean;
  shape?: string;
  type?: "button" | "link";
  href?: string;
}

const SHAPES: { [key: string]: string } = {
  rounded: "rounded-md py-2 px-4 ",
  square: "rounded-lg py-2 px-4 ",
  circle: "rounded-full p-2",
};

const VARIANTS: { [key: string]: string } = {
  primary: "bg-primary text-black",
  outline: "bg-white text-black border border-primary",
  outlineDanger: "bg-white text-red-600 border border-red-600",
  ghost: "bg-white text-black",
  danger: "bg-red-100  text-white",
};

function ButtonIcon({
  icon,
  iconOnly = false,
  iconPosition = "left",
  eventClick,
  label,
  variant = "primary",
  isDisabled = false,
  shape = "rounded",
  type = "button",
  href = "#",
}: ButtonIconProps) {
  let baseStyle = `flex flex-row items-center gap-4 rounded-full w-fit hover:opacity-60 transition duration-300 ease-in-out ${SHAPES[shape]} ${VARIANTS[variant]}`;

  if (iconPosition === "left") {
    baseStyle += " flex-row-reverse";
  }
  if (isDisabled) {
    baseStyle += " opacity-50 cursor-not-allowed";
  } else {
    baseStyle += " cursor-pointer";
  }

  switch (type) {
    case "button":
      return (
        <button
          className={`${baseStyle}`}
          onClick={eventClick}
          disabled={isDisabled}
        >
          {!iconOnly && label}
          {icon}
        </button>
      );
    case "link":
      return (
        <Link href={href} className={`${baseStyle}`}>
          {!iconOnly && label}
          {icon}
        </Link>
      );
  }
}

export default ButtonIcon;
