import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { 
  FaCalendarAlt, FaSearch, FaRedo, FaChevronDown, 
  FaCheck, FaTimes, FaEdit, FaPlus, FaTrash,
  FaClock, FaUser, FaPaw, FaPhone, FaMapMarkerAlt,
  FaFileMedical, FaClipboardList, FaEllipsisH,
  FaExchangeAlt, FaFolderOpen, FaChevronUp, FaSave, FaPrint,
  FaQrcode, FaWeight, FaFileAlt, FaHistory
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
  const [showChangeTimeModal, setShowChangeTimeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingCell, setEditingCell] = useState(null); // { rowId, field, value }
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    newCustomer: false,
    newPet: false,
    appointmentDetails: true
  });

  // Time slots
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  // Room options
  const roomOptions = [
    { value: '', label: '--- Chọn ---' },
    { value: 'Nha thuoc', label: 'Nhà thuốc' },
    { value: 'Phong can lam sang', label: 'Phòng cận lâm sàng' },
    { value: 'Phong kham', label: 'Phòng khám' },
    { value: 'Phong xet nghiem', label: 'Phòng xét nghiệm' },
    { value: 'Tai nha', label: 'Tại nhà' }
  ];

  // Doctor options
  const doctorOptions = [
    { value: '', label: '--- Chọn ---' },
    { value: 'BS. An', label: 'BS. An' },
    { value: 'BS. Binh', label: 'BS. Bình' }
  ];

  // Status options
  const statusOptionsTable = [
    { value: '', label: '--- Chọn ---' },
    { value: 'Chua kham', label: 'Chưa khám' },
    { value: 'DK tren website', label: 'ĐK trên website' },
    { value: 'Da kham', label: 'Đã khám' },
    { value: 'Doi ngay khac', label: 'Dời ngày khác' },
    { value: 'Het benh', label: 'Hết bệnh' },
    { value: 'Xac nhan kham', label: 'Xác nhận khám' }
  ];

  // Mock appointments data with more details
  const [appointments, setAppointments] = useState([
    {
      id: 1, stt: 1, date: '15/10/2023', timeFrom: '', timeTo: '',
      customerName: 'Trương Thiên Di', customerPhone: '0903080872', customerAddress: 'Đắk Nông',
      petName: 'Sana', petCode: 'PE230216005', petSpecies: 'Mèo (Cat)', petBreed: 'Việt Nam', petAge: '3 tuổi 3 tháng',
      reason: 'Thiến', oldPrescriptionNotes: 'hậu phẫu', isReexam: true,
      room: '', doctor: '', status: 'Chua kham', notes: '',
      customerId: 'BN150100037',
      prescriptions: [
        { id: 'DT230221104', date: '19/10/2023', diagnosis: 'viêm hô hấp', advice: '', reexamDate: '20/10/2023' },
        { id: 'DT230219055', date: '17/10/2023', diagnosis: 'viêm hô hấp', advice: '', reexamDate: '18/10/2023' },
        { id: 'DT230205059', date: '03/10/2023', diagnosis: 'viêm họng', advice: 'tái khám', reexamDate: '04/10/2023' }
      ],
      progress: [
        { date: '05/03/2023', note: 'nghẹt mũi khò khè' },
        { date: '21/02/2023', note: 'Hắc xì chảy mũi' },
        { date: '25/01/2023', note: 'sưng đỏ vòm họng, khò khè' },
        { date: '18/01/2023', note: 'hết sổ mũi, lâu lâu còn khò khè' }
      ],
      vitals: [
        { date: '05/03/2023', temperature: '', weight: '2.2 Kg' },
        { date: '21/02/2023', temperature: '', weight: '2.2 Kg' },
        { date: '19/02/2023', temperature: '', weight: '2.2 Kg' },
        { date: '05/02/2023', temperature: '', weight: '2.2 Kg' }
      ]
    },
    {
      id: 2, stt: 2, date: '30/09/2023', timeFrom: '', timeTo: '',
      customerName: 'Trương Thiên Di', customerPhone: '0903080872', customerAddress: 'Đắk Nông',
      petName: 'mèo thiên 1', petCode: 'PE230201015', petSpecies: 'Mèo (Cat)', petBreed: 'Khác', petAge: '4 tuổi 5 tháng',
      reason: 'thiến', oldPrescriptionNotes: 'hậu phẫu', isReexam: true,
      room: '', doctor: '', status: 'Chua kham', notes: '',
      customerId: 'BN150100037',
      prescriptions: [],
      progress: [],
      vitals: []
    },
    {
      id: 3, stt: 3, date: '20/10/2023', timeFrom: '', timeTo: '',
      customerName: 'Tăng Hữu Phước', customerPhone: '0902089573', customerAddress: 'Lâm Đồng',
      petName: 'đen 1', petCode: 'PE230220009', petSpecies: 'Chó (Dog)', petBreed: 'Khác', petAge: '3 tuổi 5 tháng',
      reason: 'khám', oldPrescriptionNotes: '', isReexam: true,
      room: '', doctor: '', status: 'Chua kham', notes: '',
      customerId: 'BN150100038',
      prescriptions: [],
      progress: [],
      vitals: []
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

  const [changeTimeForm, setChangeTimeForm] = useState({
    date: '15/10/2023',
    time: '00:00',
    notes: ''
  });

  // Filter options
  const statusFilterOptions = [
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

  const handleReexam = () => {
    setExamForm({
      customerId: '', customerName: '', customerCode: '', petId: '', petName: '',
      petCode: '', petInfo: '', date: '10/06/2026', isAllDay: true,
      room: 'Phong kham', doctorId: '', reason: '', notes: '',
      status: 'Xac nhan kham', temperature: '', weight: ''
    });
    setShowExamModal(true);
  };

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

  // Handle inline editing
  const handleCellEdit = (id, field, value) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, [field]: value } : apt
    ));
  };

  // Handle edit click for reason field
  const handleEditClick = (apt) => {
    setEditingCell({ 
      rowId: apt.id, 
      field: 'reason', 
      value: apt.reason 
    });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (editingCell) {
      handleCellEdit(editingCell.rowId, editingCell.field, editingCell.value);
      setEditingCell(null);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingCell(null);
  };

  // Handle change time
  const handleChangeTime = (appointment) => {
    setSelectedAppointment(appointment);
    setChangeTimeForm({
      date: appointment.date,
      time: appointment.timeFrom || '00:00',
      notes: appointment.notes || ''
    });
    setShowChangeTimeModal(true);
  };

  const handleSaveChangeTime = () => {
    if (selectedAppointment) {
      const [hours, minutes] = changeTimeForm.time.split(':');
      const newTimeFrom = `${hours}:${minutes}`;
      
      setAppointments(appointments.map(apt =>
        apt.id === selectedAppointment.id ? { 
          ...apt, 
          timeFrom: newTimeFrom, 
          date: changeTimeForm.date,
          notes: changeTimeForm.notes
        } : apt
      ));
    }
    setShowChangeTimeModal(false);
  };

  // Handle show profile
  const handleShowProfile = (appointment) => {
    setSelectedAppointment(appointment);
    setShowProfileModal(true);
  };

  // Handle show progress
  const handleShowProgress = (appointment) => {
    setSelectedAppointment(appointment);
    setShowProgressModal(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
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

      {/* ===== FILTER BAR ===== */}
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
            {statusFilterOptions.map(opt => (
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

      {/* ===== QUICK APPOINTMENT SECTION ===== */}
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

      {/* ===== MAIN TABLE WITH INLINE EDITING ===== */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th width="40">STT</th>
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
            {currentAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.stt}</td>
                <td>{apt.date}</td>
                <td>
                  <select
                    value={apt.timeFrom}
                    onChange={(e) => handleCellEdit(apt.id, 'timeFrom', e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '13px',
                      minWidth: '80px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">--- Chọn ---</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={apt.timeTo}
                    onChange={(e) => handleCellEdit(apt.id, 'timeTo', e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '13px',
                      minWidth: '80px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">--- Chọn ---</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
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
                  {editingCell && editingCell.rowId === apt.id && editingCell.field === 'reason' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="text"
                        value={editingCell.value}
                        onChange={(e) => setEditingCell({...editingCell, value: e.target.value})}
                        style={{
                          flex: 1,
                          padding: '4px 8px',
                          border: '1px solid #4ECDC4',
                          borderRadius: '4px',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                      />
                      <button 
                        onClick={handleSaveEdit}
                        style={{
                          background: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <FaCheck size={12} />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        style={{
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>{apt.reason}</span>
                      <FaEdit 
                        size={12} 
                        style={{ color: '#4ECDC4', cursor: 'pointer' }}
                        onClick={() => handleEditClick(apt)}
                        title="Chỉnh sửa"
                      />
                    </div>
                  )}
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
                  <select
                    value={apt.room}
                    onChange={(e) => handleCellEdit(apt.id, 'room', e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '13px',
                      minWidth: '120px',
                      cursor: 'pointer'
                    }}
                  >
                    {roomOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={apt.doctor}
                    onChange={(e) => handleCellEdit(apt.id, 'doctor', e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '13px',
                      minWidth: '100px',
                      cursor: 'pointer'
                    }}
                  >
                    {doctorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={apt.status}
                    onChange={(e) => handleCellEdit(apt.id, 'status', e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '13px',
                      minWidth: '120px',
                      cursor: 'pointer'
                    }}
                  >
                    {statusOptionsTable.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button 
                    className="icon-btn" 
                    title="Đổi giờ"
                    onClick={() => handleChangeTime(apt)}
                  >
                    <FaClock />
                  </button>
                </td>
                <td>
                  <button 
                    className="icon-btn" 
                    title="Hồ sơ"
                    onClick={() => handleShowProfile(apt)}
                  >
                    <FaFolderOpen />
                  </button>
                </td>
                <td>
                  <button 
                    className="icon-btn" 
                    title="Diễn tiến/Files"
                    onClick={() => handleShowProgress(apt)}
                  >
                    <FaEllipsisH />
                  </button>
                </td>
                <td>
                  <button 
                    className="icon-btn" 
                    title="Xóa"
                    onClick={() => handleDelete(apt.id)}
                    style={{ color: '#f44336' }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
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

      {/* ===== MODAL: ĐỔI GIỜ KHÁM (CÓ GHI CHÚ) ===== */}
      {showChangeTimeModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowChangeTimeModal(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ĐỔI GIỜ KHÁM</h3>
              <button className="close-btn" onClick={() => setShowChangeTimeModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Dời đến</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="date"
                    value={changeTimeForm.date.split('/').reverse().join('-')}
                    onChange={(e) => setChangeTimeForm({...changeTimeForm, date: e.target.value.split('-').reverse().join('/')})}
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <select
                    value={changeTimeForm.time}
                    onChange={(e) => setChangeTimeForm({...changeTimeForm, time: e.target.value})}
                    style={{
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      minWidth: '80px',
                      cursor: 'pointer'
                    }}
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '15px' }}>
                <label>Ghi chú</label>
                <textarea
                  value={changeTimeForm.notes}
                  onChange={(e) => setChangeTimeForm({...changeTimeForm, notes: e.target.value})}
                  placeholder="Nhập ghi chú..."
                  rows="3"
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {selectedAppointment.oldPrescriptionNotes && (
                <div style={{ marginTop: '15px', padding: '10px', background: '#fff3cd', borderRadius: '4px', fontSize: '13px' }}>
                  <strong>Đơn thuốc liên quan:</strong> DT230216031 ({selectedAppointment.date})
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowChangeTimeModal(false)}>
                Hủy
              </button>
              <button type="button" className="btn-save" onClick={handleSaveChangeTime}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL: HỒ SƠ KHÁCH HÀNG ===== */}
      {showProfileModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: '#4ECDC4' }}>
              <h3>{selectedAppointment.customerId || 'BN150100037'}</h3>
              <button className="close-btn" onClick={() => setShowProfileModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {/* Customer Info */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h4 style={{ color: '#4CAF50', marginBottom: '20px' }}>HỒ SƠ KHÁCH HÀNG</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '120px', 
                      height: '120px', 
                      background: '#f5f5f5', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginBottom: '10px',
                      borderRadius: '8px'
                    }}>
                      <FaQrcode size={100} style={{ color: '#4ECDC4' }} />
                    </div>
                    <p style={{ fontSize: '13px', color: '#666' }}>Mã số: {selectedAppointment.customerId || 'BN150100037'}</p>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ fontWeight: '600', minWidth: '100px', display: 'inline-block' }}>Họ tên</span>
                      <span>: {selectedAppointment.customerName}</span>
                    </div>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ fontWeight: '600', minWidth: '100px', display: 'inline-block' }}>Điện thoại</span>
                      <span>: {selectedAppointment.customerPhone}</span>
                    </div>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ fontWeight: '600', minWidth: '100px', display: 'inline-block' }}>Địa chỉ</span>
                      <span>: {selectedAppointment.customerAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pet Info */}
              <div style={{ marginBottom: '30px' }}>
                <h5 style={{ color: '#2196F3', marginBottom: '15px', fontSize: '16px' }}>VẬT NUÔI</h5>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>MÃ SỐ</th>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>TÊN VẬT NUÔI</th>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>LOÀI</th>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>GIỐNG</th>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>GIỚI TÍNH</th>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>MÀU SẮC</th>
                      <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>TUỔI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{selectedAppointment.petCode}</td>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{selectedAppointment.petName}</td>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{selectedAppointment.petSpecies}</td>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{selectedAppointment.petBreed}</td>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>Cái</td>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>TRẮNG ĐEN</td>
                      <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{selectedAppointment.petAge}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Prescriptions */}
              <div style={{ marginBottom: '30px' }}>
                <h5 style={{ color: '#2196F3', marginBottom: '15px', fontSize: '16px' }}>ĐƠN THUỐC</h5>
                {selectedAppointment.prescriptions && selectedAppointment.prescriptions.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>VẬT NUÔI</th>
                        <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>NGÀY</th>
                        <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>MÃ ĐƠN THUỐC</th>
                        <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>CHẨN ĐOÁN</th>
                        <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>LỜI DẶN</th>
                        <th style={{ padding: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>NGÀY TÁI KHÁM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAppointment.prescriptions.map((rx, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{selectedAppointment.petName}</td>
                          <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{rx.date}</td>
                          <td style={{ padding: '10px', border: '1px solid #e0e0e0', color: '#2196F3' }}>{rx.id}</td>
                          <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{rx.diagnosis}</td>
                          <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{rx.advice || '-'}</td>
                          <td style={{ padding: '10px', border: '1px solid #e0e0e0' }}>{rx.reexamDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: '#999', fontSize: '13px' }}>Chưa có thông tin.</p>
                )}
              </div>

              {/* Clinical Exams */}
              <div style={{ marginBottom: '30px' }}>
                <h5 style={{ color: '#2196F3', marginBottom: '15px', fontSize: '16px' }}>PHIẾU CHỈ ĐỊNH CLS</h5>
                <p style={{ color: '#999', fontSize: '13px' }}>Chưa có thông tin.</p>
              </div>

              {/* Files */}
              <div>
                <h5 style={{ color: '#2196F3', marginBottom: '15px', fontSize: '16px' }}>FILE LIÊN QUAN</h5>
                <p style={{ color: '#999', fontSize: '13px' }}>Chưa có thông tin.</p>
              </div>
            </div>
            <div className="modal-footer" style={{ position: 'sticky', bottom: '0', background: 'white', borderRadius: '0 0 8px 8px' }}>
              <button className="btn-action" style={{ padding: '10px 15px', background: 'white', border: '1px solid #4ECDC4', color: '#4ECDC4', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaPrint /> In
              </button>
              <button className="btn-action" style={{ padding: '10px 15px', background: 'white', border: '1px solid #4ECDC4', color: '#4ECDC4', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaExchangeAlt /> Copy link
              </button>
              <button className="btn-action" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4ECDC4', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL: DIỄN TIẾN / TRỌNG LƯỢNG / FILE LIÊN QUAN ===== */}
      {showProgressModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowProgressModal(false)}>
          <div className="modal-content" style={{ maxWidth: '1000px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: '#4ECDC4' }}>
              <h3>DIỄN TIẾN / TRỌNG LƯỢNG / FILE LIÊN QUAN</h3>
              <button className="close-btn" onClick={() => setShowProgressModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                <strong>{selectedAppointment.petName}</strong> ({selectedAppointment.petCode}) - {selectedAppointment.petSpecies} - {selectedAppointment.petBreed}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* Disease Progress */}
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: '#f0f9f4', padding: '12px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ margin: 0, color: '#4CAF50', fontSize: '14px' }}>Diễn tiến bệnh</h5>
                    <button style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      border: '2px solid #4CAF50', 
                      background: 'white', 
                      color: '#4CAF50',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div style={{ padding: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                    {selectedAppointment.progress && selectedAppointment.progress.length > 0 ? (
                      selectedAppointment.progress.map((item, idx) => (
                        <div key={idx} style={{ 
                          marginBottom: '10px', 
                          padding: '10px', 
                          background: '#f5f5f5', 
                          borderRadius: '4px',
                          position: 'relative'
                        }}>
                          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '500' }}>{item.date}</div>
                          <div style={{ fontSize: '13px' }}>{item.note}</div>
                          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4ECDC4' }}>
                              <FaEdit size={12} />
                            </button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                              <FaTimes size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#999', fontSize: '13px', textAlign: 'center' }}>Chưa có thông tin.</p>
                    )}
                  </div>
                </div>

                {/* Vitals */}
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: '#f0f9f4', padding: '12px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ margin: 0, color: '#4CAF50', fontSize: '14px' }}>Sinh hiệu</h5>
                    <button style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      border: '2px solid #4CAF50', 
                      background: 'white', 
                      color: '#4CAF50',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div style={{ padding: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                    {selectedAppointment.vitals && selectedAppointment.vitals.length > 0 ? (
                      selectedAppointment.vitals.map((item, idx) => (
                        <div key={idx} style={{ 
                          marginBottom: '10px', 
                          padding: '10px', 
                          background: '#f5f5f5', 
                          borderRadius: '4px',
                          position: 'relative'
                        }}>
                          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '500' }}>{item.date}</div>
                          <div style={{ fontSize: '13px', display: 'flex', gap: '20px' }}>
                            {item.temperature && <span>• Nhiệt độ: {item.temperature}</span>}
                            {item.weight && <span>• Nặng: {item.weight}</span>}
                          </div>
                          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4ECDC4' }}>
                              <FaEdit size={12} />
                            </button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                              <FaTimes size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#999', fontSize: '13px', textAlign: 'center' }}>Chưa có thông tin.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Files */}
              <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f0f9f4', padding: '12px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 style={{ margin: 0, color: '#4CAF50', fontSize: '14px' }}>Files</h5>
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: '#4CAF50',
                    fontSize: '18px'
                  }}>
                    <FaPlus />
                  </button>
                </div>
                <div style={{ padding: '12px', minHeight: '100px' }}>
                  <p style={{ color: '#999', fontSize: '13px', textAlign: 'center' }}>Chưa có file nào.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowProgressModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

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