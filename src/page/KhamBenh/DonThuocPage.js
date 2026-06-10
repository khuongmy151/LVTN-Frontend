import React, { useState } from 'react';

function DonThuocPage() {
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 'DT230227096', 
      pet: { name: 'lucky', code: 'PE150002488', type: 'Chó (Dog) - Việt Nam' },
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
      ]
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
      ]
    },
    { 
      id: 'DT230227094', 
      pet: { name: 'Ớt Hiểm', code: 'PE230221005', type: 'Chó (Dog) - Việt Nam', age: '4 tuổi 3 tháng' },
      customer: { name: 'Phùng Đình Trung', code: 'BN150107202', phone: '', address: '' },
      diagnosis: 'Nhiễm erichias spp',
      reexamDate: '26/10/2023',
      creator: 'BS. Bình',
      date: '25/10/2023 18:46',
      reason: '',
      drugs: [
        { id: 'TH150100234', name: 'VITAMIN K-1', quantity: 3, unit: 'viên', usage: 'Uống' },
      ]
    },
    { 
      id: 'DT230227093', 
      pet: { name: 'Ly', code: 'PE220710002', type: 'Chó (Dog) - Khác', age: '4 tuổi 2 tháng' },
      customer: { name: 'Tào Nhân Văn', code: 'BN150109909', phone: '', address: '' },
      diagnosis: 'ký sinh trùng máu Anaplasma',
      reexamDate: '26/10/2023',
      creator: 'BS. Bình',
      date: '25/10/2023 18:45',
      reason: '',
      drugs: []
    },
    { 
      id: 'DT230227092', 
      pet: { name: 'Bun', code: 'PE230227014', type: 'Chó (Dog) - Pug', age: '3 tuổi 6 tháng' },
      customer: { name: 'Đỗ Hân Diệu', code: 'BN230227005', phone: '', address: '' },
      diagnosis: 'ngứa bệnh l2',
      reexamDate: '26/10/2023',
      creator: 'BS. Bình',
      date: '25/10/2023 18:31',
      reason: '',
      drugs: []
    },
    { 
      id: 'DT230227091', 
      pet: { name: 'poo', code: 'PE150006717', type: 'Chó (Dog) - Poodle' },
      customer: { name: 'Hoàng Diệp Bích', code: 'BN150103991', phone: '', address: '' },
      diagnosis: 'chích ngừa bổ sung',
      reexamDate: '26/10/2023',
      creator: 'BS. Bình',
      date: '25/10/2023 18:35',
      reason: '',
      drugs: []
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
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [activeTab, setActiveTab] = useState('prescription');

  const toggleRow = (id) => {
    setExpandedRows(expandedRows.includes(id) 
      ? expandedRows.filter(rowId => rowId !== id)
      : [...expandedRows, id]
    );
  };

  const handleView = (prescription) => {
    setSelectedPrescription(prescription);
    setViewModal(true);
    setActiveTab('prescription');
  };

  const handlePrint = (id) => {
    console.log('Print:', id);
  };

  const handleCreateInvoice = (id) => {
    console.log('Create invoice:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete:', id);
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
            <input 
              type="text" 
              value={dateFrom} 
              onChange={(e) => setDateFrom(e.target.value)}
              className="date-input"
            />
            <label>Đến</label>
            <input 
              type="text" 
              value={dateTo} 
              onChange={(e) => setDateTo(e.target.value)}
              className="date-input"
            />
          </div>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
            />
            Tất cả
          </label>
        </div>

        <div className="search-group">
          <select 
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type-select"
          >
            <option value="phone">Điện thoại</option>
            <option value="name">Tên khách hàng</option>
            <option value="pet">Tên vật nuôi</option>
            <option value="code">Mã đơn thuốc</option>
          </select>
          <input 
            type="text" 
            placeholder="Nhập từ cần tìm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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
                    <button 
                      className="btn-expand"
                      onClick={() => toggleRow(p.id)}
                    >
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
                    <button 
                      className="btn-icon-action btn-view-action" 
                      onClick={() => handleView(p)}
                      title="Xem"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button 
                      className="btn-icon-action btn-print-action" 
                      onClick={() => handlePrint(p.id)}
                      title="In"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button 
                      className="btn-icon-action btn-invoice-action" 
                      onClick={() => handleCreateInvoice(p.id)}
                      title="Lập hóa đơn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button 
                      className="btn-icon-action btn-edit-action" 
                      onClick={() => handleEdit(p.id)}
                      title="Sửa"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button 
                      className="btn-icon-action btn-delete-action" 
                      onClick={() => handleDelete(p.id)}
                      title="Xóa"
                    >
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
                          className={`tab-btn ${activeTab === 'prescription' ? 'active' : ''}`}
                          onClick={() => setActiveTab('prescription')}
                        >
                          Đơn thuốc
                        </button>
                        <button 
                          className={`tab-btn ${activeTab === 'customer' ? 'active' : ''}`}
                          onClick={() => setActiveTab('customer')}
                        >
                          Thông tin Khách hàng
                        </button>
                      </div>
                      
                      {activeTab === 'prescription' && (
                        <div className="expanded-details prescription-details">
                          <div className="pet-info-header">
                            Vật nuôi: {p.pet.name} ({p.pet.code}) - {p.pet.type}
                          </div>
                          <table className="drugs-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Mã thuốc</th>
                                <th>Tên thuốc</th>
                                <th>Số lượng</th>
                                <th>Đơn vị tính</th>
                                <th>Cách dùng</th>
                              </tr>
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
                                <tr>
                                  <td colSpan="6" className="no-data">Không có thuốc trong đơn</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      {activeTab === 'customer' && (
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
                  <div className="print-row">
                    <label>Khách hàng</label>
                    <span>: {selectedPrescription.customer.name}</span>
                  </div>
                  <div className="print-row">
                    <label>Điện thoại</label>
                    <span>: {selectedPrescription.customer.phone}</span>
                  </div>
                  <div className="print-row">
                    <label>Địa chỉ</label>
                    <span>: {selectedPrescription.customer.address || ''}</span>
                  </div>
                  <div className="print-row">
                    <label>Vật nuôi</label>
                    <span>: {selectedPrescription.pet.name} ({selectedPrescription.pet.code}) - {selectedPrescription.pet.type}</span>
                  </div>
                  {selectedPrescription.reason && (
                    <div className="print-row">
                      <label>Lý do khám</label>
                      <span>: {selectedPrescription.reason}</span>
                    </div>
                  )}
                  {selectedPrescription.diagnosis && (
                    <div className="print-row">
                      <label>Chẩn đoán</label>
                      <span>: {selectedPrescription.diagnosis}</span>
                    </div>
                  )}
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
                  <div className="print-reexam">
                    <label>Ngày tái khám:</label>
                    <span>{selectedPrescription.reexamDate}</span>
                  </div>
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
    </div>
  );
}

export default DonThuocPage;