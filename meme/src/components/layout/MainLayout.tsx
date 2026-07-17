import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar - Truyền state collapsed vào */}
      <Sidebar collapsed={collapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Truyền hàm toggle vào */}
        <Header collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;