import React, { useState } from 'react';
import { Menu, ChevronDown, User, LogOut } from 'lucide-react';

interface HeaderProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-8 justify-between sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Cụm User Profile */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-4 p-1.5 pl-3 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all"
        >
          {/* Thông tin Text */}
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800">BS. Lê Tấn</div>
            <div className="text-[11px] text-slate-500 font-medium">Email: tan.le@vet.com</div>
            <div className="text-[11px] text-blue-600 font-medium">Sđt: 0901.234.567</div>
          </div>

          {/* Avatar và Mũi tên */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-100 border-2 border-white rounded-xl shadow-sm flex items-center justify-center text-xl overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <User size={16} />
              Xem thông tin
            </button>
            <div className="h-px bg-slate-100 my-1 mx-2"></div>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;