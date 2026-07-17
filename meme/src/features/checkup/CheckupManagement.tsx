// src/features/checkup/CheckupManagement.tsx
import React, { useState, useMemo } from 'react';
import CheckupTable from './CheckupTable';
import CheckupForm from './CheckupForm';
import CheckupDetail from './CheckupDetail';
import type { Checkup, CheckupFormData } from './types';
import { Stethoscope, Activity, Thermometer, Calendar } from 'lucide-react';

const mockCheckups: Checkup[] = [
  {
    maPhieuKham: 'PK001',
    maLichHen: 'LH001',
    maBacSi: 1,
    tenBacSi: 'BS. Lê Tấn',
    maBenhNhan: 1,
    tenBenhNhan: 'Nguyễn Văn A',
    tenChuNuoi: 'Nguyễn Văn A',
    tenThuCung: 'Mimi',
    loaiThuCung: 'Chó',
    trieuChung: 'Sốt cao, ho, bỏ ăn',
    chanDoan: 'Viêm đường hô hấp',
    canNangLucKham: 'Khám tổng quát',
    nhietDo: 40.5,
    ghiChu: 'Cần theo dõi nhiệt độ',
    ngayTaiKham: '2026-07-03',
    ngayTao: '2026-06-28',
    ketQua: 'Đang điều trị',
  },
  {
    maPhieuKham: 'PK002',
    maLichHen: 'LH002',
    maBacSi: 2,
    tenBacSi: 'BS. Phạm Hương',
    maBenhNhan: 2,
    tenBenhNhan: 'Trần Thị B',
    tenChuNuoi: 'Trần Thị B',
    tenThuCung: 'Tom',
    loaiThuCung: 'Mèo',
    trieuChung: 'Nôn mửa, tiêu chảy',
    chanDoan: 'Viêm dạ dày ruột',
    canNangLucKham: 'Khám chuyên sâu',
    nhietDo: 39.2,
    ngayTao: '2026-06-29',
    ketQua: 'Đã khỏi',
  },
  {
    maPhieuKham: 'PK003',
    maLichHen: 'LH003',
    maBacSi: 1,
    tenBacSi: 'BS. Lê Tấn',
    maBenhNhan: 3,
    tenBenhNhan: 'Lê Văn C',
    tenChuNuoi: 'Lê Văn C',
    tenThuCung: 'Kiki',
    loaiThuCung: 'Chim',
    trieuChung: 'Lông xơ xác, kém ăn',
    chanDoan: 'Suy dinh dưỡng',
    canNangLucKham: 'Khám tổng quát',
    nhietDo: 41.0,
    ghiChu: 'Cần bổ sung vitamin',
    ngayTaiKham: '2026-07-05',
    ngayTao: '2026-06-27',
  },
];

const CheckupManagement: React.FC = () => {
  const [checkups, setCheckups] = useState<Checkup[]>(mockCheckups);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCheckup, setSelectedCheckup] = useState<Checkup | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredCheckups = useMemo(() => {
    return checkups.filter(checkup => {
      const matchesSearch =
        checkup.maPhieuKham.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkup.tenBenhNhan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkup.tenThuCung.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkup.chanDoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkup.maLichHen.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDoctor = doctorFilter === 'all' || checkup.maBacSi.toString() === doctorFilter;
      
      const checkupDate = new Date(checkup.ngayTao);
      const matchesDateFrom = !dateFrom || checkupDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || checkupDate <= new Date(dateTo);

      return matchesSearch && matchesDoctor && matchesDateFrom && matchesDateTo;
    });
  }, [checkups, searchTerm, doctorFilter, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCheckups.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCheckups = filteredCheckups.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  // Stats
  const stats = {
    total: checkups.length,
    today: checkups.filter(c => c.ngayTao === new Date().toISOString().split('T')[0]).length,
    highFever: checkups.filter(c => c.nhietDo > 39.5).length,
    reexamination: checkups.filter(c => c.ngayTaiKham).length,
  };

  const handleCreate = (data: CheckupFormData) => {
    const newCheckup: Checkup = {
      ...data,
      maPhieuKham: `PK${String(checkups.length + 1).padStart(3, '0')}`,
      ngayTao: new Date().toISOString().split('T')[0],
    };
    setCheckups([...checkups, newCheckup]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleUpdate = (maPhieuKham: string, updates: Partial<Checkup>) => {
    const updated = checkups.map(c =>
      c.maPhieuKham === maPhieuKham
        ? { ...c, ...updates, ngayCapNhat: new Date().toISOString().split('T')[0] }
        : c
    );
    setCheckups(updated);
  };

  const handleView = (checkup: Checkup) => {
    setSelectedCheckup(checkup);
    setShowDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ KHÁM BỆNH</h1>
          <p className="text-gray-600 mt-1">Ghi nhận kết quả khám và chẩn đoán</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl flex items-center gap-2 font-medium shadow-lg shadow-rose-200"
        >
          <Stethoscope size={20} />
          + Tạo phiếu khám
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng phiếu khám</div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
              <Stethoscope size={24} className="text-rose-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Khám hôm nay</div>
              <div className="text-3xl font-bold text-blue-600">{stats.today}</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Sốt cao (&gt;39.5°C)</div>
              <div className="text-3xl font-bold text-red-600">{stats.highFever}</div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Thermometer size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Cần tái khám</div>
              <div className="text-3xl font-bold text-amber-600">{stats.reexamination}</div>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Tìm theo mã PK, mã LH, tên BN, thú cưng, chẩn đoán..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-rose-500"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <input
          type="date"
          placeholder="Từ ngày"
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
        />
        <input
          type="date"
          placeholder="Đến ngày"
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={doctorFilter}
          onChange={(e) => { setDoctorFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="all">Tất cả bác sĩ</option>
          <option value="1">BS. Lê Tấn</option>
          <option value="2">BS. Phạm Hương</option>
          <option value="3">BS. Trần Minh</option>
        </select>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Số lượng:</label>
          <select
            className="border border-gray-300 rounded-2xl px-4 py-3"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <CheckupTable
        checkups={paginatedCheckups}
        onView={handleView}
        onUpdate={handleUpdate}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={safeCurrentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40"
        >
          &lt;&lt; Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {safeCurrentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={safeCurrentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40"
        >
          Sau &gt;&gt;
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-auto">
            <CheckupForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedCheckup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-auto">
            <CheckupDetail
              checkup={selectedCheckup}
              onClose={() => setShowDetail(false)}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckupManagement;