import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from "@/components(shadcn)/ui/checkbox";
import { Label } from "@/components(shadcn)/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

export const CheckboxDropdown = ({ options, selectedValues, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(updatedValues);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between p-2 border rounded-md cursor-pointer"
        onClick={handleToggle}
      >
        <span className="text-sm text-gray-500">
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div key={option.value} className="flex items-center p-2 hover:bg-gray-100">
              <Checkbox
                id={option.value}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />
              <Label htmlFor={option.value} className="ml-2 text-sm cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
