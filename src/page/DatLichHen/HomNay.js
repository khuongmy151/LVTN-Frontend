import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { 
  FaCalendarAlt, FaSearch, FaRedo, FaChevronDown, 
  FaCheck, FaClock, FaUser, FaPaw, FaPhone,
  FaFilter, FaTimes
} from 'react-icons/fa';

function HomNay() {
  // State management
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [selectAll, setSelectAll] = useState(false);
  const [quickSelect, setQuickSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [phoneFilter, setPhoneFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      code: 'LH2026061001',
      customerName: 'Đỗ Hân Diệu',
      customerCode: 'BN230227005',
      phone: '09142404814240',
      petName: 'Bun',
      petSpecies: 'Chó (Dog)',
      petBreed: 'Pug',
      appointmentDate: '10/06/2026',
      appointmentTime: '09:00',
      status: 'confirmed', // confirmed, pending, cancelled
      service: 'Khám tổng quát',
      notes: 'Tiêm phòng định kỳ',
      room: 'Phòng khám 1',
      doctor: 'BS. Bình'
    },
    {
      id: 2,
      code: 'LH2026061002',
      customerName: 'Võ An Diệp',
      customerCode: 'BN230227004',
      phone: '09142394814239',
      petName: 'Gà',
      petSpecies: 'Gà (Chicken)',
      petBreed: 'Khác',
      appointmentDate: '10/06/2026',
      appointmentTime: '10:30',
      status: 'pending',
      service: 'Cắt chỉ',
      notes: '',
      room: 'Phòng khám 2',
      doctor: 'BS. An'
    }
  ]);

  // Filter options
  const groupOptions = [
    { value: 'all', label: 'Tất cả nhóm' },
    { value: 'thanthiet', label: 'Khách hàng thân thiết' },
    { value: 'moi', label: 'Khách hàng mới' },
    { value: 'vip', label: 'Khách hàng VIP' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'cancelled', label: 'Đã hủy' },
    { value: 'completed', label: 'Hoàn thành' }
  ];

  const phoneOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'has_phone', label: 'Có điện thoại' },
    { value: 'no_phone', label: 'Không có điện thoại' }
  ];

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    // Filter by date range
    const aptDate = apt.appointmentDate.split('/').reverse().join('-');
    if (dateFrom && aptDate < dateFrom) return false;
    if (dateTo && aptDate > dateTo) return false;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        apt.customerName.toLowerCase().includes(term) ||
        apt.petName.toLowerCase().includes(term) ||
        apt.phone.includes(term) ||
        apt.code.toLowerCase().includes(term)
      );
    }

    // Filter by group
    if (groupFilter !== 'all') {
      // Add logic based on customer group
    }

    // Filter by status
    if (statusFilter !== 'all' && apt.status !== statusFilter) return false;

    // Filter by phone
    if (phoneFilter === 'has_phone' && !apt.phone) return false;
    if (phoneFilter === 'no_phone' && apt.phone) return false;

    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const getStatusLabel = (status) => {
    const labels = {
      confirmed: 'Đã xác nhận',
      pending: 'Chờ xác nhận',
      cancelled: 'Đã hủy',
      completed: 'Hoàn thành'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: '#4CAF50',
      pending: '#FF9800',
      cancelled: '#f44336',
      completed: '#2196F3'
    };
    return colors[status] || '#999';
  };

  const handleRefresh = () => {
    // Refresh data logic
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setDateFrom(new Date().toISOString().split('T')[0]);
    setDateTo(new Date().toISOString().split('T')[0]);
    setSearchTerm('');
    setGroupFilter('all');
    setStatusFilter('all');
    setPhoneFilter('all');
    setCurrentPage(1);
  };

  return (
    <div className="khachhang-container">
      <div className="khachhang-header">
        <h2>HÔM NAY</h2>
        <button className="btn-refresh" onClick={handleRefresh} title="Làm mới">
          <FaRedo />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="search-filter-container" style={{ padding: '12px 15px' }}>
        {/* Date Range Section */}
        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaCalendarAlt style={{ color: '#4ECDC4' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Từ</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={{ 
                padding: '6px 10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '13px',
                minWidth: '130px'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Đến</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              style={{ 
                padding: '6px 10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '13px',
                minWidth: '130px'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => setSelectAll(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#4ECDC4' }}
              />
              <span>Tất cả</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={quickSelect}
                onChange={(e) => setQuickSelect(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#4ECDC4' }}
              />
              <span>Chọn nhanh</span>
            </label>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-group" style={{ flex: 1, marginLeft: '15px' }}>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            style={{ 
              padding: '8px 10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '13px',
              minWidth: '120px',
              cursor: 'pointer'
            }}
          >
            {groupOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ 
              padding: '8px 10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '13px',
              minWidth: '130px',
              cursor: 'pointer'
            }}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            style={{ 
              padding: '8px 10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '13px',
              minWidth: '120px',
              cursor: 'pointer'
            }}
          >
            {phoneOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nhập từ cần tìm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ 
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '13px',
              outline: 'none',
              minWidth: '200px'
            }}
          />

          <button 
            className="search-btn"
            style={{ 
              padding: '8px 16px',
              background: searchTerm ? '#4ECDC4' : 'white',
              color: searchTerm ? 'white' : '#666',
              border: `1px solid ${searchTerm ? '#4ECDC4' : '#ddd'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: searchTerm ? '600' : '400'
            }}
          >
            <FaSearch /> Tìm kiếm
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="table-wrapper" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {currentAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              margin: '0 auto 20px',
              background: '#f5f5f5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaCalendarAlt size={40} style={{ color: '#ddd' }} />
            </div>
            <p style={{ fontSize: '14px', color: '#bbb' }}>
              Không có dữ liệu để hiển thị theo yêu cầu
            </p>
            <button 
              onClick={handleClearFilters}
              style={{
                marginTop: '20px',
                padding: '8px 20px',
                background: '#4ECDC4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FaTimes /> Xóa bộ lọc
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th width="40">
                  <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                </th>
                <th>MÃ LH</th>
                <th>THỜI GIAN</th>
                <th>KHÁCH HÀNG</th>
                <th>VẬT NUÔI</th>
                <th>DỊCH VỤ</th>
                <th>TRẠNG THÁI</th>
                <th>PHÒNG</th>
                <th>BÁC SĨ</th>
                <th>GHI CHÚ</th>
                <th width="120">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                  </td>
                  <td className="code-cell">{apt.code}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaClock style={{ color: '#4ECDC4' }} />
                      <span>{apt.appointmentTime}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600' }}>{apt.customerName}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{apt.customerCode}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaPaw style={{ color: '#4ECDC4', fontSize: '12px' }} />
                        <span style={{ fontWeight: '500' }}>{apt.petName}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{apt.petSpecies}</div>
                    </div>
                  </td>
                  <td>{apt.service}</td>
                  <td>
                    <span 
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: getStatusColor(apt.status) + '20',
                        color: getStatusColor(apt.status)
                      }}
                    >
                      {getStatusLabel(apt.status)}
                    </span>
                  </td>
                  <td>{apt.room}</td>
                  <td>{apt.doctor}</td>
                  <td style={{ fontSize: '12px', color: '#666' }}>{apt.notes || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button className="icon-btn" title="Xem chi tiết">
                        <FaSearch />
                      </button>
                      <button className="icon-btn edit" title="Chỉnh sửa">
                        <FaCheck />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {currentAppointments.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Hiển thị {filteredAppointments.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredAppointments.length)} 
            trong tổng số <strong>{filteredAppointments.length}</strong> lịch hẹn
          </div>

          <div className="per-page">
            <span>Số mục / trang:</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="per-page-select"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomNay;