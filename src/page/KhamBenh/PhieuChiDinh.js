import React, { useState } from 'react';

function PhieuChiDinh() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 'PCD001', customer: 'Nguyễn Văn A', pet: 'Miu', date: '25/10/2023', items: ['Xét nghiệm máu', 'Siêu âm'], status: 'Hoàn thành' },
    { id: 'PCD002', customer: 'Trần Thị B', pet: 'Vàng', date: '25/10/2023', items: ['Chụp X-quang'], status: 'Đang thực hiện' },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Phiếu chỉ định CLS</h2>
        <button className="btn-primary">+ Tạo phiếu chỉ định</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Khách hàng</th>
            <th>Vật nuôi</th>
            <th>Ngày</th>
            <th>Hạng mục</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.customer}</td>
              <td>{p.pet}</td>
              <td>{p.date}</td>
              <td>{p.items.join(', ')}</td>
              <td>
                <span className={`status-badge ${p.status === 'Hoàn thành' ? 'confirmed' : 'pending'}`}>
                  {p.status}
                </span>
              </td>
              <td>
                <button className="btn-sm btn-edit">Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PhieuChiDinh;