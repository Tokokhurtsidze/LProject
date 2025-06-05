import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = "" }: SearchBarProps) => {
  const [input, setInput] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input.trim() || "nature");
    }, 500);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search photos..."
      className="border p-2 mb-4 w-full rounded"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};
