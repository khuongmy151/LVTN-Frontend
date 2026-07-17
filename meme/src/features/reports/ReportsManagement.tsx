// src/features/reports/ReportsManagement.tsx
import React, { useState, useMemo } from 'react';
import type {
  StatCard,
  ChartDataPoint,
  MedicineUsage,
  TimeRange,
  VisitRecord,
} from './types';
import VisitReportModal from './VisitReportModal';
import RevenueReportModal from './RevenueReportModal';
import NewPetsModal from './NewPetsModal';

// ============ MOCK DATA CHI TIẾT ============
const allVisits: VisitRecord[] = [
  { id: 1, customerName: 'Đại Ca', petName: 'Pessi', species: 'Chó', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-06-29', revenue: 400000 },
  { id: 2, customerName: 'Đại Tỷ', petName: 'Meo', species: 'Mèo', status: 'Mới', doctor: 'BS. Lê Tấn', date: '2026-06-29', revenue: 3200000 },
  { id: 3, customerName: 'Nguyễn Văn A', petName: 'Buddy', species: 'Chó', status: 'Tái khám', doctor: 'BS. Minh', date: '2026-06-29', revenue: 850000 },
  { id: 4, customerName: 'Trần Thị B', petName: 'Miu', species: 'Mèo', status: 'Mới', doctor: 'BS. Lê Tấn', date: '2026-06-28', revenue: 1500000 },
  { id: 5, customerName: 'Lê Văn C', petName: 'Coco', species: 'Chó', status: 'Mới', doctor: 'BS. Minh', date: '2026-06-28', revenue: 600000 },
  { id: 6, customerName: 'Phạm Thị D', petName: 'Lucky', species: 'Khác', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-06-27', revenue: 750000 },
  { id: 7, customerName: 'Hoàng Văn E', petName: 'Max', species: 'Chó', status: 'Mới', doctor: 'BS. Minh', date: '2026-06-25', revenue: 900000 },
  { id: 8, customerName: 'Vũ Thị F', petName: 'Nala', species: 'Mèo', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-06-20', revenue: 500000 },
  { id: 9, customerName: 'Đặng Văn G', petName: 'Simba', species: 'Chó', status: 'Mới', doctor: 'BS. Minh', date: '2026-06-15', revenue: 1200000 },
  { id: 10, customerName: 'Bùi Thị H', petName: 'Luna', species: 'Mèo', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-06-10', revenue: 450000 },
  { id: 11, customerName: 'Ngô Văn I', petName: 'Rocky', species: 'Chó', status: 'Mới', doctor: 'BS. Minh', date: '2026-05-28', revenue: 800000 },
  { id: 12, customerName: 'Dương Thị K', petName: 'Bella', species: 'Mèo', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-05-15', revenue: 550000 },
  { id: 13, customerName: 'Lý Văn L', petName: 'Charlie', species: 'Chó', status: 'Mới', doctor: 'BS. Minh', date: '2026-04-20', revenue: 1100000 },
  { id: 14, customerName: 'Trịnh Thị M', petName: 'Daisy', species: 'Mèo', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-03-10', revenue: 650000 },
  { id: 15, customerName: 'Phan Văn N', petName: 'Duke', species: 'Chó', status: 'Mới', doctor: 'BS. Minh', date: '2026-02-14', revenue: 950000 },
  { id: 16, customerName: 'Tôn Thị O', petName: 'Molly', species: 'Mèo', status: 'Tái khám', doctor: 'BS. Lê Tấn', date: '2026-01-25', revenue: 400000 },
];

const allMedicines: MedicineUsage[] = [
  { id: 1, name: 'Phanadol', quantity: 450, date: '2026-06-29' },
  { id: 2, name: 'Amoxicillin', quantity: 380, date: '2026-06-29' },
  { id: 3, name: 'Ivermectin', quantity: 320, date: '2026-06-28' },
  { id: 4, name: 'Dexamethasone', quantity: 280, date: '2026-06-28' },
  { id: 5, name: 'Vitamin B Complex', quantity: 250, date: '2026-06-27' },
  { id: 6, name: 'Cephalexin', quantity: 210, date: '2026-06-25' },
  { id: 7, name: 'Metronidazole', quantity: 180, date: '2026-06-20' },
  { id: 8, name: 'Phanadol', quantity: 120, date: '2026-06-15' },
  { id: 9, name: 'Amoxicillin', quantity: 90, date: '2026-06-10' },
  { id: 10, name: 'Ivermectin', quantity: 80, date: '2026-05-28' },
  { id: 11, name: 'Dexamethasone', quantity: 70, date: '2026-05-15' },
  { id: 12, name: 'Vitamin B Complex', quantity: 60, date: '2026-04-20' },
  { id: 13, name: 'Cephalexin', quantity: 50, date: '2026-03-10' },
  { id: 14, name: 'Metronidazole', quantity: 40, date: '2026-02-14' },
  { id: 15, name: 'Phanadol', quantity: 30, date: '2026-01-25' },
];

const mockVisitChart: ChartDataPoint[] = [
  { label: 'T1', value: 120 },
  { label: 'T2', value: 95 },
  { label: 'T3', value: 180 },
  { label: 'T4', value: 220 },
  { label: 'T5', value: 321 },
  { label: 'T6', value: 275 },
  { label: 'T7', value: 190 },
  { label: 'T8', value: 240 },
  { label: 'T9', value: 160 },
  { label: 'T10', value: 200 },
  { label: 'T11', value: 280 },
  { label: 'T12', value: 310 },
];

const mockRevenueChart: ChartDataPoint[] = [
  { label: 'T1', value: 85 },
  { label: 'T2', value: 72 },
  { label: 'T3', value: 110 },
  { label: 'T4', value: 145 },
  { label: 'T5', value: 182 },
  { label: 'T6', value: 160 },
  { label: 'T7', value: 125 },
  { label: 'T8', value: 155 },
  { label: 'T9', value: 98 },
  { label: 'T10', value: 130 },
  { label: 'T11', value: 175 },
  { label: 'T12', value: 195 },
];

// ============ HELPER FUNCTIONS ============
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const formatDateFull = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `Ngày ${day} Tháng ${month} Năm ${year}`;
};

// ============ COMPONENT ============
const ReportsManagement: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    from: '2026-01-01',
    to: '2026-06-29',
    type: 'year',
  });
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showNewPetsModal, setShowNewPetsModal] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Quick filter buttons
  const handleQuickFilter = (type: 'day' | 'month' | 'year') => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    let from = '';
    
    if (type === 'day') {
      from = todayStr;
    } else if (type === 'month') {
      from = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    } else {
      from = `${now.getFullYear()}-01-01`;
    }

    setTimeRange({ from, to: todayStr, type });
  };

  // Lọc dữ liệu theo timeRange
  const filteredVisits = useMemo(() => {
    return allVisits.filter(visit => {
      const visitDate = new Date(visit.date);
      const fromDate = new Date(timeRange.from);
      const toDate = new Date(timeRange.to);
      return visitDate >= fromDate && visitDate <= toDate;
    });
  }, [timeRange]);

  const filteredMedicines = useMemo(() => {
    return allMedicines.filter(med => {
      const medDate = new Date(med.date);
      const fromDate = new Date(timeRange.from);
      const toDate = new Date(timeRange.to);
      return medDate >= fromDate && medDate <= toDate;
    });
  }, [timeRange]);

  // Tính toán thống kê động
  const visitCount = filteredVisits.length;
  const totalRevenue = filteredVisits.reduce((sum, v) => sum + (v.revenue || 0), 0);
  const newPetsCount = filteredVisits.filter(v => v.status === 'Mới').length;
  
  // Tính thuốc sử dụng nhiều nhất
  const medicineStats = useMemo(() => {
    const stats: Record<string, number> = {};
    filteredMedicines.forEach(med => {
      stats[med.name] = (stats[med.name] || 0) + med.quantity;
    });
    return Object.entries(stats)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity);
  }, [filteredMedicines]);

  const topMedicine = medicineStats.length > 0 ? medicineStats[0] : null;

  // Scroll to medicines table
  const scrollToMedicines = () => {
    const medicinesTable = document.getElementById('medicines-table');
    if (medicinesTable) {
      medicinesTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const maxVisit = Math.max(...mockVisitChart.map((d) => d.value));
  const maxRevenue = Math.max(...mockRevenueChart.map((d) => d.value));
  
  const filteredVisitChart = useMemo(() => {
    if (timeRange.type === 'month') return mockVisitChart.slice(0, 30);
    if (timeRange.type === 'day') return mockVisitChart.slice(0, 24);
    return mockVisitChart;
  }, [timeRange.type]);
  
  const filteredRevenueChart = useMemo(() => {
    if (timeRange.type === 'month') return mockRevenueChart.slice(0, 30);
    if (timeRange.type === 'day') return mockRevenueChart.slice(0, 24);
    return mockRevenueChart;
  }, [timeRange.type]);

  const formatMoney = (n: number) => {
    if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)} tỷ`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)} triệu`;
    return n.toLocaleString('vi-VN');
  };

  const mockStats: StatCard[] = [
    { label: 'Lượt khám', value: visitCount, clickable: true, modalType: 'visits' },
    { label: 'Doanh thu', value: formatMoney(totalRevenue), clickable: true, modalType: 'revenue' },
    { label: 'Thú cưng mới tới khám', value: newPetsCount, clickable: true, modalType: 'newPets' },
    { label: 'Thuốc được sử dụng nhiều nhất', value: topMedicine?.name || 'N/A', clickable: true, modalType: 'medicines' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          BÁO CÁO THỐNG KÊ
        </h1>
        <p className="text-gray-600 mt-1">
          Tổng quan hoạt động phòng khám thú y
        </p>
      </div>

      {/* Time filter */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Từ</label>
            <input
              type="date"
              value={timeRange.from}
              onChange={(e) =>
                setTimeRange({ ...timeRange, from: e.target.value, type: 'custom' })
              }
              className="border border-gray-300 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
            />
            <span className="text-sm text-gray-500">({formatDateFull(timeRange.from)})</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Đến</label>
            <input
              type="date"
              value={timeRange.to}
              onChange={(e) =>
                setTimeRange({ ...timeRange, to: e.target.value, type: 'custom' })
              }
              className="border border-gray-300 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
            />
            <span className="text-sm text-gray-500">({formatDateFull(timeRange.to)})</span>
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => handleQuickFilter('day')}
              className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-colors ${
                timeRange.type === 'day'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => handleQuickFilter('month')}
              className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-colors ${
                timeRange.type === 'month'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tháng hiện tại
            </button>
            <button
              onClick={() => handleQuickFilter('year')}
              className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-colors ${
                timeRange.type === 'year'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Năm hiện tại
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (stat.clickable && stat.modalType === 'visits') setShowVisitModal(true);
              if (stat.clickable && stat.modalType === 'revenue') setShowRevenueModal(true);
              if (stat.clickable && stat.modalType === 'newPets') setShowNewPetsModal(true);
              if (stat.clickable && stat.modalType === 'medicines') scrollToMedicines();
            }}
            className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-6 ${
              stat.clickable ? 'cursor-pointer hover:shadow-md hover:border-blue-200 transition-all' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              {stat.clickable && (
                <span className="text-blue-600 text-xl">→</span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-lg text-gray-600 font-medium">
                  {stat.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart - Lượt khám */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-red-600 mb-6">Lượt khám</h2>
          <div className="relative h-72">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium">
              Số lượt khám
            </div>

            <div className="ml-8 h-full flex items-end gap-2 border-b border-l border-gray-200 pb-2 pl-2">
              {filteredVisitChart.map((point, idx) => {
                const height = (point.value / maxVisit) * 100;
                const isHovered = hoveredBar === idx;
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end relative"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {isHovered && (
                      <div className="absolute -top-14 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10">
                        <div className="font-semibold">{point.label}</div>
                        <div>{point.value} lượt</div>
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isHovered ? 'bg-red-500' : 'bg-red-400'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="ml-8 flex gap-2 mt-2">
              {filteredVisitChart.map((point, idx) => (
                <div key={idx} className="flex-1 text-center text-xs text-gray-500">
                  {point.label}
                </div>
              ))}
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">Thời gian →</div>
          </div>
        </div>

        {/* Line chart - Doanh thu */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-red-600 mb-6">Doanh thu</h2>
          <div className="relative h-72">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium">
              Triệu
            </div>

            <div className="ml-8 h-full relative border-b border-l border-gray-200">
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox={`0 0 ${filteredRevenueChart.length} 100`}
              >
                <polyline
                  points={filteredRevenueChart
                    .map((p, i) => {
                      const x = i + 0.5;
                      const y = 100 - (p.value / maxRevenue) * 100;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
                {filteredRevenueChart.map((p, i) => {
                  const x = i + 0.5;
                  const y = 100 - (p.value / maxRevenue) * 100;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="0.8"
                      fill="#dc2626"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {filteredRevenueChart.map((point, idx) => {
                const left = ((idx + 0.5) / filteredRevenueChart.length) * 100;
                const top = 100 - (point.value / maxRevenue) * 100;
                const isHovered = hoveredPoint === idx;
                return (
                  <div
                    key={idx}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow" />
                    {isHovered && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10">
                        <div className="font-semibold">Ví dụ: {point.label}</div>
                        <div>{point.value} triệu đồng</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="ml-8 flex gap-2 mt-2">
              {filteredRevenueChart.map((point, idx) => (
                <div key={idx} className="flex-1 text-center text-xs text-gray-500">
                  {point.label}
                </div>
              ))}
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">Thời gian →</div>
          </div>
        </div>
      </div>

      {/* Top medicines table */}
      <div id="medicines-table" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Thuốc được sử dụng nhiều nhất
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên thuốc
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Số lượng đã dùng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {medicineStats.map((med, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {med.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {med.quantity.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showVisitModal && (
        <VisitReportModal
          timeRange={timeRange}
          visits={filteredVisits}
          onClose={() => setShowVisitModal(false)}
        />
      )}
      {showRevenueModal && (
        <RevenueReportModal
          timeRange={timeRange}
          visits={filteredVisits}
          onClose={() => setShowRevenueModal(false)}
        />
      )}
      {showNewPetsModal && (
        <NewPetsModal
          timeRange={timeRange}
          visits={filteredVisits.filter(v => v.status === 'Mới')}
          onClose={() => setShowNewPetsModal(false)}
        />
      )}
    </div>
  );
};

export default ReportsManagement;