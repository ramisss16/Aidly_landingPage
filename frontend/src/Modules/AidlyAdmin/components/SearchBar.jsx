import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search by Name" }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="relative flex-1 max-w-[240px]">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchIcon size={16} />
      </div>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#E5E7EB] border-none rounded-full py-1.5 pl-10 pr-4 text-[12px] text-gray-800 placeholder:text-gray-500 focus:outline-none"
      />
    </div>
    <button className="bg-[#1D7AFC] text-white px-6 py-1.5 rounded-[8px] font-bold text-[12px] hover:bg-blue-600 transition-colors shadow-sm">
      Search
    </button>
  </div>
);

export default SearchBar;
