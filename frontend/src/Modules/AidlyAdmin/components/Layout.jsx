import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center overflow-x-hidden" 
      style={{ background: 'linear-gradient(180deg, #1A5F48 0%, #4FA391 100%)' }}
    >
      <div className="w-full max-w-[1366px] min-h-screen flex flex-col bg-transparent shadow-2xl">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 bg-[#F8FAFC]/95 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
