import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingLabel?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const VARIANTS = {
  primary: "bg-stone-900 text-[#F6F2EC] hover:bg-[#C05A32] shadow-none",
  secondary:
    "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:border-stone-300",
  ghost:
    "bg-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-100",
  danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3 text-sm rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      loadingLabel,
      variant = "primary",
      size = "md",
      className = "",
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <div
            className={`border-2 rounded-full animate-spin shrink-0
            ${
              variant === "primary"
                ? "border-[#F6F2EC]/30 border-t-[#F6F2EC]"
                : "border-stone-200 border-t-stone-500"
            }
            ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`}
          />
          {loadingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  ),
);

Button.displayName = "Button";
