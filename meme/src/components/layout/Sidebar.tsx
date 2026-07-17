import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, BarChart3, Pill, Package,
  Stethoscope, ClipboardList, UserRound, Dog, CalendarDays, Receipt,
  Briefcase
} from 'lucide-react';

const menuGroups = [
  {
    title: 'ADMIN',
    color: 'text-blue-600',
    items: [
      { label: 'Trang chính', path: '/', icon: LayoutDashboard },
      { label: 'Quản lý nhân viên', path: '/employees', icon: Users },
      { label: 'Báo cáo thống kê', path: '/reports', icon: BarChart3 },
      { label: 'Quản lý thuốc', path: '/medicines', icon: Pill },
      { label: 'Quản lý nhập kho', path: '/inventory', icon: Package },
      { label: 'Quản lý dịch vụ', path: '/services', icon: Briefcase },
    ]
  },
  {
    title: 'BÁC SĨ',
    color: 'text-red-500',
    items: [
      { label: 'Quản lý khám bệnh', path: '/checkup', icon: Stethoscope },
      { label: 'Quản lý đơn thuốc', path: '/prescriptions', icon: ClipboardList },
    ]
  },
  {
    title: 'LỄ TÂN',
    color: 'text-emerald-600',
    items: [
      { label: 'Quản lý khách hàng', path: '/customers', icon: UserRound },
      { label: 'Quản lý vật nuôi', path: '/pets', icon: Dog },
      { label: 'Quản lý lịch hẹn', path: '/appointments', icon: CalendarDays },
      { label: 'Quản lý hóa đơn', path: '/billing', icon: Receipt },
    ]
  }
];

const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <div className={`bg-white border-r border-slate-200 flex flex-col h-full transition-all duration-300 shadow-sm ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="min-w-[40px] h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Dog size={24} />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight text-slate-800">Vet<span className="text-blue-600">System</span></span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <div className={`text-[11px] font-bold tracking-[2px] mb-3 px-3 ${group.color} opacity-80`}>
                &lt;&lt; {group.title} &gt;&gt;
              </div>
            )}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      active
                        ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={20} className={active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
                    {!collapsed && <span className="text-[14px] font-medium">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
            {!collapsed && idx !== menuGroups.length - 1 && <div className="mt-4 border-b border-slate-100 mx-3"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;