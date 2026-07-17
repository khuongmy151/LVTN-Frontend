// src/features/medicines/MedicineDetail.tsx
import React from 'react';
import type { Medicine } from './types';

interface MedicineDetailProps {
  medicine: Medicine;
  onClose: () => void;
  onEdit?: (medicine: Medicine) => void;
}

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const formatExpiry = (date?: string) => {
  if (!date) return 'Chưa cập nhật';
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicine,
  onClose,
  onEdit,
}) => {
  // Cảnh báo thuốc sắp hết hạn (trong vòng 3 tháng)
  const isExpiringSoon = (() => {
    if (!medicine.expiryDate) return false;
    const expiry = new Date(medicine.expiryDate);
    const now = new Date();
    const threeMonths = new Date();
    threeMonths.setMonth(threeMonths.getMonth() + 3);
    return expiry <= threeMonths && expiry >= now;
  })();

  const isExpired = medicine.expiryDate
    ? new Date(medicine.expiryDate) < new Date()
    : false;

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-700">Xem thông tin</h2>
        <div className="mt-2">
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
              medicine.status === 'active'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            ({medicine.status === 'active' ? 'Còn dùng' : 'Ngừng dùng'})
          </span>
        </div>
      </div>

      {/* Icon thuốc */}
      <div className="flex justify-center mb-8">
        <div className="w-36 h-36 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-full flex items-center justify-center text-7xl border-4 border-white shadow-lg">
          💊
        </div>
      </div>

      {/* Thông tin */}
      <div className="space-y-4 text-gray-700 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">
            Tên thuốc:
          </label>
          <div className="flex-1 font-semibold text-lg">{medicine.name}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">
            Đơn vị tính:
          </label>
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
            {medicine.unit}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">
            Giá:
          </label>
          <div className="flex-1 font-semibold text-lg text-emerald-700">
            {formatMoney(medicine.price)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">
            Hạn dùng:
          </label>
          <div className="flex-1 font-medium">
            <span
              className={`${
                isExpired
                  ? 'text-red-600 font-bold'
                  : isExpiringSoon
                  ? 'text-amber-600 font-semibold'
                  : ''
              }`}
            >
              {formatExpiry(medicine.expiryDate)}
              {isExpired && ' (Đã hết hạn)'}
              {isExpiringSoon && !isExpired && ' (Sắp hết hạn)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">
            Trạng thái:
          </label>
          <span
            className={`inline-block px-4 py-1.5 rounded-full font-semibold text-sm ${
              medicine.status === 'active'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {medicine.status === 'active' ? 'Còn dùng' : 'Ngừng dùng'}
          </span>
        </div>

        {medicine.description && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Mô tả / Công dụng:
            </label>
            <div className="font-medium bg-gray-50 p-4 rounded-2xl border border-gray-200">
              {medicine.description}
            </div>
          </div>
        )}
      </div>

      {/* Nút */}
      <div className="mt-10 flex gap-4 justify-center">
        {onEdit && (
          <button
            onClick={() => onEdit(medicine)}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors"
          >
            Cập nhật thông tin
          </button>
        )}
        <button
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
        >
          Thoát ra
        </button>
      </div>
    </div>
  );
};

export default MedicineDetail;