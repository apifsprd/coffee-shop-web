import { Eye, EyeClosed, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import React, { useState } from "react";

interface TextInputProps {
  label: string;
  InputType: string;
  inputValue: string | number;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder: string;
  isDisabled?: boolean;
  mandatory?: boolean;
  helperText?: string;
  labelStyle?: string;
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
  labelStyle = "block text-base font-semibold text-gray-700",
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={label?.toLowerCase()} className={labelStyle}>
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
          className={`${isDisabled ? "bg-gray-100" : "bg-white"} border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-50 block w-full p-2.5`}
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
