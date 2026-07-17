// src/features/inventory/InventoryTable.tsx
import React from 'react';
import type { InventoryRecord } from './types';

interface InventoryTableProps {
  records: InventoryRecord[];
  onView: (record: InventoryRecord) => void;
  onEdit: (record: InventoryRecord) => void;
  onCancel: (record: InventoryRecord) => void;
}

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const InventoryTable: React.FC<InventoryTableProps> = ({
  records,
  onView,
  onEdit,
  onCancel,
}) => {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Đang xử lý': 'bg-amber-100 text-amber-700',
      'Hoàn thành': 'bg-emerald-100 text-emerald-700',
      'Đã hủy': 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Mã phiếu
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nhân viên
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ngày lập
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ghi chú
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <span>Không có dữ liệu</span>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((rec, index) => (
                <tr key={rec.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {rec.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {rec.staffName}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatMoney(rec.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                        rec.status
                      )}`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(rec.createdDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate" title={rec.note}>
                    {rec.note || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onView(rec)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium text-xs transition-colors"
                      >
                        Xem
                      </button>
                      {rec.status === 'Đang xử lý' && (
                        <>
                          <button
                            onClick={() => onEdit(rec)}
                            className="px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg font-medium text-xs transition-colors"
                          >
                            Cập nhật
                          </button>
                          <button
                            onClick={() => onCancel(rec)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium text-xs transition-colors"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;