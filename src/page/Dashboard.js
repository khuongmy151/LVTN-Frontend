import React, { useState } from 'react';
import { FaUsers, FaFolderOpen, FaFileInvoice } from 'react-icons/fa';
import { mockData } from '../data/mockData';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('don-thuoc');

  const tabs = [
    { key: 'don-thuoc', label: 'Đơn thuốc' },
    { key: 'phieu-chi-dinh', label: 'Phiếu chỉ định' },
    { key: 'hoa-don', label: 'Hóa đơn' },
  ];

  const filteredActivities = mockData.recentActivities.filter(
    (a) => a.type === activeTab || activeTab === 'don-thuoc'
  );

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon green">
            <FaUsers size={28} />
          </div>
          <div className="stat-info">
            <div className="stat-value">
              {mockData.stats.customers.today} / {mockData.stats.customers.total}
            </div>
            <div className="stat-label">Khách hàng</div>
            <div className="stat-sublabel">Hôm nay</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <FaFolderOpen size={28} />
          </div>
          <div className="stat-info">
            <div className="stat-value">
              {mockData.stats.prescriptions.today} / {mockData.stats.prescriptions.total}
            </div>
            <div className="stat-label">Phiếu chỉ định CLS</div>
            <div className="stat-sublabel">Hôm nay</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <FaFolderOpen size={28} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{mockData.stats.invoices.today}</div>
            <div className="stat-label">Hóa đơn</div>
            <div className="stat-sublabel">Hôm nay</div>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        {/* Expiring Drugs Table */}
        <div className="expiring-drugs-section">
          <div className="section-header">
            <h3>Các lô thuốc sẽ hết hạn trong 60 ngày tới</h3>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>TÊN THUỐC / VẬT TƯ</th>
                  <th>HẠN SỬ DỤNG</th>
                  <th>SL TỒN</th>
                  <th>ĐVT</th>
                  <th>NGÀY NHẬP</th>
                  <th>MÃ PHIẾU NHẬP</th>
                  <th>MÃ LÔ</th>
                </tr>
              </thead>
              <tbody>
                {mockData.expiringDrugs.map((drug) => (
                  <tr key={drug.id}>
                    <td>{drug.id}</td>
                    <td>{drug.name}</td>
                    <td className="expiry-date">{drug.expiry}</td>
                    <td>{drug.stock}</td>
                    <td>{drug.unit}</td>
                    <td>{drug.importDate}</td>
                    <td>
                      {drug.importCode}
                      <span className="import-icon">📋</span>
                    </td>
                    <td>{drug.batchCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities Sidebar */}
        <div className="activities-section">
          <div className="activities-header">
            <h3>Các hoạt động mới nhất</h3>
          </div>
          <div className="activity-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="activity-list">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-id">{activity.id}</div>
                <div className="activity-customer">
                  {activity.customer} ({activity.customerCode})
                </div>
                {activity.note && (
                  <div className="activity-note">{activity.note}</div>
                )}
                <div className="activity-footer">
                  <span className="activity-date">{activity.date}</span>
                  <span className="activity-detail">🔍 Chi tiết</span>
                  <span className="activity-staff">{activity.staff}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-item">
          <FaUsers size={20} />
          <span>Khách hàng</span>
        </div>
        <div className="bottom-nav-item">
          <span style={{ fontSize: '20px' }}></span>
          <span>Vật nuôi</span>
        </div>
        <div className="bottom-nav-item">
          <FaFileInvoice size={20} />
          <span>Hóa đơn</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;