import { Eye, EyeClosed, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import React, { useState } from "react";

interface TextInputProps {
  label: string;
  InputType: string;
  inputValue: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder: string;
  isDisabled?: boolean;
  mandatory?: boolean;
  helperText?: string;
}

export default function TextInput({
  label,
  InputType,
  inputValue,
  inputOnChange,
  inputPlaceholder,
  isDisabled = false,
  mandatory = false,
  helperText,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={label?.toLowerCase()}
        className="block text-base font-semibold text-gray-700 mb-2"
      >
        {label}
        {mandatory && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        <input
          id={label.toLowerCase()}
          type={
            InputType === "password"
              ? showPassword
                ? "text"
                : "password"
              : InputType
          }
          required={mandatory}
          value={inputValue}
          onChange={inputOnChange}
          placeholder={inputPlaceholder}
          disabled={isDisabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {InputType === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            {showPassword ? (
              <LockKeyholeOpen size={20} color="black" />
            ) : (
              <LockKeyhole size={20} color="black" />
            )}
          </button>
        )}
      </div>
      {helperText && (
        <div className="mt-1">
          <p className="text-sm text-gray-500">{helperText}</p>
        </div>
      )}
    </div>
  );
}
