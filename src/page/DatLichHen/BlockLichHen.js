import React, { useState } from 'react';

function BlockLichHen() {
  const [blocks, setBlocks] = useState([
    { id: 1, date: '2023-10-26', startTime: '12:00', endTime: '13:00', reason: 'Nghỉ trưa' },
    { id: 2, date: '2023-10-27', startTime: '17:00', endTime: '18:00', reason: 'Họp' },
  ]);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Block Lịch hẹn</h2>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          + Thêm block
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ kết thúc</th>
            <th>Lý do</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.id}>
              <td>{block.id}</td>
              <td>{block.date}</td>
              <td>{block.startTime}</td>
              <td>{block.endTime}</td>
              <td>{block.reason}</td>
              <td>
                <button className="btn-sm btn-delete" onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm Block lịch hẹn</h3>
            <form>
              <div className="form-group">
                <label>Ngày</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Giờ bắt đầu</label>
                <input type="time" />
              </div>
              <div className="form-group">
                <label>Giờ kết thúc</label>
                <input type="time" />
              </div>
              <div className="form-group">
                <label>Lý do</label>
                <input type="text" placeholder="Nhập lý do" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAdd(false)}>Hủy</button>
                <button type="button" className="btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockLichHen;