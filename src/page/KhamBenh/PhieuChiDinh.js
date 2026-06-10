import React, { useState } from 'react';

function PhieuChiDinh() {
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 'XN230227029', 
      pet: { name: 'gạo', code: 'PE220531010', type: 'Mèo (Cat)', age: '7' },
      customer: { name: 'Phạm Anh Trân', code: 'BN220531004', phone: '09128574712857' },
      clinical: '',
      creator: 'BS. An',
      date: '25/10/2023 18:27',
      testResults: '1 / 1',
      status: 'completed'
    },
    { 
      id: 'XN230227028', 
      pet: { name: 'milo', code: 'PE220708010', type: 'Chó (Dog) - Poodle', age: '4 tuổi 1 tháng' },
      customer: { name: 'Tào Tùng Quân', code: 'BN220708004', phone: '' },
      clinical: '',
      creator: 'BS. An',
      date: '25/10/2023 17:57',
      testResults: '0 / 0',
      status: 'pending'
    },
    { 
      id: 'XN230227027', 
      pet: { name: 'Đen Mẹ', code: 'PE230227010', type: 'Chó (Dog) - Foxhound', age: '3 tuổi 3 tháng' },
      customer: { name: 'Vũ Thành Công', code: 'BN150107470', phone: '' },
      clinical: '',
      creator: 'BS. Bình',
      date: '25/10/2023 17:47',
      testResults: '1 / 1',
      status: 'completed'
    },
    { 
      id: 'XN230227026', 
      pet: { name: 'Đen Mẹ', code: 'PE230227010', type: 'Chó (Dog) - Foxhound', age: '3 tuổi 3 tháng' },
      customer: { name: 'Vũ Thành Công', code: 'BN150107470', phone: '' },
      clinical: '',
      creator: 'BS. An',
      date: '25/10/2023 17:44',
      testResults: '1 / 1',
      status: 'completed'
    },
    { 
      id: 'XN230227025', 
      pet: { name: 'Đen Mẹ', code: 'PE230227010', type: 'Chó (Dog) - Foxhound', age: '3 tuổi 3 tháng' },
      customer: { name: 'Vũ Thành Công', code: 'BN150107470', phone: '' },
      clinical: '',
      creator: 'BS. Bình',
      date: '25/10/2023 17:35',
      testResults: '1 / 1',
      status: 'completed'
    },
    { 
      id: 'XN230227024', 
      pet: { name: 'Kiki', code: 'PE230227009', type: 'Chó (Dog) - Việt Nam', age: '' },
      customer: { name: 'Bùi Mạnh Hùng', code: 'BN220727001', phone: '' },
      clinical: '',
      creator: 'BS. Bình',
      date: '25/10/2023 16:42',
      testResults: '0 / 0',
      status: 'pending'
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

  const toggleRow = (id) => {
    setExpandedRows(expandedRows.includes(id) 
      ? expandedRows.filter(rowId => rowId !== id)
      : [...expandedRows, id]
    );
  };

  const handleView = (id) => {
    console.log('View:', id);
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
                    <button className="btn-icon btn-view" onClick={() => handleView(p.id)}>📋</button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon btn-print-small" onClick={() => handlePrint(p.id)}>🖨️</button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon btn-invoice" onClick={() => handleCreateInvoice(p.id)}>📄</button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon btn-edit-small" onClick={() => handleEdit(p.id)}>✏️</button>
                  </td>
                  <td className="action-cell">
                    <button className="btn-icon btn-delete-small" onClick={() => handleDelete(p.id)}>🗑️</button>
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
    </div>
  );
}

export default PhieuChiDinh;