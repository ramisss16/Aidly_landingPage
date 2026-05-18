import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-400 hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>
      
      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold transition-all border ${
              currentPage === i + 1
                ? 'bg-[#1D7AFC] text-white border-[#1D7AFC]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#1D7AFC]'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-400 hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
