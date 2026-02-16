import React from "react";

interface TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  children: React.ReactNode;
  className?: string;
}

const Text = ({ variant = "p", children, className = "" }: TextProps) => {
  // Map variant ke tag HTML
  const Component = variant;

  // Map variant ke styling default (Tailwind)
  const styles = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    p: "text-base font-normal",
    span: "text-sm",
  };

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export { Text };
