import { useState, useEffect } from 'react';

export const SearchBar = ({ onSearch }: { onSearch: (q: string) => void }) => {
  const [input, setInput] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => onSearch(input), 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <input
      type="text"
      className="border p-2 rounded w-full"
      placeholder="Search photos..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};
