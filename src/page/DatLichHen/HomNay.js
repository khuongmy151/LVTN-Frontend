import React from 'react';
import { mockData } from '../../data/mockData';

function HomNay() {
  const todayAppointments = mockData.appointments.filter(
    (a) => a.date === '2023-10-25'
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Lịch hẹn hôm nay</h2>
        <button className="btn-primary">+ Tạo lịch hẹn</button>
      </div>

      <div className="appointment-cards">
        {todayAppointments.map((apt) => (
          <div key={apt.id} className="appointment-card">
            <div className="apt-time">{apt.time}</div>
            <div className="apt-info">
              <div className="apt-customer">{apt.customer}</div>
              <div className="apt-pet">Vật nuôi: {apt.pet}</div>
              <div className="apt-service">Dịch vụ: {apt.service}</div>
            </div>
            <div className={`apt-status ${apt.status === 'Đã xác nhận' ? 'confirmed' : 'pending'}`}>
              {apt.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomNay;