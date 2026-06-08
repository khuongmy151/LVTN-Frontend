import React, { useState } from 'react';

function DonThuocPage() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 'DT230227096', customer: 'Hoàng Chiến Thắng', code: '#BN150101723', date: '25/10/2023 19:14', staff: 'Nhân viên quầy 1', drugs: ['Vinphyton x2', 'Duphalac x1'] },
    { id: 'DT230227095', customer: 'Đỗ Anh Trần', code: '#BN220802002', date: '25/10/2023 18:54', staff: 'BS. Bình', drugs: ['Advocate x1'], note: 'Cắt chỉ' },
    { id: 'DT230227094', customer: 'Phùng Đình Trung', code: '#BN150107202', date: '25/10/2023 18:47', staff: 'BS. Bình', drugs: ['VITAMIN K-1 x3'], note: 'Nhiễm erichias spp' },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Đơn thuốc</h2>
        <button className="btn-primary">+ Tạo đơn thuốc</button>
      </div>

      <div className="prescription-list">
        {prescriptions.map((p) => (
          <div key={p.id} className="prescription-card">
            <div className="prescription-header">
              <span className="prescription-id">{p.id}</span>
              <span className="prescription-date">{p.date}</span>
            </div>
            <div className="prescription-customer">
              {p.customer} ({p.code})
            </div>
            {p.note && <div className="prescription-note">- {p.note}</div>}
            <div className="prescription-drugs">
              <strong>Thuốc:</strong> {p.drugs.join(', ')}
            </div>
            <div className="prescription-footer">
              <span>{p.staff}</span>
              <button className="btn-sm btn-edit">Chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonThuocPage;