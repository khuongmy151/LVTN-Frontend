// src/features/billing/BillingDetail.tsx
import React, { useState } from 'react';
import type { Invoice, InvoiceStatus, PaymentMethod } from './types';
import { INVOICE_STATUS, PAYMENT_METHODS } from './types';

interface BillingDetailProps {
  invoice: Invoice;
  onClose: () => void;
  onUpdateStatus: (invoice: Invoice, status: InvoiceStatus) => void;
  onPrint: (invoice: Invoice) => void;
}

const BillingDetail: React.FC<BillingDetailProps> = ({
  invoice,
  onClose,
  onUpdateStatus,
  onPrint,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(invoice.phuongThucThanhToan);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemIcon = (loai: string) => {
    switch (loai) {
      case 'thuoc': return '💊';
      case 'dich_vu': return '';
      case 'chi_dinh': return '📋';
      default: return '';
    }
  };

  const statusConfig = INVOICE_STATUS[invoice.trangThai];

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 h-full">
      {/* Header */}
      <div className="border-b-2 border-gray-300 p-4">
        <h2 className="text-xl font-bold text-center text-gray-900">Hóa đơn thanh toán</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Invoice Info */}
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">Mã hóa đơn:</span>{' '}
            <span className="font-bold">{invoice.maHoaDon}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Ngày lập:</span>{' '}
            <span>{formatDateTime(invoice.ngayTao)}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Nhân viên:</span>{' '}
            <span>{invoice.tenNhanVien}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Bác sĩ:</span>{' '}
            <span>{invoice.tenNhanVien}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border-t-2 border-gray-300 pt-3">
          <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase">Thông tin khách hàng</h3>
          <div className="space-y-1 text-sm">
            <div>
              <span className="font-medium text-gray-700">Khách hàng:</span>{' '}
              <span>{invoice.tenKhachHang}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Điện thoại:</span>{' '}
              <span>{invoice.sdtKhachHang}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Thú cưng:</span>{' '}
              <span>Mèo Mimi (Đực, 2kg)</span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="border-t-2 border-gray-300 pt-3">
          <h3 className="font-bold text-gray-900 mb-2 text-sm">Danh sách Dịch vụ & Thuốc</h3>
          <div className="space-y-1">
            {invoice.chiTietHoaDon.map((item, index) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {index + 1}. {item.ten}
                </span>
                <span className="font-medium text-gray-900">{formatCurrency(item.thanhTien)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t-2 border-gray-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-sm">TỔNG CỘNG:</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(invoice.tongTien)}</span>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú:</label>
          <textarea
            value={invoice.ghiChu || ''}
            readOnly
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức:</label>
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {PAYMENT_METHODS.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          {invoice.trangThai === 'pending' ? (
            <button
              onClick={() => onUpdateStatus(invoice, 'paid')}
              className="px-6 py-2 border-2 border-gray-800 rounded-lg font-bold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              [ Xác nhận thu tiền ]
            </button>
          ) : (
            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${statusConfig.color}`}>
              {statusConfig.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingDetail;