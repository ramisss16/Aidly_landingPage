import React from "react";
import { Eye, Trash2 } from "lucide-react";

const DataTable = ({ columns, data, onView, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A5F48]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F3F4F6] border-b border-gray-200">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-tight border-r border-gray-200 last:border-r-0"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-tight text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-[#F9FAFB] transition-colors border-b border-gray-50"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-2 whitespace-nowrap text-[12px] font-medium text-gray-600 border-r border-gray-50 last:border-r-0"
                  >
                    {col.render
                      ? col.render(row, rowIdx)
                      : row[col.key] || "N/A"}
                  </td>
                ))}
                <td className="px-4 py-2 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="bg-[#1D7AFC] text-white px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-blue-600 transition-all"
                      >
                        <Eye size={12} strokeWidth={3} />
                        View
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="bg-red-500 text-white px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={12} strokeWidth={3} />
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
