import React from "react";

function SearchInput({
  label,
  placeholder,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <label htmlFor="Search" className="flex flex-col gap-1 h-auto w-full">
      {label.length > 0 && (
        <span className="text-sm font-medium text-gray-700"> {label} </span>
      )}

      <div className="relative">
        <input
          type="text"
          id="Search"
          className="w-full rounded-lg bg-white border border-gray-300 px-2 py-2 text-sm sm:text-sm hover:border-black focus:border-black focus:outline-none"
          placeholder={placeholder}
          onChange={(e) => onChangeText(e.target.value)}
        />

        <span className="absolute inset-y-0 right-1 grid w-8 place-content-center">
          <button
            type="button"
            aria-label="Submit"
            className="rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100 bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </label>
  );
}

export default SearchInput;
