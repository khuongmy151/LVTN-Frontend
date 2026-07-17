// src/features/billing/BillingManagement.tsx
import React, { useState, useMemo } from 'react';
import BillingTable from './BillingTable';
import BillingForm from './BillingForm';
import BillingDetail from './BillingDetail';
import type { Invoice, InvoiceFormData, InvoiceStatus, PaymentMethod } from './types';
import { Receipt, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const mockInvoices: Invoice[] = [
  {
    maHoaDon: 'HD-250601',
    maPhieuKham: 'PK001',
    maKhachHang: 1,
    tenKhachHang: 'Đại Ca',
    sdtKhachHang: '0901234567',
    maNhanVien: 1,
    tenNhanVien: 'BS. Lê Tấn',
    tongTien: 350000,
    phuongThucThanhToan: 'Tiền mặt',
    trangThai: 'pending',
    ghiChu: 'Mèo đã ổn, cho uống thuốc 3 ngày / 1 lần',
    ngayTao: '2026-06-01T14:30',
    ngayCapNhat: '2026-06-01',
    chiTietHoaDon: [
      { id: 1, loai: 'dich_vu', ten: 'Khám', soLuong: 1, donGia: 100000, thanhTien: 100000 },
      { id: 2, loai: 'chi_dinh', ten: 'Siêu âm ổ bụng', soLuong: 1, donGia: 150000, thanhTien: 150000 },
      { id: 3, loai: 'thuoc', ten: 'Thuốc Amoxicillin (x10)', soLuong: 1, donGia: 50000, thanhTien: 50000 },
      { id: 4, loai: 'thuoc', ten: 'Bơm tiêm 5ml (x1)', soLuong: 1, donGia: 50000, thanhTien: 50000 },
    ],
  },
  {
    maHoaDon: 'HD002',
    maPhieuKham: 'PK002',
    maKhachHang: 2,
    tenKhachHang: 'Trần Thị B',
    sdtKhachHang: '0912345678',
    maNhanVien: 2,
    tenNhanVien: 'BS. Phạm Hương',
    tongTien: 1200000,
    phuongThucThanhToan: 'Chuyển khoản',
    trangThai: 'pending',
    ngayTao: '2026-06-29',
    chiTietHoaDon: [
      { id: 3, loai: 'dich_vu', ten: 'Tiêm vắc-xin', soLuong: 2, donGia: 250000, thanhTien: 500000 },
      { id: 4, loai: 'chi_dinh', ten: 'Xét nghiệm máu', maChiTietChiDinh: 1, soLuong: 1, donGia: 700000, thanhTien: 700000 },
    ],
  },
  {
    maHoaDon: 'HD003',
    maPhieuKham: 'PK003',
    maKhachHang: 1,
    tenKhachHang: 'Nguyễn Văn A',
    sdtKhachHang: '0901234567',
    maNhanVien: 1,
    tenNhanVien: 'BS. Lê Tấn',
    tongTien: 500000,
    phuongThucThanhToan: 'Momo',
    trangThai: 'paid',
    ngayTao: '2026-06-27',
    ngayCapNhat: '2026-06-27',
    chiTietHoaDon: [
      { id: 5, loai: 'dich_vu', ten: 'Tắm & Cắt tỉa', soLuong: 1, donGia: 500000, thanhTien: 500000 },
    ],
  },
];

const BillingManagement: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | PaymentMethod>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [quickDateFilter, setQuickDateFilter] = useState<'all' | 'today' | 'yesterday'>('all');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesSearch =
        inv.maHoaDon.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.tenKhachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.sdtKhachHang.includes(searchTerm) ||
        inv.maPhieuKham.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || inv.trangThai === statusFilter;
      const matchesPayment = paymentFilter === 'all' || inv.phuongThucThanhToan === paymentFilter;

      const invDate = new Date(inv.ngayTao);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let matchesDateFrom = true;
      let matchesDateTo = true;
      let matchesQuickDate = true;

      if (quickDateFilter === 'today') {
        matchesQuickDate = invDate.toDateString() === today.toDateString();
      } else if (quickDateFilter === 'yesterday') {
        matchesQuickDate = invDate.toDateString() === yesterday.toDateString();
      } else {
        matchesDateFrom = !dateFrom || invDate >= new Date(dateFrom);
        matchesDateTo = !dateTo || invDate <= new Date(dateTo);
      }

      return matchesSearch && matchesStatus && matchesPayment && matchesDateFrom && matchesDateTo && matchesQuickDate;
    });
  }, [invoices, searchTerm, statusFilter, paymentFilter, dateFrom, dateTo, quickDateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedInvoices = filteredInvoices.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const stats = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let filteredForStats = invoices;

    if (quickDateFilter === 'today') {
      filteredForStats = invoices.filter(inv => {
        const invDate = new Date(inv.ngayTao);
        return invDate.toDateString() === today.toDateString();
      });
    } else if (quickDateFilter === 'yesterday') {
      filteredForStats = invoices.filter(inv => {
        const invDate = new Date(inv.ngayTao);
        return invDate.toDateString() === yesterday.toDateString();
      });
    }

    return {
      total: filteredForStats.length,
      pending: filteredForStats.filter(i => i.trangThai === 'pending').length,
      totalRevenue: filteredForStats.filter(i => i.trangThai === 'paid').reduce((sum, i) => sum + i.tongTien, 0),
      todayRevenue: filteredForStats.filter(i => i.trangThai === 'paid').reduce((sum, i) => sum + i.tongTien, 0),
    };
  }, [invoices, quickDateFilter]);

  const handleCreate = (data: InvoiceFormData) => {
    const newInvoice: Invoice = {
      ...data,
      maHoaDon: `HD-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}`,
      tongTien: data.chiTietHoaDon.reduce((sum, item) => sum + item.thanhTien, 0),
      trangThai: 'pending',
      ngayTao: new Date().toISOString().slice(0, 16),
    };
    setInvoices([...invoices, newInvoice]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleUpdateStatus = (invoice: Invoice, newStatus: InvoiceStatus) => {
    const updated = invoices.map(inv =>
      inv.maHoaDon === invoice.maHoaDon
        ? { ...inv, trangThai: newStatus, ngayCapNhat: new Date().toISOString().split('T')[0] }
        : inv
    );
    setInvoices(updated);
    if (selectedInvoice?.maHoaDon === invoice.maHoaDon) {
      setSelectedInvoice({ ...invoice, trangThai: newStatus });
    }
  };

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetail(true);
  };

  const handlePrint = (invoice: Invoice) => {
    alert(`In hóa đơn ${invoice.maHoaDon}`);
  };

  const handleQuickDateFilter = (filter: 'all' | 'today' | 'yesterday') => {
    setQuickDateFilter(filter);
    setCurrentPage(1);
    if (filter !== 'all') {
      setDateFrom('');
      setDateTo('');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getRevenueLabel = () => {
    if (quickDateFilter === 'today') return 'Doanh thu hôm nay';
    if (quickDateFilter === 'yesterday') return 'Doanh thu hôm qua';
    return 'Doanh thu';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ HÓA ĐƠN</h1>
          <p className="text-gray-600 mt-1">Quản lý thanh toán và hóa đơn</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl flex items-center gap-2 font-medium shadow-lg shadow-violet-200"
        >
          <Receipt size={20} />
          + Tạo hóa đơn
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng hóa đơn</div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <Receipt size={24} className="text-violet-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Chưa thanh toán</div>
              <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">{getRevenueLabel()}</div>
              <div className="text-2xl font-bold text-emerald-600">
                {formatCurrency(stats.todayRevenue)}
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng doanh thu</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(stats.totalRevenue)}
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Date Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-gray-700">Thời gian:</span>
        <input
          type="date"
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
          value={dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value);
            setQuickDateFilter('all');
            setCurrentPage(1);
          }}
        />
        <span className="text-gray-500 text-lg">→</span>
        <input
          type="date"
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
          value={dateTo}
          onChange={(e) => {
            setDateTo(e.target.value);
            setQuickDateFilter('all');
            setCurrentPage(1);
          }}
        />
        <div className="h-8 w-px bg-gray-300 mx-2"></div>
        <button
          onClick={() => handleQuickDateFilter('yesterday')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            quickDateFilter === 'yesterday'
              ? 'bg-violet-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hôm qua
        </button>
        <button
          onClick={() => handleQuickDateFilter('today')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            quickDateFilter === 'today'
              ? 'bg-violet-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hôm nay
        </button>
        <button
          onClick={() => handleQuickDateFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            quickDateFilter === 'all'
              ? 'bg-violet-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tất cả
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Tìm theo mã HD, KH, SĐT, mã PK..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-violet-500"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chưa thanh toán</option>
          <option value="paid">Đã thanh toán</option>
          <option value="cancelled">Đã hủy</option>
          <option value="refunded">Đã hoàn tiền</option>
        </select>
        <select
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={paymentFilter}
          onChange={(e) => { setPaymentFilter(e.target.value as any); setCurrentPage(1); }}
        >
          <option value="all">Tất cả phương thức</option>
          <option value="Tiền mặt">Tiền mặt</option>
          <option value="Chuyển khoản">Chuyển khoản</option>
          <option value="Thẻ">Thẻ</option>
          <option value="Momo">Momo</option>
          <option value="ZaloPay">ZaloPay</option>
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

      {/* Main Content: Table + Detail Panel */}
      <div className="flex gap-6 items-start">
        {/* Table - Left side */}
        <div className="flex-1">
          <BillingTable
            invoices={paginatedInvoices}
            onView={handleView}
            onUpdateStatus={handleUpdateStatus}
            onPrint={handlePrint}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Detail Panel - Right side */}
        {showDetail && selectedInvoice && (
          <div className="w-[400px] flex-shrink-0 sticky top-4">
            <BillingDetail
              invoice={selectedInvoice}
              onClose={() => setShowDetail(false)}
              onUpdateStatus={handleUpdateStatus}
              onPrint={handlePrint}
            />
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-auto">
            <BillingForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingManagement;