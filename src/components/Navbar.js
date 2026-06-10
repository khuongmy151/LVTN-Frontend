import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUsers, FaCalendarAlt, FaClipboardList, FaMoneyBillWave,
  FaPills, FaBoxOpen, FaChartLine, FaCog, FaUserCircle
} from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    {
      label: 'HỒ SƠ ĐIỆN TỬ', icon: <FaUsers />, path: '/khach-hang',
      children: [
        { label: 'Khách hàng', path: '/khach-hang' },
        { label: 'Vật nuôi', path: '/vat-nuoi' },
      ]
    },
    {
      label: 'LỊCH HẸN', icon: <FaCalendarAlt />, path: '/lich-hen/hom-nay',
      children: [
        { label: 'Hôm nay', path: '/lich-hen/hom-nay' },
        { label: 'Quản lý lịch hẹn', path: '/lich-hen/quan-ly' },
        { label: 'Block lịch hẹn', path: '/lich-hen/block' },
        { label: 'Bác sĩ', path: '/lich-hen/bac' },
      ]
    },
    {
      label: 'KHÁM BỆNH', icon: <FaClipboardList />, path: '/kham-benh/phieu-chi-dinh',
      children: [
        { label: 'Phiếu chỉ định', path: '/kham-benh/phieu-chi-dinh' },
        { label: 'Đơn thuốc', path: '/kham-benh/don-thuoc' },
      ]
    },
    {
      label: 'THU CHI', icon: <FaMoneyBillWave />, path: '/thu-chi/hoa-don',
      children: [
        { label: 'Hóa đơn', path: '/thu-chi/hoa-don' },
        { label: 'Phiếu thu chi', path: '/thu-chi/phieu-thu-chi' },
      ]
    },
    {
      label: 'THUỐC', icon: <FaPills />, path: '/thuoc-vat-tu',
      children: [
        { label: 'Thuốc & Vật tư', path: '/thuoc-vat-tu' },
        { label: 'Nhập kho', path: '/thuoc-vat-tu/nhap-kho' },
      ]
    },
    {
      label: 'SẢN PHẨM', icon: <FaBoxOpen />, path: '/thuoc-vat-tu',
      children: []
    },
    {
      label: 'BÁO CÁO', icon: <FaChartLine />, path: '/bao-cao/thong-ke',
      children: [
        { label: 'Thống kê tổng hợp', path: '/bao-cao/thong-ke' },
      ]
    },
    {
      label: 'CÀI ĐẶT', icon: <FaCog />, path: '/caidat',
      children: []
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <div className="logo-icon">
            <div className="logo-circle"></div>
          </div>
          <div className="logo-text">
            <span className="logo-sub">your logo</span>
            <span className="logo-main">HERE</span>
          </div>
        </div>

        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onMouseEnter={() => item.children.length > 0 && setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
              {item.children.length > 0 && activeDropdown === index && (
                <div className="dropdown-menu">
                  {item.children.map((child, ci) => (
                    <Link key={ci} to={child.path} className="dropdown-item">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="navbar-right">
        <FaUserCircle className="user-avatar" size={36} />
      </div>
    </nav>
  );
}

export default Navbar;