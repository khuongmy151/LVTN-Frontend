// src/features/inventory/InventoryDetail.tsx
import React from 'react';
import type { InventoryRecord } from './types';

interface InventoryDetailProps {
  record: InventoryRecord;
  onClose: () => void;
}

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `Ngày ${day} Tháng ${month} Năm ${year}`;
};

const InventoryDetail: React.FC<InventoryDetailProps> = ({ record, onClose }) => {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Đang xử lý': 'bg-amber-100 text-amber-700',
      'Hoàn thành': 'bg-emerald-100 text-emerald-700',
      'Đã hủy': 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-red-600">
          Thông tin Mã phiếu{' '}
          <span className="text-gray-800">«{record.code}»</span>
        </h2>
        <button
          onClick={onClose}
          className="text-3xl text-gray-400 hover:text-gray-600 leading-none"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="bg-gray-50 rounded-2xl p-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Nhân viên tạo phiếu
          </label>
          <div className="font-semibold text-gray-800 text-lg">{record.staffName}</div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Trạng thái
          </label>
          <span
            className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusBadge(
              record.status
            )}`}
          >
            {record.status}
          </span>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Ngày lập
          </label>
          <div className="font-semibold text-gray-800 text-lg">
            {formatDate(record.createdDate)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Tổng tiền
          </label>
          <div className="font-bold text-2xl text-red-700">
            {formatMoney(record.totalAmount)}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Ghi chú
        </label>
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 min-h-[80px] text-gray-700">
          {record.note || 'Không có ghi chú'}
        </div>
      </div>

      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-red-600 rounded-full"></span>
        Danh sách thuốc
      </h3>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">STT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã lô</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tên thuốc</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Số lượng</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Đơn giá</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {record.items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                <td className="px-4 py-3 text-gray-700">{item.batchCode || '-'}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.medicineName}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {item.quantity} {item.unit}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {item.price.toLocaleString('vi-VN')} đ
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {formatMoney(item.totalPrice)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-red-50">
              <td colSpan={5} className="px-4 py-3 text-right font-bold text-gray-800">
                Tổng tiền:
              </td>
              <td className="px-4 py-3 font-bold text-red-700 text-lg">
                {formatMoney(record.totalAmount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onClose}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium transition-colors shadow-sm"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default InventoryDetail;