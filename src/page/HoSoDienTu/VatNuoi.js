import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaEye, 
  FaQrcode, FaPrint, FaLink, FaEllipsisH,
  FaChevronDown, FaChevronUp, FaTimes, FaSave,
  FaPaw, FaFileMedical, FaFilePrescription, FaFolderOpen,
  FaWeight, FaHistory, FaCalendarAlt, FaCheck, FaClock
} from 'react-icons/fa';

function VatNuoi() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('ten');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState(mockData.pets || []);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    species: 'Cho',
    breed: '',
    gender: 'Duc',
    color: '',
    weight: '',
    temperature: '',
    birthday: '',
    age: '',
    ownerId: '',
    ownerName: '',
    ownerPhone: '',
    ownerAddress: '',
    isActive: true,
    notes: ''
  });

  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    reason: '',
    duration: '1 ngay',
    medicines: [],
    reexamDate: '',
    instructions: ''
  });

  const [examData, setExamData] = useState({
    clinical: '',
    diagnosis: '',
    referredTo: '',
    tests: [],
    appointmentDate: '',
    instructions: ''
  });

  const [appointmentData, setAppointmentData] = useState({
    customerId: '',
    customerName: '',
    customerCode: '',
    petId: '',
    petName: '',
    petCode: '',
    petInfo: '',
    date: new Date().toISOString().split('T')[0],
    isAllDay: false,
    room: 'Phong kham',
    doctorId: '',
    reason: '',
    notes: '',
    status: 'Xac nhan kham',
    temperature: '',
    weight: ''
  });

  // Search options
  const searchOptions = [
    { value: 'ten', label: 'Tên' },
    { value: 'ma', label: 'Mã số' },
    { value: 'chu_nuoi', label: 'Chủ nuôi' },
    { value: 'loai', label: 'Loài' }
  ];

  const speciesOptions = [
    { value: 'all', label: 'Tất cả loài' },
    { value: 'Cho', label: 'Chó (Dog)' },
    { value: 'Meo', label: 'Mèo (Cat)' },
    { value: 'Chim', label: 'Chim (Bird)' },
    { value: 'Ca', label: 'Cá (Fish)' },
    { value: 'Ga', label: 'Gà (Chicken)' },
    { value: 'Chuot', label: 'Chuột (Mouse)' },
    { value: 'Khac', label: 'Khác' }
  ];

  // Pagination
  const totalPages = Math.max(1, Math.ceil(pets.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPets = pets.slice(startIndex, endIndex);

  const filteredPets = currentPets.filter((pet) => {
    const matchSpecies = speciesFilter === 'all' || pet.species === speciesFilter;
    if (!matchSpecies) return false;

    const term = searchTerm.toLowerCase();
    switch (searchBy) {
      case 'ma':
        return (pet.code || '').toLowerCase().includes(term);
      case 'chu_nuoi':
        return (pet.ownerName || '').toLowerCase().includes(term);
      case 'loai':
        return (pet.species || '').toLowerCase().includes(term);
      case 'ten':
      default:
        return (pet.name || '').toLowerCase().includes(term);
    }
  });

  // Handlers
  const handleAddPet = (e) => {
    e.preventDefault();
    const newPet = {
      id: pets.length + 1,
      ...formData,
      code: formData.code || `PE${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      prescriptions: [],
      exams: [],
      progress: []
    };
    setPets([newPet, ...pets]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdatePet = (e) => {
    e.preventDefault();
    setPets(pets.map(p => 
      p.id === selectedPet.id ? { ...p, ...formData } : p
    ));
    setShowAddModal(false);
    setSelectedPet(null);
  };

  const handleDeletePet = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vật nuôi này?')) {
      setPets(pets.filter(p => p.id !== id));
    }
  };

  const handleViewPet = (pet) => {
    setSelectedPet(pet);
    setShowViewModal(true);
  };

  const handleShowProgress = (pet) => {
    setSelectedPet(pet);
    setShowProgressModal(true);
  };

  const handleShowPrescription = (pet) => {
    setSelectedPet(pet);
    setPrescriptionData({
      diagnosis: '',
      reason: '',
      duration: '1 ngay',
      medicines: [],
      reexamDate: '',
      instructions: ''
    });
    setShowPrescriptionModal(true);
  };

  const handleShowExam = (pet) => {
    setSelectedPet(pet);
    setExamData({
      clinical: '',
      diagnosis: '',
      referredTo: '',
      tests: [],
      appointmentDate: '',
      instructions: ''
    });
    setShowExamModal(true);
  };

  const handleShowAppointment = (pet) => {
    setSelectedPet(pet);
    setAppointmentData({
      ...appointmentData,
      petId: pet.id,
      petName: pet.name,
      petCode: pet.code || `PE${pet.id}`,
      petInfo: `${pet.name} - ${pet.code || `PE${pet.id}`} - ${getSpeciesLabel(pet.species)} - ${pet.breed || ''} - ${pet.age || ''}`,
      customerId: pet.ownerId || '',
      customerName: pet.ownerName || '',
      customerCode: `BN${pet.id}`
    });
    setShowAppointmentModal(true);
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    console.log('Saving appointment:', appointmentData);
    alert('Đăng ký khám thành công!');
    setShowAppointmentModal(false);
    resetAppointmentForm();
  };

  const resetAppointmentForm = () => {
    setAppointmentData({
      customerId: '',
      customerName: '',
      customerCode: '',
      petId: '',
      petName: '',
      petCode: '',
      petInfo: '',
      date: new Date().toISOString().split('T')[0],
      isAllDay: false,
      room: 'Phong kham',
      doctorId: '',
      reason: '',
      notes: '',
      status: 'Xac nhan kham',
      temperature: '',
      weight: ''
    });
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      species: 'Cho',
      breed: '',
      gender: 'Duc',
      color: '',
      weight: '',
      temperature: '',
      birthday: '',
      age: '',
      ownerId: '',
      ownerName: '',
      ownerPhone: '',
      ownerAddress: '',
      isActive: true,
      notes: ''
    });
    setSelectedPet(null);
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

  const getSpeciesLabel = (species) => {
    const opt = speciesOptions.find(s => s.value === species);
    return opt ? opt.label : species;
  };

  return (
    <div className="khachhang-container">
      <div className="khachhang-header">
        <h2>VẬT NUÔI</h2>
        <button className="btn-refresh" title="Làm mới">⟳</button>
      </div>

      {/* Floating Add Button */}
      <div className="floating-add-wrapper">
        <button 
          className="floating-add-btn-small"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          title="Thêm vật nuôi mới"
        >
          <FaPlus size={16} />
        </button>
      </div>

      {/* Search & Filter */}
      <div className="search-filter-container">
        <div className="filter-group">
          <select 
            value={speciesFilter}
            onChange={(e) => {
              setSpeciesFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="group-select"
          >
            {speciesOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        
        <div className="search-group">
          <select 
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="search-select"
          >
            {searchOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nhập từ cần tìm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <button className="search-btn">
            <FaSearch /> Tìm kiếm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th width="40"></th>
              <th>MÃ SỐ</th>
              <th>TÊN VẬT NUÔI</th>
              <th>LOÀI</th>
              <th>GIỐNG</th>
              <th>THÔNG TIN KHÁC</th>
              <th>KHÁCH HÀNG</th>
              <th>NGÀY TẠO</th>
              <th width="60">HOẠT ĐỘNG</th>
              <th width="60">XEM</th>
              <th width="40">...</th>
              <th width="60">PCĐ</th>
              <th width="60">KÊ ĐƠN</th>
              <th width="60">Đ.KÝ KHÁM</th>
              <th width="60">SỬA</th>
              <th width="60">XÓA</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.length === 0 ? (
              <tr>
                <td colSpan="16" className="no-data-row">
                  <p>Không tìm thấy vật nuôi nào</p>
                </td>
              </tr>
            ) : (
              filteredPets.map((pet) => (
                <tr key={pet.id}>
                  <td>
                    <button className="expand-btn">
                      <FaPlus />
                    </button>
                  </td>
                  <td className="code-cell">{pet.code || `PE${pet.id}`}</td>
                  <td className="name-cell">{pet.name}</td>
                  <td>{getSpeciesLabel(pet.species)}</td>
                  <td>{pet.breed || 'Khác'}</td>
                  <td>
                    <div className="pet-info-small">
                      {pet.age && <div>Tuổi: {pet.age}</div>}
                      {pet.gender && <div>GT: {pet.gender === 'Duc' ? 'Đực' : 'Cái'}</div>}
                      {pet.color && <div>Màu: {pet.color}</div>}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div>{pet.ownerName || '-'}</div>
                      <div className="phone-small">{pet.ownerPhone || ''}</div>
                    </div>
                  </td>
                  <td>{pet.createdAt || '25/10/2023'}</td>
                  <td>
                    <button className="icon-btn" title="Hoạt động">
                      <FaCheck style={{ color: pet.isActive ? '#4CAF50' : '#999' }} />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn profile"
                      onClick={() => handleViewPet(pet)}
                      title="Xem chi tiết"
                    >
                      <FaEye />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn"
                      onClick={() => handleShowProgress(pet)}
                      title="Diễn tiến/Files"
                    >
                      <FaEllipsisH />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn"
                      onClick={() => handleShowExam(pet)}
                      title="Phiếu chỉ định CLS"
                    >
                      <FaFileMedical />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn"
                      onClick={() => handleShowPrescription(pet)}
                      title="Kê đơn thuốc"
                    >
                      <FaFilePrescription />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn"
                      onClick={() => handleShowAppointment(pet)}
                      title="Đăng ký khám"
                    >
                      <FaCalendarAlt />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn edit"
                      onClick={() => {
                        setSelectedPet(pet);
                        setFormData(pet);
                        setShowAddModal(true);
                      }}
                      title="Sửa"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button 
                      className="icon-btn delete"
                      onClick={() => handleDeletePet(pet.id)}
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Hiển thị {filteredPets.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, pets.length)} 
          trong tổng số <strong>{pets.length}</strong> vật nuôi
        </div>
        
        <div className="pagination-controls">
          <button className="page-nav" disabled={currentPage === 1} onClick={() => goToPage(1)}>««</button>
          <button className="page-nav" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>«</button>
          
          {getPageNumbers().map(num => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`page-btn ${currentPage === num ? 'active' : ''}`}
            >
              {num}
            </button>
          ))}
          
          <button className="page-nav" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>»</button>
          <button className="page-nav" disabled={currentPage === totalPages} onClick={() => goToPage(totalPages)}>»»</button>
        </div>

        <div className="pagination-settings">
          <span>Trang</span>
          <input 
            type="number" 
            min="1"
            max={totalPages}
            value={currentPage} 
            onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
            className="page-input"
          />
          <span>/ {totalPages}</span>
          
          <span className="per-page">
            Số mục / trang:
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
          </span>
        </div>
      </div>

      {/* ===== MODAL 1: Add/Edit Pet ===== */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaPaw /> {selectedPet ? 'CẬP NHẬT' : 'THÊM'} VẬT NUÔI</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={selectedPet ? handleUpdatePet : handleAddPet}>
              <div className="modal-body">
                <div className="form-section">
                  <h4>Thông tin vật nuôi</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Mã số</label>
                      <input 
                        type="text" 
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                        placeholder="Tự động tạo nếu để trống"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tên vật nuôi *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Loài</label>
                      <select 
                        value={formData.species}
                        onChange={(e) => setFormData({...formData, species: e.target.value})}
                      >
                        {speciesOptions.filter(o => o.value !== 'all').map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Giống</label>
                      <input 
                        type="text"
                        value={formData.breed}
                        onChange={(e) => setFormData({...formData, breed: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Giới tính</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="Duc">Đực</option>
                        <option value="Cai">Cái</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Màu sắc</label>
                      <input 
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Ngày sinh</label>
                      <input 
                        type="date"
                        value={formData.birthday}
                        onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Cân nặng (Kg)</label>
                      <input 
                        type="number"
                        step="0.1"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Thông tin chủ nuôi</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Họ tên chủ nuôi</label>
                      <input 
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Điện thoại</label>
                      <input 
                        type="tel"
                        value={formData.ownerPhone}
                        onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Địa chỉ</label>
                      <input 
                        type="text"
                        value={formData.ownerAddress}
                        onChange={(e) => setFormData({...formData, ownerAddress: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  <FaSave /> Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL 2: View Pet Detail ===== */}
      {showViewModal && selectedPet && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedPet.name}</h3>
              <div className="header-actions">
                <button className="icon-btn" title="Phóng to">
                  <FaLink />
                </button>
                <button className="close-btn" onClick={() => setShowViewModal(false)}>
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <h4>Thông tin Vật nuôi</h4>
                <div className="profile-info">
                  <div className="qr-section">
                    <div className="qr-code">
                      <FaQrcode size={120} />
                    </div>
                    <p>Mã số: {selectedPet.code || `PE${selectedPet.id}`}</p>
                  </div>
                  <div className="customer-details">
                    <div className="detail-row">
                      <span>Tên</span>
                      <span>: {selectedPet.name}</span>
                    </div>
                    <div className="detail-row">
                      <span>Tuổi</span>
                      <span>: {selectedPet.age || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span>Loài</span>
                      <span>: {getSpeciesLabel(selectedPet.species)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Giống</span>
                      <span>: {selectedPet.breed || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span>Màu sắc</span>
                      <span>: {selectedPet.color || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span>Giới tính</span>
                      <span>: {selectedPet.gender === 'Duc' ? 'Đực' : 'Cái'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-sections">
                <div className="profile-section">
                  <h5>ĐƠN THUỐC</h5>
                  {selectedPet.prescriptions && selectedPet.prescriptions.length > 0 ? (
                    <table className="data-table" style={{ fontSize: '12px' }}>
                      <thead>
                        <tr>
                          <th>NGÀY</th>
                          <th>MÃ ĐƠN THUỐC</th>
                          <th>CHẨN ĐOÁN</th>
                          <th>LỜI DẶN</th>
                          <th>NGÀY TÁI KHÁM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPet.prescriptions.map((rx, idx) => (
                          <tr key={idx}>
                            <td>{rx.date || '25/10/2023'}</td>
                            <td>{rx.code || 'DT230227092'}</td>
                            <td>{rx.diagnosis || '-'}</td>
                            <td>{rx.instructions || '-'}</td>
                            <td>{rx.reexamDate || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-data">Chưa có thông tin.</p>
                  )}
                </div>

                <div className="profile-section">
                  <h5>PHIẾU CHỈ ĐỊNH CLS</h5>
                  <p className="no-data">Chưa có thông tin.</p>
                </div>

                <div className="profile-section">
                  <h5>FILE LIÊN QUAN</h5>
                  <p className="no-data">Chưa có thông tin.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer profile-footer">
              <button className="btn-action">
                <FaPrint /> In
              </button>
              <button className="btn-action">
                <FaLink /> Copy link
              </button>
              <button className="btn-action more">
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL 3: Progress/Files ===== */}
      {showProgressModal && selectedPet && (
        <div className="modal-overlay" onClick={() => setShowProgressModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>DIỄN TIẾN / TRỌNG LƯỢNG / FILE LIÊN QUAN</h3>
              <button className="close-btn" onClick={() => setShowProgressModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                <strong>{selectedPet.name}</strong> ({selectedPet.code || `PE${selectedPet.id}`}) - {getSpeciesLabel(selectedPet.species)} {selectedPet.breed && `- ${selectedPet.breed}`} {selectedPet.age && `- ${selectedPet.age}`}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div className="form-section">
                  <div className="section-header" style={{ marginBottom: '10px' }}>
                    <h4 style={{ margin: 0 }}>Diễn tiến bệnh</h4>
                    <button type="button" className="section-toggle-btn">
                      <FaPlus />
                    </button>
                  </div>
                  <div className="section-content">
                    <div style={{ marginBottom: '10px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>01/03/2024</div>
                      <div>sds</div>
                    </div>
                    <div style={{ marginBottom: '10px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>28/02/2024</div>
                      <div>32</div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header" style={{ marginBottom: '10px' }}>
                    <h4 style={{ margin: 0 }}>Sinh hiệu</h4>
                    <button type="button" className="section-toggle-btn">
                      <FaPlus />
                    </button>
                  </div>
                  <div className="section-content" style={{ minHeight: '150px' }}>
                    {/* Empty */}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-header" style={{ marginBottom: '10px' }}>
                  <h4 style={{ margin: 0 }}>Files</h4>
                  <button type="button" className="section-toggle-btn">
                    <FaPlus />
                  </button>
                </div>
                <div className="section-content" style={{ minHeight: '100px' }}>
                  {/* Empty */}
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

      {/* ===== MODAL 4: Exam (Phiếu chỉ định CLS) ===== */}
      {showExamModal && selectedPet && (
        <div className="modal-overlay" onClick={() => setShowExamModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>LẬP PHIẾU CHỈ ĐỊNH CLS</h3>
              <button className="close-btn" onClick={() => setShowExamModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div className="form-section" style={{ background: 'white', border: '1px solid #e0e0e0' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '15px' }}>PHIẾU CHỈ ĐỊNH CLS</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Họ tên</label>
                        <div style={{ fontWeight: '600' }}>{selectedPet.ownerName || '-'}</div>
                      </div>
                      <div className="form-group">
                        <label>Điện thoại</label>
                        <div>{selectedPet.ownerPhone || '-'}</div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Vật nuôi</label>
                        <div>{selectedPet.name} - {selectedPet.breed}</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Lâm sàng / Chẩn đoán</label>
                      <input 
                        type="text"
                        value={examData.clinical}
                        onChange={(e) => setExamData({...examData, clinical: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Chuyển đến</label>
                      <input 
                        type="text"
                        placeholder="Nơi xét nghiệm"
                        value={examData.referredTo}
                        onChange={(e) => setExamData({...examData, referredTo: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
                  <div className="form-section">
                    <div className="section-header">
                      <h4>Diễn tiến bệnh</h4>
                      <button type="button" className="section-toggle-btn">
                        <FaPlus />
                      </button>
                    </div>
                    <div className="section-content">
                      {/* Content */}
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="section-header">
                      <h4>Quản lý Files</h4>
                      <button type="button" className="section-toggle-btn">
                        <FaPlus />
                      </button>
                    </div>
                    <div className="section-content">
                      {/* Content */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowExamModal(false)}>
                Hủy
              </button>
              <button type="button" className="btn-save">
                <FaSave /> Lưu lại
              </button>
              <button type="button" className="btn-print">
                <FaPrint /> Lưu và In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL 5: Prescription (Kê đơn) ===== */}
      {showPrescriptionModal && selectedPet && (
        <div className="modal-overlay" onClick={() => setShowPrescriptionModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>KÊ ĐƠN</h3>
              <button className="close-btn" onClick={() => setShowPrescriptionModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div className="form-section" style={{ background: 'white', border: '1px solid #e0e0e0' }}>
                    <h4 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '15px' }}>ĐƠN THUỐC</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Họ tên</label>
                        <div style={{ fontWeight: '600' }}>{selectedPet.ownerName || '-'}</div>
                      </div>
                      <div className="form-group">
                        <label>Điện thoại</label>
                        <div>{selectedPet.ownerPhone || '-'}</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Địa chỉ</label>
                      <div>{selectedPet.ownerAddress || '-'}</div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Vật nuôi</label>
                        <div>{selectedPet.name} - {selectedPet.breed}</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Lý do khám</label>
                      <input 
                        type="text"
                        value={prescriptionData.reason}
                        onChange={(e) => setPrescriptionData({...prescriptionData, reason: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Chẩn đoán</label>
                      <input 
                        type="text"
                        value={prescriptionData.diagnosis}
                        onChange={(e) => setPrescriptionData({...prescriptionData, diagnosis: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Thời gian điều trị</label>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {['1 ngay', '3 ngay', '7 ngay', '14 ngay', '30 ngay'].map(d => (
                          <button
                            key={d}
                            type="button"
                            className={`btn-sm ${prescriptionData.duration === d ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setPrescriptionData({...prescriptionData, duration: d})}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
                  <div className="form-section">
                    <div className="section-header">
                      <h4>Diễn tiến bệnh</h4>
                      <button type="button" className="section-toggle-btn">
                        <FaPlus />
                      </button>
                    </div>
                    <div className="section-content">
                      {/* Content */}
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="section-header">
                      <h4>Sinh hiệu</h4>
                      <button type="button" className="section-toggle-btn">
                        <FaPlus />
                      </button>
                    </div>
                    <div className="section-content">
                      {/* Content */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowPrescriptionModal(false)}>
                Hủy
              </button>
              <button type="button" className="btn-save">
                <FaSave /> Lưu lại
              </button>
              <button type="button" className="btn-print">
                <FaPrint /> Lưu và In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL 6: Đăng ký khám (ĐÃ SỬA - NẰM NGOÀI CÁC MODAL KHÁC) ===== */}
      {showAppointmentModal && selectedPet && (
        <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ĐĂNG KÝ KHÁM</h3>
              <button className="close-btn" onClick={() => setShowAppointmentModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveAppointment}>
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
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Khách hàng</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: '600' }}>
                            {appointmentData.customerName}
                          </span>
                          <span style={{ color: '#666' }}>. {appointmentData.customerCode}</span>
                          <button type="button" className="icon-btn" title="Xem hồ sơ">
                            <FaEye />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Vật nuôi</label>
                        <select
                          value={appointmentData.petInfo}
                          onChange={(e) => setAppointmentData({...appointmentData, petInfo: e.target.value})}
                          style={{ width: '100%' }}
                        >
                          <option value={appointmentData.petInfo}>
                            {appointmentData.petInfo}
                          </option>
                        </select>
                      </div>
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
                            value={appointmentData.date}
                            onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                            style={{ flex: 1 }}
                          />
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={appointmentData.isAllDay}
                              onChange={(e) => setAppointmentData({...appointmentData, isAllDay: e.target.checked})}
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
                          value={appointmentData.room}
                          onChange={(e) => setAppointmentData({...appointmentData, room: e.target.value})}
                          style={{ width: '100%' }}
                        >
                          <option value="Phong kham">Phòng khám</option>
                          <option value="Phong mo">Phòng mổ</option>
                          <option value="Khu dieu tri">Khu điều trị</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>BS khám</label>
                        <select
                          value={appointmentData.doctorId}
                          onChange={(e) => setAppointmentData({...appointmentData, doctorId: e.target.value})}
                          style={{ width: '100%' }}
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
                          value={appointmentData.reason}
                          onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                          placeholder="Nhập lý do khám"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group full-width">
                        <label>Ghi chú</label>
                        <textarea
                          value={appointmentData.notes}
                          onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                          placeholder="Nhập ghi chú"
                          rows="3"
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Trạng thái</label>
                        <select
                          value={appointmentData.status}
                          onChange={(e) => setAppointmentData({...appointmentData, status: e.target.value})}
                          style={{ width: '100%' }}
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
                          value={appointmentData.temperature}
                          onChange={(e) => setAppointmentData({...appointmentData, temperature: e.target.value})}
                          placeholder="°C"
                        />
                      </div>
                      <div className="form-group">
                        <label>Cân nặng (Kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={appointmentData.weight}
                          onChange={(e) => setAppointmentData({...appointmentData, weight: e.target.value})}
                          placeholder="Kg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAppointmentModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  <FaSave /> Lưu lại
                </button>
                <button type="button" className="btn-print" onClick={handleSaveAppointment}>
                  <FaPrint /> Lưu và In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VatNuoi;