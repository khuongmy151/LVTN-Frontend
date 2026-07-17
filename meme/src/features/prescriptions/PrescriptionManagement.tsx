// src/features/prescriptions/PrescriptionManagement.tsx
import React, { useState, useMemo } from 'react';
import PrescriptionTable from './PrescriptionTable';
import PrescriptionForm from './PrescriptionForm';
import PrescriptionDetail from './PrescriptionDetail';
import type { Prescription, PrescriptionFormData } from './types';
import { ClipboardList, Pill, TrendingUp, Users } from 'lucide-react';

const mockPrescriptions: Prescription[] = [
  {
    maDonThuoc: 'DT001',
    maPhieuKham: 'PK001',
    maBenhNhan: 1,
    tenBenhNhan: 'Nguyễn Văn A',
    tenChuNuoi: 'Nguyễn Văn A',
    tenThuCung: 'Mimi',
    loaiThuCung: 'Chó',
    maBacSi: 1,
    tenBacSi: 'BS. Lê Tấn',
    chanDoan: 'Viêm đường hô hấp',
    ghiChu: 'Theo dõi trong 3 ngày',
    ngayTao: '2026-06-28',
    tongTien: 210000,
    chiTietDonThuoc: [
      { id: 1, maThuoc: 1, tenThuoc: 'Amoxicillin 500mg', soLuong: 10, giaBan: 5000, lieuDung: '1 viên/lần', cachDung: 'Uống sau ăn, 2 lần/ngày', thanhTien: 50000 },
      { id: 2, maThuoc: 8, tenThuoc: 'Siro ho', soLuong: 2, giaBan: 45000, lieuDung: '5ml/lần', cachDung: 'Uống trực tiếp, 3 lần/ngày', thanhTien: 90000 },
      { id: 3, maThuoc: 5, tenThuoc: 'Vitamin C 500mg', soLuong: 10, giaBan: 2000, lieuDung: '1 viên/ngày', cachDung: 'Uống sau ăn sáng', thanhTien: 20000 },
    ],
  },
  {
    maDonThuoc: 'DT002',
    maPhieuKham: 'PK002',
    maBenhNhan: 2,
    tenBenhNhan: 'Trần Thị B',
    tenChuNuoi: 'Trần Thị B',
    tenThuCung: 'Tom',
    loaiThuCung: 'Mèo',
    maBacSi: 2,
    tenBacSi: 'BS. Phạm Hương',
    chanDoan: 'Viêm da dị ứng',
    ngayTao: '2026-06-29',
    tongTien: 175000,
    chiTietDonThuoc: [
      { id: 4, maThuoc: 2, tenThuoc: 'Paracetamol 500mg', soLuong: 5, giaBan: 3000, lieuDung: '1/2 viên/lần', cachDung: 'Uống khi đau, cách 6h', thanhTien: 15000 },
      { id: 5, maThuoc: 7, tenThuoc: 'Thuốc bôi da', soLuong: 1, giaBan: 35000, lieuDung: 'Bôi mỏng', cachDung: 'Bôi 2 lần/ngày', thanhTien: 35000 },
      { id: 6, maThuoc: 3, tenThuoc: 'Cefalexin 500mg', soLuong: 10, giaBan: 8000, lieuDung: '1 viên/lần', cachDung: 'Uống sau ăn, 2 lần/ngày', thanhTien: 80000 },
    ],
  },
  {
    maDonThuoc: 'DT003',
    maPhieuKham: 'PK003',
    maBenhNhan: 1,
    tenBenhNhan: 'Nguyễn Văn A',
    tenChuNuoi: 'Nguyễn Văn A',
    tenThuCung: 'Bông',
    loaiThuCung: 'Mèo',
    maBacSi: 1,
    tenBacSi: 'BS. Lê Tấn',
    chanDoan: 'Viêm kết mạc mắt',
    ngayTao: '2026-06-27',
    tongTien: 120000,
    chiTietDonThuoc: [
      { id: 7, maThuoc: 6, tenThuoc: 'Thuốc nhỏ mắt', soLuong: 1, giaBan: 50000, lieuDung: '2 giọt/mắt', cachDung: 'Nhỏ 3 lần/ngày', thanhTien: 50000 },
      { id: 8, maThuoc: 1, tenThuoc: 'Amoxicillin 500mg', soLuong: 10, giaBan: 5000, lieuDung: '1 viên/lần', cachDung: 'Uống sau ăn, 2 lần/ngày', thanhTien: 50000 },
    ],
  },
];

const PrescriptionManagement: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(pre => {
      const matchesSearch =
        pre.maDonThuoc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pre.tenBenhNhan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pre.tenThuCung.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pre.maPhieuKham.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pre.chanDoan.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDoctor = doctorFilter === 'all' || pre.maBacSi.toString() === doctorFilter;
      
      const preDate = new Date(pre.ngayTao);
      const matchesDateFrom = !dateFrom || preDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || preDate <= new Date(dateTo);

      return matchesSearch && matchesDoctor && matchesDateFrom && matchesDateTo;
    });
  }, [prescriptions, searchTerm, doctorFilter, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPrescriptions.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPrescriptions = filteredPrescriptions.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  // Stats
  const stats = {
    total: prescriptions.length,
    today: prescriptions.filter(p => p.ngayTao === new Date().toISOString().split('T')[0]).length,
    totalMedicines: prescriptions.reduce((sum, p) => sum + p.chiTietDonThuoc.length, 0),
    totalRevenue: prescriptions.reduce((sum, p) => sum + p.tongTien, 0),
  };

  const handleCreate = (data: PrescriptionFormData) => {
    const newPrescription: Prescription = {
      ...data,
      maDonThuoc: `DT${String(prescriptions.length + 1).padStart(3, '0')}`,
      tongTien: data.chiTietDonThuoc.reduce((sum, item) => sum + item.thanhTien, 0),
      ngayTao: new Date().toISOString().split('T')[0],
    };
    setPrescriptions([...prescriptions, newPrescription]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleView = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowDetail(true);
  };

  const handlePrint = (prescription: Prescription) => {
    alert(`In đơn thuốc ${prescription.maDonThuoc}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ ĐƠN THUỐC</h1>
          <p className="text-gray-600 mt-1">Kê đơn và quản lý thuốc điều trị</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl flex items-center gap-2 font-medium shadow-lg shadow-teal-200"
        >
          <ClipboardList size={20} />
          + Kê đơn thuốc
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng đơn thuốc</div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <ClipboardList size={24} className="text-teal-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Đơn hôm nay</div>
              <div className="text-3xl font-bold text-blue-600">{stats.today}</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Pill size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng thuốc đã kê</div>
              <div className="text-3xl font-bold text-purple-600">{stats.totalMedicines}</div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng doanh thu thuốc</div>
              <div className="text-2xl font-bold text-emerald-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)}
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Tìm theo mã đơn, tên BN, thú cưng, chẩn đoán..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-teal-500"
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
      <PrescriptionTable
        prescriptions={paginatedPrescriptions}
        onView={handleView}
        onPrint={handlePrint}
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
            <PrescriptionForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedPrescription && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-auto">
            <PrescriptionDetail
              prescription={selectedPrescription}
              onClose={() => setShowDetail(false)}
              onPrint={handlePrint}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionManagement;