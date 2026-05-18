import React from 'react';

const TopTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2.5 text-[13px] font-bold transition-all shadow-sm ${
            activeTab === tab.id
              ? 'bg-[#374151] text-white rounded-t-[12px]'
              : 'bg-[#F9FAFB] text-[#374151] hover:bg-gray-100 rounded-t-[12px] border-b border-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TopTabs;
