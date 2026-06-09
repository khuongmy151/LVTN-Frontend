import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaFileAlt, 
  FaQrcode, FaPrint, FaLink, FaEllipsisH,
  FaChevronDown, FaChevronUp, FaTimes, FaSave,
  FaUser, FaPaw, FaFileInvoiceDollar, FaPrescriptionBottleAlt,
  FaClipboardList, FaUserFriends, FaCaretLeft, FaCaretRight
} from 'react-icons/fa';

function KhachHang() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('ten');
  const [customerGroup, setCustomerGroup] = useState('all');
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedTab, setExpandedTab] = useState('vattuoi');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(mockData.customers);
  const [activePetTab, setActivePetTab] = useState('vattuoi');
  const [activeAddTab, setActiveAddTab] = useState('thongtin');
  const [expandedSections, setExpandedSections] = useState({
    khachhang: true,
    nhom: false,
    vatnuoi: false
  });
  
  // Form states
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    gender: 'Nam',
    phone: '',
    address: '',
    email: '',
    alias: '',
    group: '',
    isVIP: false,
    notes: ''
  });

  const [petFormData, setPetFormData] = useState({
    name: '',
    species: 'Cho',
    breed: '',
    gender: 'Duc',
    color: '',
    weight: '',
    temperature: '',
    birthday: '',
    room: 'Phong kham',
    isActive: true,
    notes: ''
  });

  const customerGroups = [
    { value: 'all', label: 'Tất cả khách hàng' },
    { value: 'thanthiet', label: 'Khách hàng thân thiết' },
    { value: 'binhthuong', label: 'Khách hàng bình thường' },
    { value: 'moi', label: 'Khách hàng mới' },
    { value: 'vip', label: 'Khách hàng VIP' }
  ];

  const searchOptions = [
    { value: 'ten', label: 'Tên Khách hàng' },
    { value: 'phone', label: 'Điện thoại' },
    { value: 'code', label: 'Mã Khách hàng' },
    { value: 'address', label: 'Địa chỉ' },
    { value: 'pet', label: 'Tên vật nuôi' }
  ];

  const totalPages = Math.max(1, Math.ceil(customers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const filteredCustomers = currentCustomers.filter((customer) => {
    const matchGroup = customerGroup === 'all' || 
                       (customer.isVIP === true && customerGroup === 'thanthiet') ||
                       customer.group === customerGroup;
    
    if (!matchGroup) return false;

    const term = searchTerm.toLowerCase();
    switch (searchBy) {
      case 'phone':
        return customer.phone.includes(searchTerm);
      case 'code':
        return (customer.code || '').toLowerCase().includes(term);
      case 'address':
        return (customer.address || '').toLowerCase().includes(term);
      case 'pet':
        return customer.pets?.some(pet => pet.name.toLowerCase().includes(term));
      case 'ten':
      default:
        return customer.name.toLowerCase().includes(term);
    }
  });

  const toggleExpand = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
      setExpandedTab('vattuoi');
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleShowProfile = (customer) => {
    setSelectedCustomer(customer);
    setShowProfileModal(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      code: customer.code || '',
      name: customer.name,
      gender: customer.gender || 'Nam',
      phone: customer.phone,
      address: customer.address || '',
      email: customer.email || '',
      alias: customer.alias || '',
      group: customer.group || 'binhthuong',
      isVIP: customer.isVIP || false,
      notes: customer.notes || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      ...formData,
      code: formData.code || `BN${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      pets: petFormData.name ? [{
        id: Date.now(),
        ...petFormData,
        createdAt: new Date().toLocaleDateString('vi-VN')
      }] : []
    };
    setCustomers([newCustomer, ...customers]);
    setShowAddModal(false);
    setShowAddDropdown(false);
    resetCustomerForm();
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    setCustomers(customers.map(c => 
      c.id === selectedCustomer.id ? { ...c, ...formData } : c
    ));
    setShowEditModal(false);
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const newPet = {
      id: Date.now(),
      ...petFormData,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    
    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          pets: [...(c.pets || []), newPet]
        };
      }
      return c;
    }));
    
    setShowPetModal(false);
    setShowAddDropdown(false);
    resetPetForm();
  };

  const resetCustomerForm = () => {
    setFormData({
      code: '',
      name: '',
      gender: 'Nam',
      phone: '',
      address: '',
      email: '',
      alias: '',
      group: 'binhthuong',
      isVIP: false,
      notes: ''
    });
    setPetFormData({
      name: '',
      species: 'Cho',
      breed: '',
      gender: 'Duc',
      color: '',
      weight: '',
      temperature: '',
      birthday: '',
      room: 'Phong kham',
      isActive: true,
      notes: ''
    });
    setActiveAddTab('thongtin');
    setExpandedSections({
      khachhang: true,
      nhom: false,
      vatnuoi: false
    });
  };

  const resetPetForm = () => {
    setPetFormData({
      name: '',
      species: 'Cho',
      breed: '',
      gender: 'Duc',
      color: '',
      weight: '',
      temperature: '',
      birthday: '',
      room: 'Phong kham',
      isActive: true,
      notes: ''
    });
    setActivePetTab('vattuoi');
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

  const getGroupName = (customer) => {
    if (customer.isVIP) return 'Thân thiết';
    const group = customerGroups.find(g => g.value === customer.group);
    return group ? group.label.replace('Khách hàng ', '') : 'Bình thường';
  };

  return (
    <div className="khachhang-container">
      <div className="khachhang-header">
        <h2>KHÁCH HÀNG</h2>
        <button className="btn-refresh" title="Làm mới">⟳</button>
      </div>

      {/* Floating Add Button - SMALLER, icon only */}
      <div className="floating-add-wrapper">
  <button 
    className="floating-add-btn-small"
    onClick={() => {
      resetCustomerForm();
      setShowAddModal(true);
    }}
    title="Thêm khách hàng mới"
  >
    <FaPlus size={16} />
  </button>
</div>

      <div className="search-filter-container">
        <div className="filter-group">
          <select 
            value={customerGroup}
            onChange={(e) => {
              setCustomerGroup(e.target.value);
              setCurrentPage(1);
            }}
            className="group-select"
          >
            {customerGroups.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
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

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th width="40"></th>
              <th>MÃ KHÁCH HÀNG</th>
              <th>NHÓM</th>
              <th>HỌ TÊN</th>
              <th>GIỚI TÍNH</th>
              <th>ĐIỆN THOẠI</th>
              <th>ĐỊA CHỈ</th>
              <th>NGÀY TẠO</th>
              <th width="60">(+) VẬT NUÔI</th>
              <th width="60">HỒ SƠ</th>
              <th width="60">SỬA</th>
              <th width="60">XÓA</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="12" className="no-data-row">
                  <p>Không tìm thấy khách hàng nào</p>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <React.Fragment key={customer.id}>
                  <tr className={expandedRow === customer.id ? 'expanded' : ''}>
                    <td>
                      <button 
                        className="expand-btn"
                        onClick={() => toggleExpand(customer.id)}
                        title="Xem chi tiết"
                      >
                        {expandedRow === customer.id ? <FaChevronUp /> : <FaPlus />}
                      </button>
                    </td>
                    <td className="code-cell">{customer.code || `BN${customer.id}`}</td>
                    <td>
                      <span className={`group-badge ${customer.isVIP ? 'vip' : customer.group || 'normal'}`}>
                        {getGroupName(customer)}
                      </span>
                    </td>
                    <td className="name-cell">{customer.name}</td>
                    <td>{customer.gender || 'Nam'}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address || '-'}</td>
                    <td>{customer.createdAt || '25/10/2023'}</td>
                    <td>
                      <button 
                        className="icon-btn"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowPetModal(true);
                        }}
                        title="Thêm vật nuôi"
                      >
                        <FaPlus />
                      </button>
                    </td>
                    <td>
                      <button 
                        className="icon-btn profile"
                        onClick={() => handleShowProfile(customer)}
                        title="Hồ sơ"
                      >
                        <FaFileAlt />
                      </button>
                    </td>
                    <td>
                      <button 
                        className="icon-btn edit"
                        onClick={() => handleEdit(customer)}
                        title="Sửa"
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td>
                      <button 
                        className="icon-btn delete"
                        onClick={() => handleDelete(customer.id)}
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  
                  {expandedRow === customer.id && (
                    <tr className="expand-content">
                      <td colSpan="12">
                        <div className="expand-tabs">
                          <button 
                            className={`expand-tab ${expandedTab === 'vattuoi' ? 'active' : ''}`}
                            onClick={() => setExpandedTab('vattuoi')}
                          >
                            <FaPaw /> Vật nuôi
                          </button>
                          <button 
                            className={`expand-tab ${expandedTab === 'khachhang' ? 'active' : ''}`}
                            onClick={() => setExpandedTab('khachhang')}
                          >
                            <FaUser /> Khách hàng
                          </button>
                          <button 
                            className={`expand-tab ${expandedTab === 'phieuchidinh' ? 'active' : ''}`}
                            onClick={() => setExpandedTab('phieuchidinh')}
                          >
                            <FaClipboardList /> Phiếu chỉ định
                          </button>
                          <button 
                            className={`expand-tab ${expandedTab === 'donthuoc' ? 'active' : ''}`}
                            onClick={() => setExpandedTab('donthuoc')}
                          >
                            <FaPrescriptionBottleAlt /> Đơn thuốc
                          </button>
                          <button 
                            className={`expand-tab ${expandedTab === 'hoadon' ? 'active' : ''}`}
                            onClick={() => setExpandedTab('hoadon')}
                          >
                            <FaFileInvoiceDollar /> Hóa đơn
                          </button>
                        </div>

                        <div className="expand-content-area">
                          {expandedTab === 'vattuoi' && (
                            <div className="tab-pane">
                              {customer.pets && customer.pets.length > 0 ? (
                                <table className="pet-table">
                                  <thead>
                                    <tr>
                                      <th>Tên</th>
                                      <th>Loài</th>
                                      <th>Giống</th>
                                      <th>Giới tính</th>
                                      <th>Màu sắc</th>
                                      <th>Cân nặng</th>
                                      <th>Ngày sinh</th>
                                      <th>Ghi chú</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {customer.pets.map((pet) => (
                                      <tr key={pet.id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.species}</td>
                                        <td>{pet.breed || '-'}</td>
                                        <td>{pet.gender}</td>
                                        <td>{pet.color || '-'}</td>
                                        <td>{pet.weight ? `${pet.weight} kg` : '-'}</td>
                                        <td>{pet.birthday || '-'}</td>
                                        <td>{pet.notes || '-'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p className="no-data">Chưa có vật nuôi. Nhấn (+) để thêm.</p>
                              )}
                            </div>
                          )}

                          {expandedTab === 'khachhang' && (
                            <div className="tab-pane detail-pane">
                              <div className="detail-grid">
                                <div className="detail-item">
                                  <span className="detail-label">Mã KH:</span>
                                  <span className="detail-value">{customer.code || `BN${customer.id}`}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Họ tên:</span>
                                  <span className="detail-value">{customer.name}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Giới tính:</span>
                                  <span className="detail-value">{customer.gender || 'Nam'}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Điện thoại:</span>
                                  <span className="detail-value">{customer.phone || '-'}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Email:</span>
                                  <span className="detail-value">{customer.email || '-'}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Địa chỉ:</span>
                                  <span className="detail-value">{customer.address || '-'}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Bí danh:</span>
                                  <span className="detail-value">{customer.alias || '-'}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Nhóm:</span>
                                  <span className="detail-value">{getGroupName(customer)}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Ngày tạo:</span>
                                  <span className="detail-value">{customer.createdAt || '-'}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {expandedTab === 'phieuchidinh' && (
                            <div className="tab-pane">
                              <p className="no-data">Chưa có phiếu chỉ định cho khách hàng này.</p>
                            </div>
                          )}

                          {expandedTab === 'donthuoc' && (
                            <div className="tab-pane">
                              <p className="no-data">Chưa có đơn thuốc cho khách hàng này.</p>
                            </div>
                          )}

                          {expandedTab === 'hoadon' && (
                            <div className="tab-pane">
                              <p className="no-data">Chưa có hóa đơn cho khách hàng này.</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Hiển thị {filteredCustomers.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, customers.length)} 
          trong tổng số <strong>{customers.length}</strong> khách hàng
        </div>
        
        <div className="pagination-controls">
          <button 
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => goToPage(1)}
            title="Trang đầu"
          >
            ««
          </button>
          <button 
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            title="Trang trước"
          >
            «
          </button>
          
          {getPageNumbers().map(num => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`page-btn ${currentPage === num ? 'active' : ''}`}
            >
              {num}
            </button>
          ))}
          
          <button 
            className="page-nav"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            title="Trang sau"
          >
            »
          </button>
          <button 
            className="page-nav"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(totalPages)}
            title="Trang cuối"
          >
            »»
          </button>
        </div>

        <div className="pagination-settings">
          <span>Trang:</span>
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

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>KHÁCH HÀNG</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="modal-tabs">
              <button 
                type="button"
                className={`modal-tab ${activeAddTab === 'thongtin' ? 'active' : ''}`}
                onClick={() => setActiveAddTab('thongtin')}
              >
                THÔNG TIN
              </button>
              <button 
                type="button"
                className={`modal-tab ${activeAddTab === 'ghichu' ? 'active' : ''}`}
                onClick={() => setActiveAddTab('ghichu')}
              >
                GHI CHÚ
              </button>
            </div>

            <form onSubmit={handleAddCustomer}>
              <div className="modal-body">
                {/* Tab Thông tin */}
                {activeAddTab === 'thongtin' && (
                  <>
                    {/* Section: Khách hàng */}
                    <div className="collapsible-section">
                      <div 
                        className="section-header"
                        onClick={() => toggleSection('khachhang')}
                      >
                        <h4>Khách hàng</h4>
                        <button type="button" className="section-toggle-btn">
                          {expandedSections.khachhang ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </div>
                      {expandedSections.khachhang && (
                        <div className="section-content">
                          <div className="form-row">
                            <div className="form-group">
                              <label>Tên Khách hàng</label>
                              <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Nhập tên khách hàng"
                              />
                            </div>
                            <div className="form-group">
                              <label>Bí danh</label>
                              <input 
                                type="text"
                                value={formData.alias}
                                onChange={(e) => setFormData({...formData, alias: e.target.value})}
                                placeholder="Tên gọi khác"
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
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Điện thoại</label>
                              <input 
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="0901234567"
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group full-width">
                              <label>Địa chỉ</label>
                              <input 
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                placeholder="Nhập địa chỉ"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Section: Nhóm */}
                    <div className="collapsible-section">
                      <div 
                        className="section-header"
                        onClick={() => toggleSection('nhom')}
                      >
                        <h4>Nhóm</h4>
                        <button type="button" className="section-toggle-btn">
                          {expandedSections.nhom ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </div>
                      {expandedSections.nhom && (
                        <div className="section-content">
                          <div className="form-row">
                            <div className="form-group checkbox-group">
                              <label className="checkbox-label">
                                <input 
                                  type="checkbox"
                                  checked={formData.isVIP}
                                  onChange={(e) => setFormData({...formData, isVIP: e.target.checked})}
                                />
                                <span>Khách hàng thân thiết</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Section: Thêm vật nuôi mới - FULL FIELDS */}
                    <div className="collapsible-section">
                      <div 
                        className="section-header"
                        onClick={() => toggleSection('vatnuoi')}
                      >
                        <h4>Thêm vật nuôi mới</h4>
                        <button type="button" className="section-toggle-btn">
                          {expandedSections.vatnuoi ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </div>
                      {expandedSections.vatnuoi && (
                        <div className="section-content">
                          <div className="form-row">
                            <div className="form-group">
                              <label>Tên vật nuôi *</label>
                              <input 
                                type="text"
                                value={petFormData.name}
                                onChange={(e) => setPetFormData({...petFormData, name: e.target.value})}
                                placeholder="Nhập tên vật nuôi"
                              />
                            </div>
                            <div className="form-group">
                              <label>Ngày sinh</label>
                              <input 
                                type="date"
                                value={petFormData.birthday}
                                onChange={(e) => setPetFormData({...petFormData, birthday: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Loài</label>
                              <select 
                                value={petFormData.species}
                                onChange={(e) => setPetFormData({...petFormData, species: e.target.value})}
                              >
                                <option value="Chó">Chó (Dog)</option>
                                <option value="Mèo">Mèo (Cat)</option>
                                <option value="Chim">Chim (Bird)</option>
                                <option value="Cá">Cá (Fish)</option>
                                <option value="Khác">Khác</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Giống</label>
                              <input 
                                type="text"
                                value={petFormData.breed}
                                onChange={(e) => setPetFormData({...petFormData, breed: e.target.value})}
                                placeholder="Ví dụ: Alaska, Poodle, Husky..."
                              />
                            </div>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Giới tính</label>
                              <select 
                                value={petFormData.gender}
                                onChange={(e) => setPetFormData({...petFormData, gender: e.target.value})}
                              >
                                <option value="Đực">Đực</option>
                                <option value="Cái">Cái</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Màu sắc</label>
                              <input 
                                type="text"
                                value={petFormData.color}
                                onChange={(e) => setPetFormData({...petFormData, color: e.target.value})}
                                placeholder="Ví dụ: Vàng, Đen, Trắng..."
                              />
                            </div>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Nhiệt độ (°C)</label>
                              <input 
                                type="number"
                                step="0.1"
                                value={petFormData.temperature}
                                onChange={(e) => setPetFormData({...petFormData, temperature: e.target.value})}
                                placeholder="38.5"
                              />
                            </div>
                            <div className="form-group">
                              <label>Cân nặng (Kg)</label>
                              <input 
                                type="number"
                                step="0.1"
                                value={petFormData.weight}
                                onChange={(e) => setPetFormData({...petFormData, weight: e.target.value})}
                                placeholder="5.5"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Tab Ghi chú */}
                {activeAddTab === 'ghichu' && (
                  <div className="form-section">
                    <div className="form-group">
                      <label>Ghi chú</label>
                      <textarea
                        className="notes-textarea"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Nhập ghi chú về khách hàng..."
                        rows="10"
                      />
                    </div>
                  </div>
                )}
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

      {/* Edit Customer Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaEdit /> CẬP NHẬT KHÁCH HÀNG</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdateCustomer}>
              <div className="modal-body">
                <div className="form-section">
                  <h4>Thông tin khách hàng</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Mã khách hàng</label>
                      <input 
                        type="text" 
                        value={formData.code}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label>Tên khách hàng *</label>
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
                      <label>Giới tính</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Điện thoại</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Địa chỉ</label>
                      <input 
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Bí danh</label>
                      <input 
                        type="text"
                        value={formData.alias}
                        onChange={(e) => setFormData({...formData, alias: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-delete" onClick={() => {
                  handleDelete(selectedCustomer.id);
                  setShowEditModal(false);
                }}>
                  <FaTrash /> Xóa
                </button>
                <div>
                  <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn-save">
                    <FaSave /> Cập nhật
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Pet Modal */}
      {showPetModal && (
        <div className="modal-overlay" onClick={() => setShowPetModal(false)}>
          <div className="modal-content xlarge" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaPaw /> THÊM VẬT NUÔI - {selectedCustomer?.name}</h3>
              <button className="close-btn" onClick={() => setShowPetModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddPet}>
              <div className="modal-body">
                <div className="pet-tabs">
                  <button 
                    type="button" 
                    className={`pet-tab ${activePetTab === 'vattuoi' ? 'active' : ''}`}
                    onClick={() => setActivePetTab('vattuoi')}
                  >
                    <FaPaw /> VẬT NUÔI
                  </button>
                  <button 
                    type="button" 
                    className={`pet-tab ${activePetTab === 'ghichu' ? 'active' : ''}`}
                    onClick={() => setActivePetTab('ghichu')}
                  >
                    <FaFileAlt /> GHI CHÚ
                  </button>
                </div>
                
                {activePetTab === 'vattuoi' && (
                  <>
                    <div className="form-section">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Tên vật nuôi *</label>
                          <input 
                            type="text" 
                            required
                            value={petFormData.name}
                            onChange={(e) => setPetFormData({...petFormData, name: e.target.value})}
                            placeholder="Nhập tên vật nuôi"
                          />
                        </div>
                        <div className="form-group">
                          <label>Ngày sinh</label>
                          <input 
                            type="date"
                            value={petFormData.birthday}
                            onChange={(e) => setPetFormData({...petFormData, birthday: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Loài</label>
                          <select 
                            value={petFormData.species}
                            onChange={(e) => setPetFormData({...petFormData, species: e.target.value})}
                          >
                            <option value="Chó">Chó (Dog)</option>
                            <option value="Mèo">Mèo (Cat)</option>
                            <option value="Chim">Chim (Bird)</option>
                            <option value="Cá">Cá (Fish)</option>
                            <option value="Khác">Khác</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Giống</label>
                          <input 
                            type="text"
                            value={petFormData.breed}
                            onChange={(e) => setPetFormData({...petFormData, breed: e.target.value})}
                            placeholder="Ví dụ: Alaska, Poodle, Husky..."
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Giới tính</label>
                          <select 
                            value={petFormData.gender}
                            onChange={(e) => setPetFormData({...petFormData, gender: e.target.value})}
                          >
                            <option value="Đực">Đực</option>
                            <option value="Cái">Cái</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Màu sắc</label>
                          <input 
                            type="text"
                            value={petFormData.color}
                            onChange={(e) => setPetFormData({...petFormData, color: e.target.value})}
                            placeholder="Ví dụ: Vàng, Đen, Trắng..."
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nhiệt độ (°C)</label>
                          <input 
                            type="number"
                            step="0.1"
                            value={petFormData.temperature}
                            onChange={(e) => setPetFormData({...petFormData, temperature: e.target.value})}
                            placeholder="38.5"
                          />
                        </div>
                        <div className="form-group">
                          <label>Cân nặng (Kg)</label>
                          <input 
                            type="number"
                            step="0.1"
                            value={petFormData.weight}
                            onChange={(e) => setPetFormData({...petFormData, weight: e.target.value})}
                            placeholder="5.5"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activePetTab === 'ghichu' && (
                  <div className="form-section notes-section">
                    <div className="form-group">
                      <label>Ghi chú về vật nuôi</label>
                      <textarea
                        className="notes-textarea"
                        value={petFormData.notes}
                        onChange={(e) => setPetFormData({...petFormData, notes: e.target.value})}
                        placeholder="Nhập ghi chú về tình trạng sức khỏe, tiền sử bệnh, dị ứng, thói quen, lưu ý đặc biệt..."
                        rows="10"
                      />
                      <div className="notes-hint">
                        💡 Gợi ý: Ghi rõ các thông tin quan trọng như tiền sử bệnh, dị ứng thuốc, 
                        thói quen ăn uống, tính cách, hoặc các lưu ý đặc biệt để bác sĩ dễ theo dõi.
                      </div>
                      <div className="notes-counter">
                        {petFormData.notes.length} ký tự
                      </div>
                    </div>
                    
                    <div className="quick-notes">
                      <label>Ghi chú nhanh:</label>
                      <div className="quick-notes-list">
                        <button 
                          type="button"
                          className="quick-note-btn"
                          onClick={() => setPetFormData({
                            ...petFormData, 
                            notes: petFormData.notes + (petFormData.notes ? '\n' : '') + '- Đã tiêm phòng đầy đủ.'
                          })}
                        >
                          + Đã tiêm phòng
                        </button>
                        <button 
                          type="button"
                          className="quick-note-btn"
                          onClick={() => setPetFormData({
                            ...petFormData, 
                            notes: petFormData.notes + (petFormData.notes ? '\n' : '') + '- Đang điều trị bệnh: '
                          })}
                        >
                          + Đang điều trị
                        </button>
                        <button 
                          type="button"
                          className="quick-note-btn"
                          onClick={() => setPetFormData({
                            ...petFormData, 
                            notes: petFormData.notes + (petFormData.notes ? '\n' : '') + '- Dị ứng: '
                          })}
                        >
                          + Dị ứng
                        </button>
                        <button 
                          type="button"
                          className="quick-note-btn"
                          onClick={() => setPetFormData({
                            ...petFormData, 
                            notes: petFormData.notes + (petFormData.notes ? '\n' : '') + '- Triệt sản rồi.'
                          })}
                        >
                          + Đã triệt sản
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowPetModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-save">
                  <FaSave /> Lưu lại
                </button>
                <button type="button" className="btn-print" onClick={handleAddPet}>
                  <FaPrint /> Lưu và In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content profile" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCustomer.code || `BN${selectedCustomer.id}`}</h3>
              <div className="header-actions">
                <button className="icon-btn" title="Phóng to">
                  <FaLink />
                </button>
                <button className="close-btn" onClick={() => setShowProfileModal(false)}>
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <h4>HỒ SƠ KHÁCH HÀNG</h4>
                <div className="profile-info">
                  <div className="qr-section">
                    <div className="qr-code">
                      <FaQrcode size={120} />
                    </div>
                    <p>Mã số: {selectedCustomer.code || `BN${selectedCustomer.id}`}</p>
                  </div>
                  <div className="customer-details">
                    <div className="detail-row">
                      <span>Họ tên</span>
                      <span>: {selectedCustomer.name}</span>
                    </div>
                    <div className="detail-row">
                      <span>Điện thoại</span>
                      <span>: {selectedCustomer.phone || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span>Địa chỉ</span>
                      <span>: {selectedCustomer.address || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span>Nhóm</span>
                      <span>: {getGroupName(selectedCustomer)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-sections">
                <div className="profile-section">
                  <h5>VẬT NUÔI</h5>
                  {selectedCustomer.pets && selectedCustomer.pets.length > 0 ? (
                    <ul>
                      {selectedCustomer.pets.map((pet, index) => (
                        <li key={index}>{pet.name} - {pet.species} ({pet.breed || 'N/A'})</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-data">Chưa có vật nuôi.</p>
                  )}
                </div>

                <div className="profile-section">
                  <h5>ĐƠN THUỐC</h5>
                  <p className="no-data">Chưa có thông tin.</p>
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
    </div>
  );
}

export default KhachHang;