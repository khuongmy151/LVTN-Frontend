// src/features/prescriptions/PrescriptionDetail.tsx
import React from 'react';
import type { Prescription } from './types';
import { Printer, Pill } from 'lucide-react';

interface PrescriptionDetailProps {
  prescription: Prescription;
  onClose: () => void;
  onPrint: (prescription: Prescription) => void;
}

const PrescriptionDetail: React.FC<PrescriptionDetailProps> = ({
  prescription,
  onClose,
  onPrint,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-2">📋 ĐƠN THUỐC</h2>
        <div className="text-2xl font-bold text-gray-900">{prescription.maDonThuoc}</div>
        <div className="text-gray-500 mt-1">Ngày kê: {prescription.ngayTao}</div>
      </div>

      {/* Thông tin bệnh nhân */}
      <div className="grid grid-cols-2 gap-6 mb-6 bg-teal-50 rounded-2xl p-5">
        <div>
          <div className="text-sm text-gray-500 mb-1">👤 Bệnh nhân (Chủ nuôi)</div>
          <div className="font-semibold text-lg">{prescription.tenChuNuoi}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">🐾 Thú cưng</div>
          <div className="font-semibold">{prescription.tenThuCung} ({prescription.loaiThuCung})</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">📄 Mã phiếu khám</div>
          <div className="font-semibold">{prescription.maPhieuKham}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">👨‍⚕️ Bác sĩ kê đơn</div>
          <div className="font-semibold">{prescription.tenBacSi}</div>
        </div>
        <div className="col-span-2">
          <div className="text-sm text-gray-500 mb-1">🏥 Chẩn đoán</div>
          <div className="font-semibold text-lg text-teal-700">{prescription.chanDoan}</div>
        </div>
      </div>

      {/* Danh sách thuốc */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💊 Danh sách thuốc</h3>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên thuốc</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liều dùng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cách dùng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thành tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {prescription.chiTietDonThuoc.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Pill size={16} className="text-teal-600" />
                      {item.tenThuoc}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.soLuong}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatCurrency(item.giaBan)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-medium">{item.lieuDung}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.cachDung}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {formatCurrency(item.thanhTien)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-teal-50">
              <tr>
                <td colSpan={6} className="px-4 py-4 text-right font-bold text-lg text-gray-900">
                  Tổng cộng:
                </td>
                <td className="px-4 py-4 text-2xl font-bold text-teal-600">
                  {formatCurrency(prescription.tongTien)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Ghi chú */}
      {prescription.ghiChu && (
        <div className="mb-6 bg-amber-50 rounded-2xl p-4">
          <div className="text-sm font-bold text-amber-700 mb-1">📝 Ghi chú</div>
          <div className="text-gray-700">{prescription.ghiChu}</div>
        </div>
      )}

      {/* Hướng dẫn */}
      <div className="mb-6 bg-blue-50 rounded-2xl p-4">
        <div className="text-sm font-bold text-blue-700 mb-2">⚕️ Hướng dẫn sử dụng thuốc</div>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Cho thú cưng uống thuốc đúng liều lượng và thời gian quy định</li>
          <li>Theo dõi phản ứng của thú cưng sau khi dùng thuốc</li>
          <li>Đưa đến khám lại nếu có dấu hiệu bất thường</li>
          <li>Không tự ý ngưng thuốc khi chưa hết liệu trình</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <button
          onClick={() => onPrint(prescription)}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 flex items-center gap-2"
        >
          <Printer size={18} />
          In đơn thuốc
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetail;