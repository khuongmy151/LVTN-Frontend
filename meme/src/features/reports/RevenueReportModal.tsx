// src/features/reports/RevenueReportModal.tsx
import React, { useState, useMemo } from 'react';
import type { TimeRange, VisitRecord, SpeciesFilter, StatusFilter } from './types';

interface Props {
  timeRange: TimeRange;
  visits: VisitRecord[];
  onClose: () => void;
}

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

const RevenueReportModal: React.FC<Props> = ({ timeRange, visits, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedVisit, setSelectedVisit] = useState<VisitRecord | null>(null);

  const filtered = useMemo(() => {
    return visits.filter((v) => {
      const matchSearch =
        v.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.petName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSpecies = speciesFilter === 'all' || v.species === speciesFilter;
      const matchStatus = statusFilter === 'all' || v.status === statusFilter;
      return matchSearch && matchSpecies && matchStatus;
    });
  }, [searchTerm, speciesFilter, statusFilter, visits]);

  const totalRevenue = filtered.reduce((sum, v) => sum + (v.revenue || 0), 0);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-blue-600">Doanh thu</h2>
          <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="p-8 space-y-5">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Thời gian:</label>
              <span className="border border-gray-300 rounded-2xl px-3 py-2 bg-gray-50 text-sm text-gray-700">
                {formatDateFull(timeRange.from)}
              </span>
              <span className="text-gray-500">→</span>
              <span className="border border-gray-300 rounded-2xl px-3 py-2 bg-gray-50 text-sm text-gray-700">
                {formatDateFull(timeRange.to)}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm font-medium text-gray-700">Số lượng:</label>
              <span className="text-gray-600 font-medium">{filtered.length}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-[250px]">
              <label className="text-sm font-medium text-gray-700">Tìm kiếm</label>
              <input
                type="text"
                placeholder="Tên khách hàng, tên vật nuôi"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 border border-gray-300 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Loài:</label>
              <select
                value={speciesFilter}
                onChange={(e) => {
                  setSpeciesFilter(e.target.value as SpeciesFilter);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-2xl px-4 py-2.5"
              >
                <option value="all">Tất cả</option>
                <option value="Chó">Chó</option>
                <option value="Mèo">Mèo</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as StatusFilter);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-2xl px-4 py-2.5"
              >
                <option value="all">Tất cả</option>
                <option value="Mới">Mới</option>
                <option value="Tái khám">Tái khám</option>
              </select>
            </div>
          </div>

          {/* Total revenue */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <span className="text-sm text-gray-600">Tổng doanh thu: </span>
            <span className="text-2xl font-bold text-blue-700">
              {formatMoney(totalRevenue)}
            </span>
          </div>

          {/* Table + Services panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">Tên khách hàng</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">Tên vật nuôi</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">Loài</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">Ngày khám</th>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    paginated.map((v, idx) => (
                      <tr
                        key={v.id}
                        onClick={() => setSelectedVisit(v)}
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                          selectedVisit?.id === v.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-500">
                          {(safePage - 1) * pageSize + idx + 1}
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-900">{v.customerName}</td>
                        <td className="px-4 py-4 text-gray-700">{v.petName}</td>
                        <td className="px-4 py-4 text-gray-700">{v.species}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                              v.status === 'Mới'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-700">{formatDate(v.date)}</td>
                        <td className="px-4 py-4 font-semibold text-gray-900">
                          {formatMoney(v.revenue || 0)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Services panel */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 mb-3">Chi tiết dịch vụ</h3>
              {selectedVisit ? (
                <div>
                  <div className="text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Khách: </span> {selectedVisit.customerName}
                    </div>
                    <div>
                      <span className="font-medium">Vật nuôi: </span> {selectedVisit.petName} ({selectedVisit.species})
                    </div>
                    <div>
                      <span className="font-medium">Ngày: </span> {formatDate(selectedVisit.date)}
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-gray-600">Dịch vụ</th>
                        <th className="text-right py-2 text-gray-600">Giá tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedVisit.services?.map((s, i) => (
                        <tr key={i}>
                          <td className="py-2 text-gray-700">{i + 1}. {s.name}</td>
                          <td className="py-2 text-right font-medium text-gray-900">
                            {formatMoney(s.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 font-bold">
                        <td className="py-2 text-gray-900">Tổng</td>
                        <td className="py-2 text-right text-blue-700">
                          {formatMoney(selectedVisit.revenue || 0)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-10 text-sm">
                  Chọn một lượt khám để xem chi tiết dịch vụ
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &lt;&lt; Trước
            </button>
            <span className="text-gray-700 font-medium">
              Trang {safePage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sau &gt;&gt;
            </button>
          </div>

          {/* Close button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReportModal;