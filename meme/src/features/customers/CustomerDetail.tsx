// src/features/customers/CustomerDetail.tsx
import React from 'react';
import type { Customer } from './types';

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
  onEdit?: (customer: Customer) => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onClose, onEdit }) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-700">Xem thông tin khách hàng</h2>
        <div className="mt-2">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
            {customer.daXoa ? 'Đã xóa' : 'Đang hoạt động'}
          </span>
        </div>
      </div>

      {/* Avatar placeholder */}
      <div className="flex justify-center mb-8">
        <div className="w-36 h-36 bg-emerald-100 rounded-full flex items-center justify-center text-7xl border-4 border-white shadow-lg">
          👤
        </div>
      </div>

      {/* Thông tin */}
      <div className="space-y-4 text-gray-700 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Mã khách hàng:</label>
          <div className="flex-1 font-mono font-semibold text-lg">{customer.maKhachHang}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Họ tên:</label>
          <div className="flex-1 font-semibold text-lg">{customer.ten}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Số điện thoại:</label>
          <div className="flex-1 font-medium">{customer.dienThoai}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Email:</label>
          <div className="flex-1 font-medium">{customer.email || '-'}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Địa chỉ:</label>
          <div className="flex-1 font-medium">{customer.diaChi}</div>
        </div>

        {customer.maKhach && (
          <div className="flex items-center gap-3">
            <label className="w-28 text-sm font-medium text-gray-500">Mã khách:</label>
            <div className="flex-1 font-mono font-medium">{customer.maKhach}</div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Ngày tạo:</label>
          <div className="flex-1 font-medium">{formatDate(customer.ngayTao)}</div>
        </div>

        {customer.ngayCapNhat && (
          <div className="flex items-center gap-3">
            <label className="w-28 text-sm font-medium text-gray-500">Cập nhật:</label>
            <div className="flex-1 font-medium">{formatDate(customer.ngayCapNhat)}</div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4 justify-center">
        {onEdit && (
          <button
            onClick={() => onEdit(customer)}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700"
          >
            Cập nhật thông tin
          </button>
        )}
        <button
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
        >
          Thoát ra
        </button>
      </div>
    </div>
  );
};

export default CustomerDetail;