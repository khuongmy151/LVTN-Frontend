import React, { useState } from 'react';

function PhieuChiDinh() {
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 'XN230227029', 
      pet: { name: 'gạo', code: 'PE220531010', type: 'Mèo (Cat)', age: '7' },
      customer: { name: 'Phạm Anh Trân', code: 'BN220531004', phone: '09128574712857', address: '' },
      clinical: '',
      transferTo: '',
      creator: 'BS. An',
      date: '25/10/2023 18:27',
      testResults: '1 / 1',
      status: 'completed',
      items: [{ category: 'Chẩn đoán hình ảnh', name: 'Siêu âm thai', price: 70000, quantity: 1 }],
      appointmentDate: '',
      notes: ''
    },
    { 
      id: 'XN230227028', 
      pet: { name: 'milo', code: 'PE220708010', type: 'Chó (Dog) - Poodle', age: '4 tuổi 1 tháng' },
      customer: { name: 'Tào Tùng Quân', code: 'BN220708004', phone: '', address: '' },
      clinical: '',
      transferTo: '',
      creator: 'BS. An',
      date: '25/10/2023 17:57',
      testResults: '0 / 0',
      status: 'pending',
      items: [],
      appointmentDate: '',
      notes: ''
    },
    { 
      id: 'XN230227027', 
      pet: { name: 'Đen Mẹ', code: 'PE230227010', type: 'Chó (Dog) - Foxhound', age: '3 tuổi 3 tháng' },
      customer: { name: 'Vũ Thành Công', code: 'BN150107470', phone: '', address: '' },
      clinical: '',
      transferTo: '',
      creator: 'BS. Bình',
      date: '25/10/2023 17:47',
      testResults: '1 / 1',
      status: 'completed',
      items: [],
      appointmentDate: '',
      notes: ''
    },
    { 
      id: 'XN230227026', 
      pet: { name: 'Đen Mẹ', code: 'PE230227010', type: 'Chó (Dog) - Foxhound', age: '3 tuổi 3 tháng' },
      customer: { name: 'Vũ Thành Công', code: 'BN150107470', phone: '', address: '' },
      clinical: '',
      transferTo: '',
      creator: 'BS. An',
      date: '25/10/2023 17:44',
      testResults: '1 / 1',
      status: 'completed',
      items: [],
      appointmentDate: '',
      notes: ''
    },
    { 
      id: 'XN230227025', 
      pet: { name: 'Đen Mẹ', code: 'PE230227010', type: 'Chó (Dog) - Foxhound', age: '3 tuổi 3 tháng' },
      customer: { name: 'Vũ Thành Công', code: 'BN150107470', phone: '', address: '' },
      clinical: '',
      transferTo: '',
      creator: 'BS. Bình',
      date: '25/10/2023 17:35',
      testResults: '1 / 1',
      status: 'completed',
      items: [],
      appointmentDate: '',
      notes: ''
    },
    { 
      id: 'XN230227024', 
      pet: { name: 'Kiki', code: 'PE230227009', type: 'Chó (Dog) - Việt Nam', age: '' },
      customer: { name: 'Bùi Mạnh Hùng', code: 'BN220727001', phone: '', address: '' },
      clinical: '',
      transferTo: '',
      creator: 'BS. Bình',
      date: '25/10/2023 16:42',
      testResults: '0 / 0',
      status: 'pending',
      items: [],
      appointmentDate: '',
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
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const toggleRow = (id) => {
    setExpandedRows(expandedRows.includes(id) 
      ? expandedRows.filter(rowId => rowId !== id)
      : [...expandedRows, id]
    );
  };

  const handleView = (prescription) => {
    setSelectedPrescription(prescription);
    setViewModal(true);
  };

  const handlePrint = (id) => {
    console.log('Print:', id);
  };

  const handleCreateInvoice = (prescription) => {
    setSelectedPrescription(prescription);
    setInvoiceModal(true);
  };

  const handleEdit = (prescription) => {
    setSelectedPrescription(prescription);
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

  const totalPages = Math.ceil(prescriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = prescriptions.slice(startIndex, endIndex);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <div className="phieu-chi-dinh-container">
      <div className="page-header-section">
        <h2 className="page-title">PHIẾU CHỈ ĐỊNH CLS</h2>
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
            <option value="code">Mã phiếu</option>
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
              <th>MÃ SỐ</th>
              <th>VẬT NUÔI</th>
              <th>KHÁCH HÀNG</th>
              <th>LÂM SÀNG / CHẨN ĐOÁN</th>
              <th>NGƯỜI LẬP</th>
              <th>NGÀY TẠO</th>
              <th>SỐ KQXN</th>
              <th>XEM</th>
              <th>IN</th>
              <th>LẬP HÓA ĐƠN</th>
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
                  <td>{p.clinical}</td>
                  <td>{p.creator}</td>
                  <td>{p.date}</td>
                  <td className="text-center">{p.testResults}</td>
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
                      className="btn-icon-action btn-more-action" 
                      onClick={() => handlePrint(p.id)}
                      title="In"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" opacity="0.3"/>
                        <rect x="7" y="7" width="10" height="10"/>
                      </svg>
                    </button>
                  </td>
                  <td className="action-cell">
                    <button 
                      className="btn-icon-action btn-invoice-action" 
                      onClick={() => handleCreateInvoice(p)}
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
                      onClick={() => handleEdit(p)}
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
                      onClick={() => handleDeleteClick(p)}
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
                      <div className="expanded-details">
                        <h4>Chi tiết phiếu chỉ định: {p.id}</h4>
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
                            <label>Vật nuôi:</label>
                            <span>{p.pet.name} ({p.pet.code}) - {p.pet.type}</span>
                          </div>
                          <div className="detail-item">
                            <label>Ngày tạo:</label>
                            <span>{p.date}</span>
                          </div>
                          <div className="detail-item">
                            <label>Người lập:</label>
                            <span>{p.creator}</span>
                          </div>
                          <div className="detail-item">
                            <label>Kết quả xét nghiệm:</label>
                            <span>{p.testResults}</span>
                          </div>
                        </div>
                      </div>
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
              <h3>Phiếu chỉ định CLS</h3>
              <div className="modal-header-actions">
                <button className="btn-maximize">⛶</button>
                <button className="btn-close" onClick={() => setViewModal(false)}>✕</button>
              </div>
            </div>
            <div className="modal-body-view">
              <div className="prescription-print">
                <h2 className="print-title">PHIẾU CHỈ ĐỊNH CLS</h2>
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
                    <span>: {selectedPrescription.pet.name} ({selectedPrescription.pet.code}) - {selectedPrescription.pet.type} {selectedPrescription.pet.age && `- ${selectedPrescription.pet.age}`}</span>
                  </div>
                  <div className="print-row">
                    <label>Lâm sàng / Chẩn đoán</label>
                    <span>: {selectedPrescription.clinical || ''}</span>
                  </div>
                  <div className="print-row">
                    <label>Chuyển đến</label>
                    <span>: {selectedPrescription.transferTo || ''}</span>
                  </div>
                </div>

                {selectedPrescription.items && selectedPrescription.items.length > 0 && (
                  <div className="print-section">
                    <h4>CHẨN ĐOÁN HÌNH ẢNH</h4>
                    <ul className="print-items">
                      {selectedPrescription.items.map((item, idx) => (
                        <li key={idx}>
                          <input type="checkbox" checked readOnly /> {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="print-footer">
                  <div className="print-date">Ngày {new Date().getDate()} Tháng {new Date().getMonth() + 1} Năm {new Date().getFullYear()}</div>
                  <div className="print-doctor-title">Bác sĩ</div>
                  <div className="print-doctor-name">{selectedPrescription.creator}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer-view">
              <button className="btn-float-menu">⋯</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceModal && selectedPrescription && (
        <div className="modal-overlay" onClick={() => setInvoiceModal(false)}>
          <div className="modal-content-invoice" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-invoice">
              <h3>LẬP HÓA ĐƠN</h3>
              <button className="btn-close" onClick={() => setInvoiceModal(false)}>✕</button>
            </div>
            <div className="modal-body-invoice">
              <div className="invoice-left">
                <div className="service-category">
                  <label>Dịch vụ</label>
                  <select className="category-select">
                    <option>Khám chữa bệnh</option>
                  </select>
                </div>
                <div className="service-list">
                  <table className="service-table">
                    <thead>
                      <tr>
                        <th>TÊN</th>
                        <th>ĐƠN GIÁ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Cắt móng</td><td>30,000</td></tr>
                      <tr><td>Dịch vụ 1</td><td>10,000</td></tr>
                      <tr><td>Dịch vụ 2</td><td>20,000</td></tr>
                      <tr><td>Siêu âm thai</td><td>70,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="invoice-right">
                <table className="invoice-items-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>HẠNG MỤC</th>
                      <th>SỐ LƯỢNG</th>
                      <th>ĐƠN GIÁ</th>
                      <th>GIẢM</th>
                      <th>TỔNG CỘNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrescription.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="item-category">{item.category}</div>
                          <div className="item-name">{item.name}</div>
                        </td>
                        <td><input type="number" defaultValue={item.quantity} className="qty-input" /></td>
                        <td><input type="text" defaultValue={formatCurrency(item.price)} className="price-input" /></td>
                        <td><input type="number" defaultValue={0} className="discount-input" /></td>
                        <td>{formatCurrency(item.price * item.quantity)}</td>
                        <td><button className="btn-remove-item">×</button></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="text-right">Tổng cộng:</td>
                      <td>{formatCurrency(selectedPrescription.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</td>
                      <td><button className="btn-add-item">⊕</button></td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="text-right">Tổng giảm:</td>
                      <td colSpan="2"><input type="text" defaultValue="0" className="total-discount-input" /></td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan="5" className="text-right">Số tiền thanh toán:</td>
                      <td colSpan="2" className="total-amount">{formatCurrency(selectedPrescription.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="invoice-sections">
                  <div className="notes-section">
                    <label>GHI CHÚ</label>
                    <textarea rows="4"></textarea>
                  </div>
                  <div className="payment-section">
                    <h4>THANH TOÁN</h4>
                    <div className="payment-info">
                      <div className="payment-row">
                        <label>Thanh toán khi lập HĐ:</label>
                      </div>
                      <div className="payment-row">
                        <label>Số tiền nhận :</label>
                        <input type="text" defaultValue={formatCurrency(selectedPrescription.items.reduce((sum, item) => sum + item.price * item.quantity, 0))} className="amount-received" />
                      </div>
                      <div className="payment-row">
                        <label>Trả lại :</label>
                        <span className="change-amount">-</span>
                      </div>
                      <div className="payment-row">
                        <label>Tài khoản nhận :</label>
                        <select>
                          <option>Tiền mặt</option>
                          <option>Chuyển khoản</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-invoice">
              <div className="invoice-date">
                <label>Ngày lập:</label>
                <input type="text" defaultValue={new Date().toLocaleString('vi-VN')} />
              </div>
              <div className="invoice-actions">
                <button className="btn-save">Lưu lại</button>
                <button className="btn-save-print">Lưu và In</button>
                <button className="btn-cancel" onClick={() => setInvoiceModal(false)}>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && selectedPrescription && (
        <div className="modal-overlay" onClick={() => setEditModal(false)}>
          <div className="modal-content-edit" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-edit">
              <h3>PHIẾU CHỈ ĐỊNH CLS</h3>
              <div className="modal-header-actions">
                <button className="btn-maximize">⛶</button>
                <button className="btn-close" onClick={() => setEditModal(false)}>✕</button>
              </div>
            </div>
            <div className="modal-body-edit">
              <div className="edit-left-panel">
                <div className="edit-form-header">
                  <h4>PHIẾU CHỈ ĐỊNH CLS</h4>
                  <div className="edit-code">Mã số: {selectedPrescription.id}</div>
                </div>
                <div className="edit-form">
                  <div className="form-row">
                    <label>Họ tên</label>
                    <span>: {selectedPrescription.customer.name}</span>
                    <label className="ml-4">Điện thoại</label>
                    <span>: {selectedPrescription.customer.phone}</span>
                  </div>
                  <div className="form-row">
                    <label>Vật nuôi</label>
                    <select className="pet-select">
                      <option value={selectedPrescription.pet.name}>{selectedPrescription.pet.name}</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Lâm sàng / Chẩn đoán</label>
                    <input type="text" defaultValue={selectedPrescription.clinical} />
                  </div>
                  <div className="form-row">
                    <label>Chuyển đến</label>
                    <input type="text" placeholder="Nơi xét nghiệm" defaultValue={selectedPrescription.transferTo} />
                  </div>
                  
                  <div className="test-items-section">
                    <div className="test-item-header">
                      <div className="item-number">01</div>
                      <div className="item-content">
                        <div className="item-category-title">Chẩn đoán hình ảnh</div>
                        <div className="item-name-title">Siêu âm thai</div>
                        <div className="item-notes">Yêu cầu / Ghi chú</div>
                      </div>
                      <button className="btn-remove">×</button>
                    </div>
                    <button className="btn-add-test">⊕</button>
                  </div>

                  <div className="form-row">
                    <label>Ngày hẹn:</label>
                    <input type="text" />
                  </div>
                  <div className="form-row">
                    <label>Lời dặn:</label>
                    <textarea rows="3"></textarea>
                  </div>
                </div>
                <div className="edit-footer-info">
                  <div className="creator-info">
                    <div>Ngày {new Date().getDate()} Tháng {new Date().getMonth() + 1} Năm {new Date().getFullYear()}</div>
                    <div className="creator-title">Người lập</div>
                    <div className="creator-name">Admin Phòng Khám</div>
                  </div>
                </div>
              </div>

              <div className="edit-right-panel">
                <div className="right-sections">
                  <div className="section disease-progress">
                    <div className="section-header">
                      <h4>Diễn tiến bệnh</h4>
                      <button className="btn-add-section">⊕</button>
                    </div>
                    <div className="section-content">
                      <div className="progress-item">
                        <div className="progress-date">26/09/2022</div>
                        <div className="progress-text">Thai bt</div>
                        <div className="progress-actions">
                          <button>✏️</button>
                          <button>×</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section file-management">
                    <div className="section-header">
                      <h4>Quản lý Files</h4>
                      <button className="btn-upload">☁️</button>
                    </div>
                    <div className="section-content empty">
                    </div>
                  </div>

                  <div className="section vital-signs">
                    <div className="section-header">
                      <h4>Sinh hiệu</h4>
                      <button className="btn-add-section">⊕</button>
                    </div>
                    <div className="section-content">
                      <div className="vital-item">
                        <div className="vital-date">27/02/2023</div>
                        <div className="vital-data">
                          <span>• Nhiệt độ:</span>
                          <span>• Nặng: 3.6 Kg</span>
                        </div>
                        <div className="vital-actions">
                          <button>✏️</button>
                          <button>×</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bottom-sections">
                  <div className="bottom-left">
                    <div className="history-section">
                      <h4>Lịch sử</h4>
                      <div className="history-item active">
                        <span>25/10/2023 18:27</span>
                        <span>📋</span>
                      </div>
                    </div>
                    <div className="group-section">
                      <h4>Nhóm</h4>
                      <ul className="group-list">
                        <li>Chẩn đoán hình ảnh</li>
                        <li>XN huyết học</li>
                        <li>XN sinh hóa</li>
                        <li>XN phân</li>
                        <li>XN nước tiểu</li>
                        <li>XN KST da</li>
                        <li>XN KST máu ( phết lam)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bottom-right">
                    <div className="category-section">
                      <h4>Danh mục</h4>
                      <div className="empty-message">Bạn chưa chọn Nhóm.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-edit">
              <div className="edit-date">
                <label>Ngày lập:</label>
                <span>{selectedPrescription.date}</span>
              </div>
              <div className="edit-actions">
                <button className="btn-update">Cập nhật</button>
                <button className="btn-save-print">Lưu và In</button>
                <button className="btn-cancel" onClick={() => setEditModal(false)}>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && selectedPrescription && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(false)}>
          <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa phiếu chỉ định <strong>{selectedPrescription.id}</strong>?</p>
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

export default PhieuChiDinh;