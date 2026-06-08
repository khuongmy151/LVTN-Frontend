import React, { useState } from 'react';
import { mockData } from '../../data/mockData';

function ThuocVatTu() {
  const [drugs, setDrugs] = useState(mockData.drugs);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = drugs.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Thuốc & Vật tư</h2>
        <button className="btn-primary">+ Thêm thuốc</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm thuốc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên thuốc</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>ĐVT</th>
            <th>Giá</th>
            <th>Hạn sử dụng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((drug) => (
            <tr key={drug.id}>
              <td>{drug.id}</td>
              <td>{drug.name}</td>
              <td>{drug.category}</td>
              <td>{drug.stock}</td>
              <td>{drug.unit}</td>
              <td>{drug.price.toLocaleString()} đ</td>
              <td className="expiry-date">{drug.expiry}</td>
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

export default ThuocVatTu;