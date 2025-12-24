import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ButtonCTAProps {
  href: string;
  label: string;
  variant: string;
}

function ButtonCTA({ href, label, variant = "primary" }: ButtonCTAProps) {
  const baseStyle =
    "flex flex-row items-center gap-4 pl-4 pr-1 py-1 rounded-full w-fit";

  switch (variant) {
    case "primary":
      return (
        <Link href={href} className={`${baseStyle} bg-black text-white`}>
          {label}{" "}
          <div className="flex items-center p-2 bg-white rounded-full">
            <MoveRight size={20} color="black" />
          </div>
        </Link>
      );
    case "secondary":
      return (
        <Link href={href} className={`${baseStyle} bg-white text-black`}>
          {label}{" "}
          <div className="flex items-center p-2 bg-black rounded-full">
            <MoveRight size={20} color="white" />
          </div>
        </Link>
      );
  }
}

export default ButtonCTA;
