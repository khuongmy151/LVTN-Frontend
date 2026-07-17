// src/features/customers/CustomerTable.tsx
import React from 'react';
import type { Customer } from './types';

interface CustomerTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Mã KH</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">SĐT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Địa chỉ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {customers.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            customers.map((customer, index) => (
              <tr key={customer.maKhachHang} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-500">{index + 1}</td>
                <td className="px-6 py-5 text-sm font-mono text-gray-700">{customer.maKhachHang}</td>
                <td className="px-6 py-5 font-medium text-gray-900">{customer.ten}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{customer.dienThoai}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{customer.email || '-'}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{customer.diaChi}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{formatDate(customer.ngayTao)}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onView(customer)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => onEdit(customer)}
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-amber-50"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(customer)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;