import React, { useState } from 'react';
import { mockData } from '../../data/mockData';

function HoaDonPage() {
  const [invoices, setInvoices] = useState(mockData.invoices);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Quản lý Hóa đơn</h2>
        <button className="btn-primary">+ Tạo hóa đơn</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Mã HĐ</th>
            <th>Khách hàng</th>
            <th>Ngày</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer}</td>
              <td>{inv.date}</td>
              <td>{inv.total.toLocaleString()} đ</td>
              <td>
                <span className={`status-badge ${inv.status === 'Đã thanh toán' ? 'confirmed' : 'pending'}`}>
                  {inv.status}
                </span>
              </td>
              <td>
                <button className="btn-sm btn-edit">Chi tiết</button>
                <button className="btn-sm btn-delete">In</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HoaDonPage;