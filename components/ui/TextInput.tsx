import { forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-700
        placeholder:text-stone-300 focus:outline-none focus:ring-2 transition-all
        ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-stone-200 focus:border-[#C05A32] focus:ring-[#C05A32]/10"
        } ${className}`}
      {...props}
    />
  ),
);

TextInput.displayName = "TextInput";
