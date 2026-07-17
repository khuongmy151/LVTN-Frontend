// src/features/prescriptions/PrescriptionTable.tsx
import React from 'react';
import type { Prescription } from './types';

interface PrescriptionTableProps {
  prescriptions: Prescription[];
  onView: (prescription: Prescription) => void;
  onPrint: (prescription: Prescription) => void;
}

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({
  prescriptions,
  onView,
  onPrint,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Ngày kê đơn</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Bệnh nhân</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Thú cưng</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Chẩn đoán</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Bác sĩ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Số thuốc</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {prescriptions.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-6 py-10 text-center text-gray-500">
                Không có đơn thuốc nào
              </td>
            </tr>
          ) : (
            prescriptions.map((pre, index) => (
              <tr key={pre.maDonThuoc} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-500">{index + 1}</td>
                <td className="px-6 py-5 font-semibold text-teal-600">{pre.maDonThuoc}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{pre.ngayTao}</td>
                <td className="px-6 py-5">
                  <div className="font-medium text-gray-900">{pre.tenBenhNhan}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-medium text-gray-900">{pre.tenThuCung}</div>
                  <div className="text-xs text-gray-500">{pre.loaiThuCung}</div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-700">{pre.chanDoan}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{pre.tenBacSi}</td>
                <td className="px-6 py-5">
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                    {pre.chiTietDonThuoc.length} loại
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">
                  {formatCurrency(pre.tongTien)}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => onView(pre)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => onPrint(pre)}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-emerald-50"
                    >
                      In
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

export default PrescriptionTable;