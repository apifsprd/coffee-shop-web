import React, { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  charLimit?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, error, helperText, charLimit, className, value, ...props },
    ref,
  ) => {
    const charCount = value ? String(value).length : 0;

    return (
      <div className="flex flex-col w-full gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-gray-700 ml-1">
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            className={`
              w-full min-h-30 p-3 rounded-xl border transition-all duration-200 outline-none resize-y
              ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              }
              ${className}
            `}
            value={value}
            {...props}
          />

          {charLimit && (
            <div
              className={`absolute bottom-2 right-3 text-[10px] font-medium ${charCount > charLimit ? "text-red-500" : "text-gray-400"}`}
            >
              {charCount}/{charLimit}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-500 ml-1 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-gray-500 ml-1">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
