import React, { useState } from 'react';

function PhieuThuChi() {
  const [vouchers, setVouchers] = useState([
    { id: 'PTC001', type: 'Thu', customer: 'Nguyễn Văn A', amount: 500000, date: '25/10/2023', note: 'Thanh toán hóa đơn' },
    { id: 'PTC002', type: 'Chi', customer: '-', amount: 200000, date: '25/10/2023', note: 'Mua vật tư' },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Phiếu Thu Chi</h2>
        <button className="btn-primary">+ Tạo phiếu</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Loại</th>
            <th>Khách hàng</th>
            <th>Số tiền</th>
            <th>Ngày</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>
                <span className={`type-badge ${v.type === 'Thu' ? 'income' : 'expense'}`}>
                  {v.type}
                </span>
              </td>
              <td>{v.customer}</td>
              <td>{v.amount.toLocaleString()} đ</td>
              <td>{v.date}</td>
              <td>{v.note}</td>
              <td>
                <button className="btn-sm btn-edit">Sửa</button>
                <button className="btn-sm btn-delete">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PhieuThuChi;