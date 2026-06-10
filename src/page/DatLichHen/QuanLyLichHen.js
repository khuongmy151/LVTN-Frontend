import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { 
  FaCalendarAlt, FaSearch, FaRedo, FaChevronDown, 
  FaCheck, FaTimes, FaEdit, FaPlus, FaTrash,
  FaClock, FaUser, FaPaw, FaPhone, FaMapMarkerAlt,
  FaFileMedical, FaClipboardList, FaEllipsisH,
  FaExchangeAlt, FaFolderOpen, FaChevronUp, FaSave, FaPrint
} from 'react-icons/fa';

function QuanLyLichHen() {
  // ===== STATE MANAGEMENT =====
  const [dateFrom, setDateFrom] = useState('11/06/2026');
  const [dateTo, setDateTo] = useState('18/06/2026');
  const [selectAll, setSelectAll] = useState(false);
  const [quickSelect, setQuickSelect] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [phoneFilter, setPhoneFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  // Modal states
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    newCustomer: false,
    newPet: false,
    appointmentDetails: true
  });

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1, stt: 1, date: '18/10/2023', timeFrom: '12:00', timeTo: '09:00',
      customerName: 'Võ Cát Tường', customerPhone: '0902686529', customerAddress: 'Ninh Thuận',
      petName: 'BI', petCode: 'PE150023152', petSpecies: 'Mèo (Cat)', petBreed: 'Việt Nam',
      reason: 'Xổ mũi ghkgh', oldPrescriptionNotes: '', isReexam: true,
      room: 'Phòng khám', doctor: 'BS. An', status: 'Chưa khám', notes: ''
    }
  ]);

  // Quick appointment slots
  const quickSlots = [
    { id: 1, datetime: '11/6/2026 - 07:00' },
    { id: 2, datetime: '11/6/2026 - 14:00' },
    { id: 3, datetime: '11/6/2026 - 18:00' }
  ];

  // Form states
  const [appointmentForm, setAppointmentForm] = useState({
    customerId: '', customerName: '', customerPhone: '', customerAddress: '',
    customerAlias: '', customerGender: 'Nam', petId: '', petName: '',
    petSpecies: 'Cho', petBreed: '', petGender: 'Duc', petColor: '',
    petTemperature: '', petWeight: '', petBirthday: new Date().toISOString().split('T')[0],
    appointmentDate: new Date().toISOString().split('T')[0], isAllDay: false,
    room: 'Phong kham', doctorId: '', reason: '', notes: '', status: 'Chua kham'
  });

  const [examForm, setExamForm] = useState({
    customerId: '', customerName: '', customerCode: '', petId: '', petName: '',
    petCode: '', petInfo: '', date: '10/06/2026', isAllDay: true,
    room: 'Phong kham', doctorId: '', reason: '', notes: '',
    status: 'Xac nhan kham', temperature: '', weight: ''
  });

  // Filter options
  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'Chua kham', label: 'Chưa khám' },
    { value: 'Da kham', label: 'Đã khám' },
    { value: 'Cho xac nhan', label: 'Chờ xác nhận' },
    { value: 'Xac nhan', label: 'Đã xác nhận' }
  ];

  const phoneOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'has_phone', label: 'Có điện thoại' },
    { value: 'no_phone', label: 'Không có' }
  ];

  // ===== FILTER LOGIC =====
  const filteredAppointments = appointments.filter((apt) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        apt.customerName.toLowerCase().includes(term) ||
        apt.petName.toLowerCase().includes(term) ||
        apt.customerPhone.includes(term) ||
        apt.reason.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
    if (phoneFilter === 'has_phone' && !apt.customerPhone) return false;
    if (phoneFilter === 'no_phone' && apt.customerPhone) return false;

    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  // ===== HANDLERS =====
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Xử lý nút "Khách hàng mới" → mở modal Đặt lịch hẹn ĐẦY ĐỦ
  const handleNewCustomer = () => {
    setAppointmentForm({
      customerId: '', customerName: '', customerPhone: '', customerAddress: '',
      customerAlias: '', customerGender: 'Nam', petId: '', petName: '',
      petSpecies: 'Cho', petBreed: '', petGender: 'Duc', petColor: '',
      petTemperature: '', petWeight: '', petBirthday: new Date().toISOString().split('T')[0],
      appointmentDate: new Date().toISOString().split('T')[0], isAllDay: false,
      room: 'Phong kham', doctorId: '', reason: '', notes: '', status: 'Chua kham'
    });
    setExpandedSections({
      customer: true, newCustomer: false, newPet: false, appointmentDetails: true
    });
    setShowAppointmentModal(true);
  };

  // Xử lý nút "Tái khám" → mở modal Đăng ký khám
  const handleReexam = () => {
    setExamForm({
      customerId: '', customerName: '', customerCode: '', petId: '', petName: '',
      petCode: '', petInfo: '', date: '10/06/2026', isAllDay: true,
      room: 'Phong kham', doctorId: '', reason: '', notes: '',
      status: 'Xac nhan kham', temperature: '', weight: ''
    });
    setShowExamModal(true);
  };

  // Click vào icon tái khám trong bảng
  const handleShowAppointment = (appointment) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setExamForm({
        ...examForm,
        customerId: appointment.id,
        customerName: appointment.customerName,
        customerCode: `BN${appointment.id}`,
        petInfo: `${appointment.petName} - ${appointment.petCode}`,
        reason: appointment.reason,
        notes: appointment.notes
      });
    }
    setShowExamModal(true);
  };

  const handleShowNewAppointment = (slot) => {
    handleNewCustomer();
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    console.log('Saving appointment:', appointmentForm);
    alert('Đặt lịch hẹn thành công!');
    setShowAppointmentModal(false);
  };

  const handleSaveExam = (e) => {
    e.preventDefault();
    console.log('Saving exam:', examForm);
    alert('Đăng ký khám thành công!');
    setShowExamModal(false);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    setSearchTerm('');
    setStatusFilter('all');
    setPhoneFilter('all');
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="khachhang-container">
      {/* ===== HEADER ===== */}
      <div className="khachhang-header">
        <h2>LỊCH HẸN</h2>
        <button className="btn-refresh" onClick={handleRefresh} title="Làm mới">
          <FaRedo />
        </button>
      </div>

      {/* ===== FILTER BAR (GIỮ NGUYÊN TỪ CODE 2) ===== */}
      <div className="search-filter-container" style={{ padding: '12px 15px' }}>
        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaCalendarAlt style={{ color: '#4ECDC4' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Từ</span>
            <input
              type="text"
              value={dateFrom}
              readOnly
              style={{ 
                padding: '6px 10px', border: 'none', background: 'transparent',
                fontSize: '13px', minWidth: '100px', fontWeight: '500'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Đến</span>
            <input
              type="text"
              value={dateTo}
              readOnly
              style={{ 
                padding: '6px 10px', border: 'none', background: 'transparent',
                fontSize: '13px', minWidth: '100px', fontWeight: '500'
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
              <span>Chọn nhanh</span>
            </label>
          </div>
        </div>

        <div className="search-group" style={{ flex: 1, marginLeft: '15px', display: 'flex', gap: '8px' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ 
              padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px',
              fontSize: '13px', minWidth: '120px', cursor: 'pointer', background: 'white'
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
              padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px',
              fontSize: '13px', minWidth: '110px', cursor: 'pointer', background: 'white'
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
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ 
              flex: 1, padding: '8px 12px', border: '1px solid #ddd',
              borderRadius: '4px', fontSize: '13px', outline: 'none', minWidth: '200px'
            }}
          />

          <button 
            className="search-btn"
            style={{ 
              padding: '8px 16px', background: 'white', color: '#666',
              border: '1px dashed #ddd', borderRadius: '20px',
              cursor: 'pointer', fontSize: '13px'
            }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* ===== QUICK APPOINTMENT SECTION (GIỮ NGUYÊN TỪ CODE 2) ===== */}
      <div style={{ 
        border: '1px dashed #4ECDC4', borderRadius: '8px', padding: '15px',
        marginBottom: '20px', background: '#f8f9fa'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#4ECDC4', fontWeight: '600' }}>
          Đặt lịch hẹn
        </h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {quickSlots.map(slot => (
            <div 
              key={slot.id}
              onClick={() => handleShowNewAppointment(slot)}
              style={{
                padding: '12px 20px', background: 'white', borderRadius: '4px',
                border: '1px solid #e0e0e0', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '15px',
                fontSize: '13px', transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0f0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
            >
              <span style={{ fontWeight: '500', color: '#333' }}>{slot.datetime}</span>
              <button
                onClick={(e) => { e.stopPropagation(); handleReexam(); }}
                style={{
                  padding: '4px 12px', background: '#4CAF50', color: 'white',
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                  fontSize: '12px', fontWeight: '500'
                }}
              >
                Tái khám
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNewCustomer(); }}
                style={{
                  padding: '4px 12px', background: 'transparent', color: '#4CAF50',
                  border: '1px solid #4CAF50', borderRadius: '4px',
                  cursor: 'pointer', fontSize: '12px', fontWeight: '500'
                }}
              >
                Khách hàng mới
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MAIN TABLE (GIỮ NGUYÊN TỪ CODE 2) ===== */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th width="40"></th>
              <th width="50">STT</th>
              <th>NGÀY</th>
              <th>TỪ</th>
              <th>ĐẾN</th>
              <th>KHÁCH HÀNG</th>
              <th>VẬT NUÔI</th>
              <th>LÝ DO KHÁM</th>
              <th>LỜI DẶN TRONG ĐT CŨ</th>
              <th width="60">TÁI KHÁM</th>
              <th>PHÒNG</th>
              <th>BS KHÁM</th>
              <th>TRẠNG THÁI</th>
              <th width="60">ĐỔI GIỜ</th>
              <th width="60">HỒ SƠ</th>
              <th width="40">...</th>
              <th width="60">XÓA</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length === 0 ? (
              <tr>
                <td colSpan="17" className="no-data-row">
                  <p>Không có dữ liệu để hiển thị theo yêu cầu</p>
                </td>
              </tr>
            ) : (
              currentAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td><button className="expand-btn"><FaPlus /></button></td>
                  <td>{apt.stt}</td>
                  <td>{apt.date}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.timeFrom || '-'}</span>
                      <FaEdit size={12} style={{ color: '#4ECDC4', cursor: 'pointer' }} />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.timeTo || '-'}</span>
                      <FaEdit size={12} style={{ color: '#4ECDC4', cursor: 'pointer' }} />
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: '600', color: '#2196F3', cursor: 'pointer' }}>
                        {apt.customerName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <FaPhone size={10} style={{ marginRight: '3px' }} />{apt.customerPhone}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <FaMapMarkerAlt size={10} style={{ marginRight: '3px' }} />{apt.customerAddress}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: '500', color: '#4ECDC4' }}>
                        <FaPaw size={12} style={{ marginRight: '5px' }} />
                        {apt.petName} - {apt.petCode}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {apt.petSpecies} - {apt.petBreed}
                      </div>
                      {apt.petAge && (
                        <div style={{ fontSize: '12px', color: '#888' }}>{apt.petAge}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.reason}</span>
                      <FaEdit size={12} style={{ color: '#4ECDC4', cursor: 'pointer' }} />
                    </div>
                  </td>
                  <td>{apt.oldPrescriptionNotes || '-'}</td>
                  <td>
                    {apt.isReexam && (
                      <div 
                        onClick={() => handleShowAppointment(apt)}
                        style={{ 
                          width: '24px', height: '24px', borderRadius: '50%',
                          border: '2px solid #4CAF50', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', margin: '0 auto'
                        }}
                        title="Đăng ký khám"
                      >
                        <FaCheck style={{ color: '#4CAF50', fontSize: '12px' }} />
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.room || '-'}</span>
                      <FaEdit size={12} style={{ color: '#4ECDC4', cursor: 'pointer' }} />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.doctor || '-'}</span>
                      <FaEdit size={12} style={{ color: '#4ECDC4', cursor: 'pointer' }} />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.status}</span>
                      <FaEdit size={12} style={{ color: '#4ECDC4', cursor: 'pointer' }} />
                    </div>
                  </td>
                  <td><button className="icon-btn" title="Đổi giờ"><FaClock /></button></td>
                  <td><button className="icon-btn profile" title="Hồ sơ"><FaFolderOpen /></button></td>
                  <td><button className="icon-btn" title="Thêm"><FaPlus /></button></td>
                  <td><button className="icon-btn" title="Xóa"><FaTrash /></button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION (GIỮ NGUYÊN TỪ CODE 2) ===== */}
      <div className="pagination">
        <div className="pagination-info">Trang</div>
        
        <div className="pagination-controls">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <span style={{ padding: '0 8px' }}>...</span>
          <button className="page-btn">174</button>
          <button className="page-btn">175</button>
          <button className="page-btn">176</button>
        </div>

        <div className="pagination-settings">
          <span>Trang</span>
          <input 
            type="number" min="1" max={totalPages}
            value={currentPage} 
            onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
            className="page-input"
            style={{ width: '50px', padding: '4px', textAlign: 'center' }}
          />
          <span>Số mục / trang:</span>
          <select 
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="per-page-select"
            style={{ padding: '4px', fontSize: '13px' }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* ===== MODAL: ĐẶT LỊCH HẸN (TỪ CODE 1 - ĐẦY ĐỦ) ===== */}
      {showAppointmentModal && (
        <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ĐẶT LỊCH HẸN</h3>
              <button className="close-btn" onClick={() => setShowAppointmentModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveAppointment}>
              <div className="modal-body">
                {/* Section: Khách hàng */}
                <div className="collapsible-section">
                  <div className="section-header" onClick={() => toggleSection('customer')}>
                    <h4>Khách hàng</h4>
                    <button type="button" className="section-toggle-btn">
                      {expandedSections.customer ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  {expandedSections.customer && (
                    <div className="section-content">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Tìm theo tên hoặc số điện thoại"
                          style={{ 
                            width: '100%', padding: '10px', border: '2px solid #4ECDC4',
                            borderRadius: '4px', fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Section: Thêm khách hàng mới */}
                <div className="collapsible-section">
                  <div className="section-header" onClick={() => toggleSection('newCustomer')}>
                    <h4>Thêm khách hàng mới</h4>
                    <button type="button" className="section-toggle-btn">
                      {expandedSections.newCustomer ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  {expandedSections.newCustomer && (
                    <div className="section-content">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Tên Khách hàng</label>
                          <input 
                            type="text"
                            value={appointmentForm.customerName}
                            onChange={(e) => setAppointmentForm({...appointmentForm, customerName: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Bí danh</label>
                          <input 
                            type="text"
                            value={appointmentForm.customerAlias}
                            onChange={(e) => setAppointmentForm({...appointmentForm, customerAlias: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Giới tính</label>
                          <select
                            value={appointmentForm.customerGender}
                            onChange={(e) => setAppointmentForm({...appointmentForm, customerGender: e.target.value})}
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nu">Nữ</option>
                            <option value="Khac">Khác</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Điện thoại</label>
                          <input 
                            type="tel"
                            value={appointmentForm.customerPhone}
                            onChange={(e) => setAppointmentForm({...appointmentForm, customerPhone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group full-width">
                          <label>Địa chỉ</label>
                          <input 
                            type="text"
                            value={appointmentForm.customerAddress}
                            onChange={(e) => setAppointmentForm({...appointmentForm, customerAddress: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section: Thêm vật nuôi mới */}
                <div className="collapsible-section">
                  <div className="section-header" onClick={() => toggleSection('newPet')}>
                    <h4>Thêm vật nuôi mới</h4>
                    <button type="button" className="section-toggle-btn">
                      {expandedSections.newPet ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  {expandedSections.newPet && (
                    <div className="section-content">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Tên vật nuôi</label>
                          <input 
                            type="text"
                            value={appointmentForm.petName}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petName: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Ngày sinh (dd/MM/yyyy)</label>
                          <input 
                            type="date"
                            value={appointmentForm.petBirthday}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petBirthday: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Loài</label>
                          <select
                            value={appointmentForm.petSpecies}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petSpecies: e.target.value})}
                          >
                            <option value="Cho">Chó (Dog)</option>
                            <option value="Meo">Mèo (Cat)</option>
                            <option value="Khac">Khác</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Giống</label>
                          <input 
                            type="text"
                            value={appointmentForm.petBreed}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petBreed: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Giới tính</label>
                          <select
                            value={appointmentForm.petGender}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petGender: e.target.value})}
                          >
                            <option value="Duc">Đực</option>
                            <option value="Cai">Cái</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Màu sắc</label>
                          <input 
                            type="text"
                            value={appointmentForm.petColor}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petColor: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nhiệt độ</label>
                          <input 
                            type="text"
                            value={appointmentForm.petTemperature}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petTemperature: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cân nặng (Kg)</label>
                          <input 
                            type="number"
                            step="0.1"
                            value={appointmentForm.petWeight}
                            onChange={(e) => setAppointmentForm({...appointmentForm, petWeight: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section: Chi tiết Lịch hẹn */}
                <div className="collapsible-section">
                  <div className="section-header" onClick={() => toggleSection('appointmentDetails')}>
                    <h4>Chi tiết Lịch hẹn</h4>
                    <button type="button" className="section-toggle-btn">
                      {expandedSections.appointmentDetails ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  {expandedSections.appointmentDetails && (
                    <div className="section-content">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Ngày giờ</label>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                              type="date"
                              value={appointmentForm.appointmentDate}
                              onChange={(e) => setAppointmentForm({...appointmentForm, appointmentDate: e.target.value})}
                              style={{ flex: 1 }}
                            />
                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={appointmentForm.isAllDay}
                                onChange={(e) => setAppointmentForm({...appointmentForm, isAllDay: e.target.checked})}
                                style={{ width: '18px', height: '18px', accentColor: '#4ECDC4' }}
                              />
                              <span>Cả ngày</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Phòng</label>
                          <select
                            value={appointmentForm.room}
                            onChange={(e) => setAppointmentForm({...appointmentForm, room: e.target.value})}
                          >
                            <option value="Phong kham">Phòng khám</option>
                            <option value="Phong mo">Phòng mổ</option>
                            <option value="Khu dieu tri">Khu điều trị</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>BS khám</label>
                          <select
                            value={appointmentForm.doctorId}
                            onChange={(e) => setAppointmentForm({...appointmentForm, doctorId: e.target.value})}
                          >
                            <option value="">--- Chọn BS khám ---</option>
                            <option value="BS001">BS. Bình</option>
                            <option value="BS002">BS. An</option>
                            <option value="BS003">BS. Cường</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group full-width">
                          <label>Lý do khám</label>
                          <input 
                            type="text"
                            value={appointmentForm.reason}
                            onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group full-width">
                          <label>Ghi chú</label>
                          <textarea
                            value={appointmentForm.notes}
                            onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                            rows="3"
                            style={{ width: '100%', resize: 'vertical' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAppointmentModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  <FaSave /> Lưu lại
                </button>
                <button type="button" className="btn-print">
                  <FaPrint /> Lưu và In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: ĐĂNG KÝ KHÁM (GIỮ NGUYÊN TỪ CODE 2) ===== */}
      {showExamModal && (
        <div className="modal-overlay" onClick={() => setShowExamModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ĐĂNG KÝ KHÁM</h3>
              <button className="close-btn" onClick={() => setShowExamModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveExam}>
              <div className="modal-body">
                {/* Section: Khách hàng */}
                <div className="collapsible-section">
                  <div className="section-header">
                    <h4>Khách hàng</h4>
                    <button type="button" className="section-toggle-btn">
                      <FaChevronDown />
                    </button>
                  </div>
                  <div className="section-content">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Tìm theo tên hoặc số điện thoại"
                        style={{ 
                          width: '100%', padding: '10px', border: '2px solid #4ECDC4',
                          borderRadius: '4px', fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Chi tiết Lịch hẹn */}
                <div className="collapsible-section">
                  <div className="section-header">
                    <h4>Chi tiết Lịch hẹn</h4>
                    <button type="button" className="section-toggle-btn">
                      <FaChevronDown />
                    </button>
                  </div>
                  <div className="section-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Ngày giờ</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="date"
                            value={examForm.date}
                            onChange={(e) => setExamForm({...examForm, date: e.target.value})}
                            style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          />
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={examForm.isAllDay}
                              onChange={(e) => setExamForm({...examForm, isAllDay: e.target.checked})}
                              style={{ width: '18px', height: '18px', accentColor: '#4ECDC4' }}
                            />
                            <span>Cả ngày</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phòng</label>
                        <select
                          value={examForm.room}
                          onChange={(e) => setExamForm({...examForm, room: e.target.value})}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="Phong kham">Phòng khám</option>
                          <option value="Phong mo">Phòng mổ</option>
                          <option value="Khu dieu tri">Khu điều trị</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>BS khám</label>
                        <select
                          value={examForm.doctorId}
                          onChange={(e) => setExamForm({...examForm, doctorId: e.target.value})}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="">--- Chọn BS khám ---</option>
                          <option value="BS001">BS. Bình</option>
                          <option value="BS002">BS. An</option>
                          <option value="BS003">BS. Cường</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Lý do khám</label>
                        <input
                          type="text"
                          value={examForm.reason}
                          onChange={(e) => setExamForm({...examForm, reason: e.target.value})}
                          placeholder="Nhập lý do khám"
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Ghi chú</label>
                        <textarea
                          value={examForm.notes}
                          onChange={(e) => setExamForm({...examForm, notes: e.target.value})}
                          placeholder="Nhập ghi chú"
                          rows="3"
                          style={{ width: '100%', resize: 'vertical', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Trạng thái</label>
                        <select
                          value={examForm.status}
                          onChange={(e) => setExamForm({...examForm, status: e.target.value})}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                          <option value="Xac nhan kham">Xác nhận khám</option>
                          <option value="Cho xac nhan">Chờ xác nhận</option>
                          <option value="Da kham">Đã khám</option>
                          <option value="Huy">Hủy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Vật nuôi */}
                <div className="collapsible-section">
                  <div className="section-header">
                    <h4>Vật nuôi</h4>
                    <button type="button" className="section-toggle-btn">
                      <FaChevronDown />
                    </button>
                  </div>
                  <div className="section-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Nhiệt độ</label>
                        <input
                          type="number"
                          step="0.1"
                          value={examForm.temperature}
                          onChange={(e) => setExamForm({...examForm, temperature: e.target.value})}
                          placeholder="°C"
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Cân nặng (Kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={examForm.weight}
                          onChange={(e) => setExamForm({...examForm, weight: e.target.value})}
                          placeholder="Kg"
                          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowExamModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save" style={{ background: '#4ECDC4', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
                  Lưu lại
                </button>
                <button type="button" className="btn-save" style={{ background: '#4ECDC4', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
                  Lưu và In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuanLyLichHen;