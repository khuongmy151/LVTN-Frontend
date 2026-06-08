import React, { useState } from 'react';
import { mockData } from '../../data/mockData';

function KhachHang() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState(mockData.customers);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Quản lý Khách hàng</h2>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Thêm khách hàng
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Số vật nuôi</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.pets}</td>
              <td>
                <button className="btn-sm btn-edit">Sửa</button>
                <button className="btn-sm btn-delete" onClick={() => handleDelete(customer.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm khách hàng mới</h3>
            <form>
              <div className="form-group">
                <label>Họ tên</label>
                <input type="text" placeholder="Nhập họ tên" />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Nhập email" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Hủy
                </button>
                <button type="button" className="btn-primary">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default KhachHang;