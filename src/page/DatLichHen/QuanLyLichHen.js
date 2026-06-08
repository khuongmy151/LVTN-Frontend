import React, { useState } from 'react';
import { mockData } from '../../data/mockData';

function QuanLyLichHen() {
  const [appointments, setAppointments] = useState(mockData.appointments);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = filterStatus === 'all'
    ? appointments
    : appointments.filter((a) => a.status === filterStatus);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Quản lý Lịch hẹn</h2>
        <button className="btn-primary">+ Tạo lịch hẹn</button>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Tất cả
        </button>
        <button
          className={`filter-btn ${filterStatus === 'Đã xác nhận' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Đã xác nhận')}
        >
          Đã xác nhận
        </button>
        <button
          className={`filter-btn ${filterStatus === 'Chờ xác nhận' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Chờ xác nhận')}
        >
          Chờ xác nhận
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Vật nuôi</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Dịch vụ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((apt) => (
            <tr key={apt.id}>
              <td>{apt.id}</td>
              <td>{apt.customer}</td>
              <td>{apt.pet}</td>
              <td>{apt.date}</td>
              <td>{apt.time}</td>
              <td>{apt.service}</td>
              <td>
                <span className={`status-badge ${apt.status === 'Đã xác nhận' ? 'confirmed' : 'pending'}`}>
                  {apt.status}
                </span>
              </td>
              <td>
                <button className="btn-sm btn-edit">Sửa</button>
                <button className="btn-sm btn-delete">Hủy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuanLyLichHen;