import React from "react";

// Tentukan tipe untuk Variant dan Size
type BadgeVariant = "primary" | "success" | "warning" | "danger" | "neutral";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string; // Untuk custom styling tambahan
  icon?: React.ReactNode;
}

const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  icon,
}: BadgeProps) => {
  // Mapping warna berdasarkan variant
  const variants = {
    primary: "bg-primary text-white border-primary",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    neutral: "bg-gray-100 text-gray-700 border-gray-200",
  };

  // Mapping ukuran
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <div
      className={`
        inline-flex items-center font-medium border rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge;
