import React, { useState } from 'react';
import { mockData } from '../../data/mockData';

function VatNuoi() {
  const [pets, setPets] = useState(mockData.pets);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id) => {
    setPets(pets.filter((p) => p.id !== id));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Quản lý Vật nuôi</h2>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Thêm vật nuôi
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Loài</th>
            <th>Giống</th>
            <th>Tuổi</th>
            <th>Chủ sở hữu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.breed}</td>
              <td>{pet.age}</td>
              <td>{pet.owner}</td>
              <td>
                <button className="btn-sm btn-edit">Sửa</button>
                <button className="btn-sm btn-delete" onClick={() => handleDelete(pet.id)}>
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
            <h3>Thêm vật nuôi mới</h3>
            <form>
              <div className="form-group">
                <label>Tên vật nuôi</label>
                <input type="text" placeholder="Nhập tên" />
              </div>
              <div className="form-group">
                <label>Loài</label>
                <select>
                  <option>Chó</option>
                  <option>Mèo</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="form-group">
                <label>Giống</label>
                <input type="text" placeholder="Nhập giống" />
              </div>
              <div className="form-group">
                <label>Tuổi</label>
                <input type="text" placeholder="Nhập tuổi" />
              </div>
              <div className="form-group">
                <label>Chủ sở hữu</label>
                <input type="text" placeholder="Nhập tên chủ" />
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

export default VatNuoi;