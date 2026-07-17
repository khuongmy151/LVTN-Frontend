// src/features/reports/NewPetsModal.tsx
import React, { useState, useMemo } from 'react';
import type { TimeRange, VisitRecord } from './types';

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

const NewPetsModal: React.FC<Props> = ({ timeRange, visits, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    return visits.filter((v) => {
      const matchSearch =
        v.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [searchTerm, visits]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-emerald-600">Thú cưng mới tới khám</h2>
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
                placeholder="Tên khách hàng, tên vật nuôi, bác sĩ khám"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 border border-gray-300 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Tên khách hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Tên vật nuôi</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Loài</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Bác sĩ khám</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Ngày khám</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  paginated.map((v, idx) => (
                    <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-500">
                        {(safePage - 1) * pageSize + idx + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{v.customerName}</td>
                      <td className="px-6 py-4 text-gray-700">{v.petName}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                          {v.species}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{v.doctor}</td>
                      <td className="px-6 py-4 text-gray-700">{formatDate(v.date)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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

export default NewPetsModal;