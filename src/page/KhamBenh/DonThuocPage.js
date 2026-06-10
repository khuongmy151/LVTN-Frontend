import React, { useState } from 'react';

function DonThuocPage() {
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 'DT230227096', 
      pet: { name: 'lucky', code: 'PE150002488', type: 'Chó (Dog) - Việt Nam', weight: '10.0 Kg' },
      customer: { name: 'Hoàng Chiến Thắng', code: 'BN150101723', phone: '091723461723', address: 'Hải Dương' },
      diagnosis: '',
      reexamDate: '26/10/2023',
      creator: 'Nhân viên quầy 1',
      date: '25/10/2023 19:14',
      reason: 'Chân yếu',
      drugs: [
        { id: 'TH150100035', name: 'Bio Anazine', quantity: 2, unit: 'ml', usage: 'Tiêm' },
        { id: 'TH150100007', name: 'Ceftriaxone 1mg', quantity: 1, unit: 'ml', usage: 'Tiêm' },
        { id: 'TH150100017', name: 'Lesthionin C', quantity: 1, unit: 'ml', usage: 'Tiêm' },
        { id: 'TH150100433', name: 'Cal-Mg-B6', quantity: 2, unit: 'ml', usage: 'Tiêm' },
      ],
      duration: '1 ngày',
      notes: ''
    },
    { 
      id: 'DT230227095', 
      pet: { name: 'Quá', code: 'PE220930007', type: 'Mèo (Cat) - Khác', age: '7' },
      customer: { name: 'Đỗ Anh Trần', code: 'BN220802002', phone: '', address: '' },
      diagnosis: 'Cắt chỉ',
      reexamDate: '26/10/2023',
      creator: 'BS. Bình',
      date: '25/10/2023 18:54',
      reason: '',
      drugs: [
        { id: 'TH150100089', name: 'Advocate', quantity: 1, unit: 'ống', usage: 'Bôi ngoài da' },
      ],
      duration: '',
      notes: ''
    },
  ]);

  const [expandedRows, setExpandedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('phone');
  const [dateFrom, setDateFrom] = useState('12/4/2026');
  const [dateTo, setDateTo] = useState('11/6/2026');
  const [showAll, setShowAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Modal states
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  
  // FIXED: Use object to store active tab for each row independently
  const [activeTabs, setActiveTabs] = useState({});
  
  // Edit modal states
  const [selectedGroup, setSelectedGroup] = useState('');
  const [editingPrescription, setEditingPrescription] = useState(null);

  const drugGroups = [
    'An thần - thuốc mê', 'Cầm máu', 'Da liễu',
    'Dịch truyền', 'Dinh dưỡng bổ sung', 'Gan mật',
    'Khác', 'Kháng sinh', 'Kháng viêm', 'Kí sinh trùng'
  ];

  const sampleDrugs = {
    'An thần - thuốc mê': [
      { id: 'TH001', name: 'Ketamine', unit: 'ml' },
      { id: 'TH002', name: 'Xylazine', unit: 'ml' },
    ],
    'Kháng sinh': [
      { id: 'TH150100035', name: 'Bio Anazine', unit: 'ml' },
      { id: 'TH150100007', name: 'Ceftriaxone 1mg', unit: 'ml' },
      { id: 'TH150100089', name: 'Advocate', unit: 'ống' },
    ],
    'Kháng viêm': [
      { id: 'TH150100017', name: 'Lesthionin C', unit: 'ml' },
    ],
    'Dinh dưỡng bổ sung': [
      { id: 'TH150100433', name: 'Cal-Mg-B6', unit: 'ml' },
    ]
  };

  const diseaseProgress = [
    { date: '26/02/2023', note: 'sốt, đi yếu, ăn dc' },
    { date: '05/11/2022', note: 'ói, ăn được' },
    { date: '04/11/2022', note: 'vết mổ ổn' },
    { date: '26/10/2022', note: 'Vết thương hở hẹn' },
  ];

  const vitalSigns = [
    { date: '27/02/2023', temp: '', weight: '10.0 Kg' },
    { date: '26/02/2023', temp: '', weight: '10.0 Kg' },
    { date: '09/11/2022', temp: '', weight: '9.5 Kg' },
  ];

  const treatmentHistory = [
    { date: '25/10/2023 19:14', type: 'prescription' },
    { date: '24/10/2023 16:51', type: 'exam' },
  ];

  const files = [
    { date: '23/10/2022', name: 'File sinh hoá 22.10 Ngọc Lucky', type: 'PDF' },
    { date: '23/10/2022', name: 'File sinh lý 22.10.22 lucky', type: 'PDF' },
  ];

  const toggleRow = (id) => {
    setExpandedRows(expandedRows.includes(id) 
      ? expandedRows.filter(rowId => rowId !== id)
      : [...expandedRows, id]
    );
  };

  // FIXED: Helper functions to manage active tab for each row independently
  const getActiveTab = (id) => activeTabs[id] || 'prescription';
  const setActiveTabForRow = (id, tab) => {
    setActiveTabs({...activeTabs, [id]: tab});
  };

  const handleView = (prescription) => {
    setSelectedPrescription(prescription);
    setViewModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = (prescription) => {
    setSelectedPrescription(prescription);
    setEditingPrescription({...prescription, drugs: [...prescription.drugs]});
    setEditModal(true);
  };

  const handleDeleteClick = (prescription) => {
    setSelectedPrescription(prescription);
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedPrescription) {
      setPrescriptions(prescriptions.filter(p => p.id !== selectedPrescription.id));
      setDeleteConfirm(false);
      setSelectedPrescription(null);
    }
  };

  const addDrug = (drug) => {
    if (editingPrescription) {
      const existingDrug = editingPrescription.drugs.find(d => d.id === drug.id);
      if (!existingDrug) {
        setEditingPrescription({
          ...editingPrescription,
          drugs: [...editingPrescription.drugs, {...drug, quantity: 1, usage: 'Tiêm'}]
        });
      }
    }
  };

  const removeDrug = (drugId) => {
    if (editingPrescription) {
      setEditingPrescription({
        ...editingPrescription,
        drugs: editingPrescription.drugs.filter(d => d.id !== drugId)
      });
    }
  };

  const updateDrugQuantity = (drugId, quantity) => {
    if (editingPrescription) {
      setEditingPrescription({
        ...editingPrescription,
        drugs: editingPrescription.drugs.map(d => 
          d.id === drugId ? {...d, quantity: parseInt(quantity) || 1} : d
        )
      });
    }
  };

  const updateDrugUsage = (drugId, usage) => {
    if (editingPrescription) {
      setEditingPrescription({
        ...editingPrescription,
        drugs: editingPrescription.drugs.map(d => 
          d.id === drugId ? {...d, usage} : d
        )
      });
    }
  };

  const setDuration = (days) => {
    if (editingPrescription) {
      setEditingPrescription({...editingPrescription, duration: days});
    }
  };

  const savePrescription = () => {
    if (editingPrescription) {
      setPrescriptions(prescriptions.map(p => 
        p.id === editingPrescription.id ? editingPrescription : p
      ));
      setEditModal(false);
      setEditingPrescription(null);
    }
  };

  const totalPages = Math.ceil(prescriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = prescriptions.slice(startIndex, endIndex);

  return (
    <div className="phieu-chi-dinh-container">
      <div className="page-header-section">
        <h2 className="page-title">ĐƠN THUỐC</h2>
        <span className="refresh-icon">⟳</span>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <div className="date-filter">
            <span className="calendar-icon">📅</span>
            <label>Từ</label>
            <input type="text" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="date-input" />
            <label>Đến</label>
            <input type="text" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="date-input" />
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
            Tất cả
          </label>
        </div>

        <div className="search-group">
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-type-select">
            <option value="phone">Điện thoại</option>
            <option value="name">Tên khách hàng</option>
            <option value="pet">Tên vật nuôi</option>
            <option value="code">Mã đơn thuốc</option>
          </select>
          <input type="text" placeholder="Nhập từ cần tìm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
          <button className="btn-search">Tìm kiếm</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table prescription-table">
          <thead>
            <tr>
              <th className="expand-col"></th>
              <th>MÃ ĐƠN THUỐC</th>
              <th>VẬT NUÔI</th>
              <th>KHÁCH HÀNG</th>
              <th>CHẨN ĐOÁN</th>
              <th>NGÀY TÁI KHÁM</th>
              <th>NGƯỜI LẬP</th>
              <th>NGÀY TẠO</th>
              <th>XEM</th>
              <th>IN</th>
              <th>LẬP HĐ</th>
              <th>SỬA</th>
              <th>XÓA</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((p) => (
              <React.Fragment key={p.id}>
                <tr>
                  <td className="expand-cell">
                    <button className="btn-expand" onClick={() => toggleRow(p.id)}>
                      {expandedRows.includes(p.id) ? '−' : '+'}
                    </button>
                  </td>
                  <td className="code-cell">{p.id}</td>
                  <td className="pet-cell">
                    <div className="pet-name">{p.pet.name} - {p.pet.code}</div>
                    <div className="pet-type">{p.pet.type}</div>
                    {p.pet.age && <div className="pet-age">{p.pet.age}</div>}
                  </td>
                  <td className="customer-cell">
                    <div className="customer-name">{p.customer.name}</div>
                    <div className="customer-code">{p.customer.code}</div>
                  </td>
                  <td>{p.diagnosis}</td>
                  <td>{p.reexamDate}</td>
                  <td>{p.creator}</td>
                  <td>{p.date}</td>
                  <td className="action-cell">
                    <button className="btn-icon-action btn-view-action" onClick={() => handleView(p)} title="Xem">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon-action btn-print-action" onClick={() => handlePrint()} title="In">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon-action btn-invoice-action" title="Lập hóa đơn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon-action btn-edit-action" onClick={() => handleEdit(p)} title="Sửa">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon-action btn-delete-action" onClick={() => handleDeleteClick(p)} title="Xóa">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(p.id) && (
                  <tr className="expanded-row">
                    <td colSpan="13" className="expanded-content">
                      <div className="expanded-tabs">
                        <button 
                          className={`tab-btn ${getActiveTab(p.id) === 'prescription' ? 'active' : ''}`} 
                          onClick={() => setActiveTabForRow(p.id, 'prescription')}
                        >
                          Đơn thuốc
                        </button>
                        <button 
                          className={`tab-btn ${getActiveTab(p.id) === 'customer' ? 'active' : ''}`} 
                          onClick={() => setActiveTabForRow(p.id, 'customer')}
                        >
                          Thông tin Khách hàng
                        </button>
                      </div>
                      
                      {getActiveTab(p.id) === 'prescription' && (
                        <div className="expanded-details prescription-details">
                          <div className="pet-info-header">Vật nuôi: {p.pet.name} ({p.pet.code}) - {p.pet.type}</div>
                          <table className="drugs-table">
                            <thead>
                              <tr><th>#</th><th>Mã thuốc</th><th>Tên thuốc</th><th>Số lượng</th><th>Đơn vị tính</th><th>Cách dùng</th></tr>
                            </thead>
                            <tbody>
                              {p.drugs.length > 0 ? (
                                p.drugs.map((drug, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td className="code-cell">{drug.id}</td>
                                    <td>{drug.name}</td>
                                    <td>{drug.quantity}</td>
                                    <td>{drug.unit}</td>
                                    <td>{drug.usage}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr><td colSpan="6" className="no-data">Không có thuốc trong đơn</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      {getActiveTab(p.id) === 'customer' && (
                        <div className="expanded-details customer-details">
                          <div className="detail-grid">
                            <div className="detail-item">
                              <label>Khách hàng:</label>
                              <span>{p.customer.name}</span>
                            </div>
                            <div className="detail-item">
                              <label>Điện thoại:</label>
                              <span>{p.customer.phone || 'Chưa cập nhật'}</span>
                            </div>
                            <div className="detail-item">
                              <label>Địa chỉ:</label>
                              <span>{p.customer.address || 'Chưa cập nhật'}</span>
                            </div>
                            <div className="detail-item">
                              <label>Vật nuôi:</label>
                              <span>{p.pet.name} ({p.pet.code}) - {p.pet.type}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          <span>Trang</span>
          <input type="number" value={currentPage} min="1" max={totalPages} className="page-input" readOnly />
        </div>
        <div className="pagination-controls">
          {Array.from({ length: Math.min(totalPages, 25) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          {totalPages > 25 && <span>...</span>}
        </div>
        <div className="items-per-page">
          <span>Số mục / trang:</span>
          <select className="per-page-select" value={itemsPerPage}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* View Modal */}
      {viewModal && selectedPrescription && (
        <div className="modal-overlay" onClick={() => setViewModal(false)}>
          <div className="modal-content-view" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-view">
              <h3>Đơn thuốc</h3>
              <div className="modal-header-actions">
                <button className="btn-maximize">⛶</button>
                <button className="btn-close" onClick={() => setViewModal(false)}>✕</button>
              </div>
            </div>
            <div className="modal-body-view">
              <div className="prescription-print">
                <h2 className="print-title">ĐƠN THUỐC</h2>
                <div className="print-code">Mã số: {selectedPrescription.id}</div>
                <div className="print-info-grid">
                  <div className="print-row"><label>Khách hàng</label><span>: {selectedPrescription.customer.name}</span></div>
                  <div className="print-row"><label>Điện thoại</label><span>: {selectedPrescription.customer.phone}</span></div>
                  <div className="print-row"><label>Địa chỉ</label><span>: {selectedPrescription.customer.address || ''}</span></div>
                  <div className="print-row"><label>Vật nuôi</label><span>: {selectedPrescription.pet.name} ({selectedPrescription.pet.code}) - {selectedPrescription.pet.type} {selectedPrescription.pet.weight && `- ${selectedPrescription.pet.weight}`}</span></div>
                  {selectedPrescription.reason && <div className="print-row"><label>Lý do khám</label><span>: {selectedPrescription.reason}</span></div>}
                  {selectedPrescription.diagnosis && <div className="print-row"><label>Chẩn đoán</label><span>: {selectedPrescription.diagnosis}</span></div>}
                </div>
                {selectedPrescription.drugs && selectedPrescription.drugs.length > 0 && (
                  <div className="print-drugs-list">
                    {selectedPrescription.drugs.map((drug, idx) => (
                      <div key={idx} className="print-drug-item">
                        <div className="drug-number">{idx + 1}.</div>
                        <div className="drug-info">
                          <div className="drug-name">{drug.name}</div>
                          <div className="drug-usage">{drug.usage}</div>
                        </div>
                        <div className="drug-quantity">{drug.quantity} {drug.unit}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="print-footer">
                  <div className="print-reexam"><label>Ngày tái khám:</label><span>{selectedPrescription.reexamDate}</span></div>
                  <div className="print-signature">
                    <div className="print-date">Ngày {new Date().toLocaleDateString('vi-VN')}</div>
                    <div className="print-doctor-title">Bác sĩ</div>
                    <div className="print-doctor-name">{selectedPrescription.creator}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-view">
              <button className="btn-float-menu">⋯</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && editingPrescription && (
        <div className="modal-overlay" onClick={() => setEditModal(false)}>
          <div className="modal-content-edit-prescription" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-edit">
              <h3>ĐƠN THUỐC</h3>
              <div className="modal-header-actions">
                <button className="btn-maximize">⛶</button>
                <button className="btn-close" onClick={() => setEditModal(false)}>✕</button>
              </div>
            </div>
            <div className="modal-body-edit-prescription">
              {/* Left Panel - Drug Groups */}
              <div className="edit-left-panel">
                <div className="edit-section">
                  <h4>Nhóm</h4>
                  <div className="drug-groups">
                    {drugGroups.map((group, idx) => (
                      <button 
                        key={idx} 
                        className={`group-btn ${selectedGroup === group ? 'active' : ''}`}
                        onClick={() => setSelectedGroup(group)}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="edit-section">
                  <h4>Danh mục</h4>
                  <div className="drug-list">
                    {selectedGroup && sampleDrugs[selectedGroup] && sampleDrugs[selectedGroup].map((drug, idx) => (
                      <div key={idx} className="drug-item" onClick={() => addDrug(drug)}>
                        <span>{drug.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="edit-section">
                  <h4>Đơn thuốc mẫu</h4>
                  <div className="sample-prescriptions"></div>
                </div>
              </div>

              {/* Center Panel - Prescription Form */}
              <div className="edit-center-panel">
                <div className="prescription-form">
                  <h2 className="form-title">ĐƠN THUỐC</h2>
                  <div className="form-code">Mã số: {editingPrescription.id}</div>
                  
                  <div className="form-row">
                    <label>Họ tên:</label>
                    <span className="form-value">{editingPrescription.customer.name}</span>
                    <label>Điện thoại:</label>
                    <span className="form-value">{editingPrescription.customer.phone}</span>
                  </div>
                  <div className="form-row">
                    <label>Địa chỉ:</label>
                    <span className="form-value">{editingPrescription.customer.address}</span>
                  </div>
                  <div className="form-row">
                    <label>Vật nuôi:</label>
                    <select className="form-select">
                      <option>{editingPrescription.pet.name} - {editingPrescription.pet.type.split('-')[0]}</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Lý do khám:</label>
                    <input type="text" defaultValue={editingPrescription.reason} className="form-input" />
                  </div>
                  <div className="form-row">
                    <label>Chẩn đoán:</label>
                    <input type="text" defaultValue={editingPrescription.diagnosis} className="form-input" />
                  </div>

                  {/* Duration Buttons */}
                  <div className="duration-buttons">
                    {['1 ngày', '3 ngày', '7 ngày', '14 ngày', '30 ngày'].map((days, idx) => (
                      <button 
                        key={idx} 
                        className={`duration-btn ${editingPrescription.duration === days ? 'active' : ''}`}
                        onClick={() => setDuration(days)}
                      >
                        {days}
                      </button>
                    ))}
                    <button className="duration-btn custom">
                      <input type="number" placeholder="1" className="days-input" /> Ngày
                    </button>
                  </div>

                  {/* Drug List */}
                  <div className="prescription-drugs-edit">
                    {editingPrescription.drugs.map((drug, idx) => (
                      <div key={idx} className="drug-row-edit">
                        <div className="drug-number-edit">{String(idx + 1).padStart(2, '0')}.</div>
                        <div className="drug-details-edit">
                          <div className="drug-name-edit">{drug.name}</div>
                          <div className="drug-usage-edit">
                            <label>Cách dùng:</label>
                            <input 
                              type="text" 
                              value={drug.usage} 
                              onChange={(e) => updateDrugUsage(drug.id, e.target.value)}
                              className="usage-input"
                            />
                          </div>
                        </div>
                        <div className="drug-quantity-edit">
                          <label>Số lượng:</label>
                          <input 
                            type="number" 
                            value={drug.quantity} 
                            onChange={(e) => updateDrugQuantity(drug.id, e.target.value)}
                            className="qty-input-small"
                          />
                          <span>{drug.unit}</span>
                        </div>
                        <button className="btn-remove-drug" onClick={() => removeDrug(drug.id)}>×</button>
                      </div>
                    ))}
                    <button className="btn-add-drug-main">⊕</button>
                  </div>

                  {/* Footer Info */}
                  <div className="prescription-footer-edit">
                    <div className="footer-left">
                      <div className="form-row">
                        <label>Ngày tái khám:</label>
                        <input type="text" defaultValue={editingPrescription.reexamDate} className="form-input-small" />
                      </div>
                      <div className="form-row">
                        <label>Lời dặn:</label>
                        <textarea rows="4" defaultValue={editingPrescription.notes} className="notes-textarea"></textarea>
                      </div>
                    </div>
                    <div className="footer-right">
                      <div className="creator-info-edit">
                        <div>Ngày {new Date().toLocaleDateString('vi-VN')}</div>
                        <div className="creator-title">BÁC SĨ</div>
                        <div className="creator-name">Admin Phòng Khám</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Medical History */}
              <div className="edit-right-panel">
                <div className="right-section disease-progress">
                  <div className="section-header">
                    <h4>Diễn tiến bệnh</h4>
                    <button className="btn-add">⊕</button>
                  </div>
                  <div className="section-content">
                    {diseaseProgress.map((item, idx) => (
                      <div key={idx} className="progress-item">
                        <div className="progress-date">{item.date}</div>
                        <div className="progress-note">{item.note}</div>
                        <div className="progress-actions">
                          <button>✏️</button>
                          <button>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="right-section vital-signs">
                  <div className="section-header">
                    <h4>Sinh hiệu</h4>
                    <button className="btn-add">⊕</button>
                  </div>
                  <div className="section-content">
                    {vitalSigns.map((item, idx) => (
                      <div key={idx} className="vital-item">
                        <div className="vital-date">{item.date}</div>
                        <div className="vital-data">
                          {item.temp && <span>• Nhiệt độ: {item.temp}</span>}
                          <span>• Nặng: {item.weight}</span>
                        </div>
                        <div className="vital-actions">
                          <button>✏️</button>
                          <button>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="right-section treatment-history">
                  <div className="section-header">
                    <h4>Quá trình điều trị</h4>
                  </div>
                  <div className="section-content">
                    {treatmentHistory.map((item, idx) => (
                      <div key={idx} className={`history-item ${item.type === 'prescription' ? 'active' : ''}`}>
                        <span>{item.date}</span>
                        <span>{item.type === 'prescription' ? '📋' : '📄'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="right-section files">
                  <div className="section-header">
                    <h4>Files</h4>
                    <button className="btn-upload">☁️</button>
                  </div>
                  <div className="section-content">
                    {files.map((file, idx) => (
                      <div key={idx} className="file-item">
                        <div className="file-date">{file.date}</div>
                        <div className="file-info">
                          <span className="file-type">{file.type}</span>
                          <span className="file-name">{file.name}</span>
                        </div>
                        <div className="file-actions">
                          <button>📎</button>
                          <button>✏️</button>
                          <button>×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-edit">
              <div className="edit-date">
                <label>Ngày lập:</label>
                <span>{editingPrescription.date}</span>
              </div>
              <div className="edit-actions">
                <button className="btn-update" onClick={savePrescription}>Cập nhật</button>
                <button className="btn-save-print" onClick={() => { savePrescription(); handlePrint(); }}>Lưu và In</button>
                <button className="btn-cancel" onClick={() => setEditModal(false)}>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(false)}>
          <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa đơn thuốc <strong>{selectedPrescription?.id}</strong>?</p>
            <div className="confirm-actions">
              <button className="btn-confirm-yes" onClick={confirmDelete}>Đồng ý</button>
              <button className="btn-confirm-no" onClick={() => setDeleteConfirm(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonThuocPage;