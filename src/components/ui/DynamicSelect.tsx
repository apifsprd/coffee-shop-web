import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface SelectOption {
  label: string;
  value: string | number;
  image?: string; // Tambahkan ini untuk URL gambar
}

interface DynamicSelectProps {
  options: SelectOption[];
  selectedValue?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function DynamicSelect({
  options,
  selectedValue,
  onChange,
  placeholder = "Choose an option...",
  label,
  className = "",
}: DynamicSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cari objek opsi yang sedang terpilih untuk ditampilkan di header
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Menutup dropdown jika klik di luar area komponen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex flex-col gap-2 relative ${className}`}
      ref={dropdownRef}
    >
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer z-10"
      >
        <div className="flex items-center gap-3">
          {selectedOption?.image && (
            <img
              src={selectedOption.image}
              alt=""
              className="w-8 h-8 object-contain"
            />
          )}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Menu Dropdown - Pastikan top-full agar muncul di bawah box */}
      {isOpen && (
        <div className="absolute left-0 top-full z-[999] w-full mt-1 bg-white border rounded-md shadow-xl border-gray-200">
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  {option.image && (
                    <img
                      src={option.image}
                      className="w-8 h-8 object-contain"
                      alt=""
                    />
                  )}
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400 text-sm">No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
