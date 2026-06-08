import React from 'react';

function ThongKeTongHop() {
  const stats = {
    totalRevenue: 45000000,
    totalExpense: 12000000,
    totalCustomers: 156,
    totalAppointments: 89,
    totalPrescriptions: 234,
    totalInvoices: 178,
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Thống kê tổng hợp</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card-large green">
          <div className="stat-label">Doanh thu</div>
          <div className="stat-value">{stats.totalRevenue.toLocaleString()} đ</div>
        </div>
        <div className="stat-card-large red">
          <div className="stat-label">Chi phí</div>
          <div className="stat-value">{stats.totalExpense.toLocaleString()} đ</div>
        </div>
        <div className="stat-card-large blue">
          <div className="stat-label">Khách hàng</div>
          <div className="stat-value">{stats.totalCustomers}</div>
        </div>
        <div className="stat-card-large orange">
          <div className="stat-label">Lịch hẹn</div>
          <div className="stat-value">{stats.totalAppointments}</div>
        </div>
        <div className="stat-card-large purple">
          <div className="stat-label">Đơn thuốc</div>
          <div className="stat-value">{stats.totalPrescriptions}</div>
        </div>
        <div className="stat-card-large teal">
          <div className="stat-label">Hóa đơn</div>
          <div className="stat-value">{stats.totalInvoices}</div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Biểu đồ doanh thu theo tháng</h3>
        <div className="chart-placeholder">
          <div className="bar-chart">
            {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 88].map((h, i) => (
              <div key={i} className="bar" style={{ height: `${h}%` }}>
                <span>{h}%</span>
              </div>
            ))}
          </div>
          <div className="bar-labels">
            {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThongKeTongHop;