// src/features/billing/BillingTable.tsx
import React, { useState } from 'react';
import type { Invoice, InvoiceStatus, PaymentMethod } from './types';
import { INVOICE_STATUS } from './types';

interface BillingTableProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onUpdateStatus: (invoice: Invoice, status: InvoiceStatus) => void;
  onPrint: (invoice: Invoice) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BillingTable: React.FC<BillingTableProps> = ({
  invoices,
  onView,
  onUpdateStatus,
  onPrint,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');

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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleViewNote = (note: string) => {
    setSelectedNote(note);
    setShowNoteModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r border-gray-300 w-12">STT</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r border-gray-300 min-w-[180px]">
                  Mã HD & Ngày lập
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r border-gray-300 min-w-[180px]">
                  Khách hàng & Thú cưng
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r border-gray-300">Tổng tiền</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r border-gray-300">Trạng thái</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r border-gray-300">Phương thức</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 min-w-[250px]">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    Không có hóa đơn nào
                  </td>
                </tr>
              ) : (
                invoices.map((inv, index) => {
                  const statusConfig = INVOICE_STATUS[inv.trangThai];
                  return (
                    <tr key={inv.maHoaDon} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <div className="font-bold text-gray-900 text-sm">{inv.maHoaDon}</div>
                        <div className="text-xs text-gray-500">{formatDateTime(inv.ngayTao)}</div>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <div className="font-medium text-gray-900 text-sm">{inv.tenKhachHang}</div>
                        <div className="text-xs text-gray-500">Mèo Mimi</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-200">
                        {formatCurrency(inv.tongTien)}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <span className="inline-flex items-center gap-1 text-xs font-medium">
                          {inv.trangThai === 'pending' && (
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          )}
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">
                        {inv.phuongThucThanhToan}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {inv.ghiChu ? (
                          <div>
                            <div className="text-xs">
                              {truncateText(inv.ghiChu, 40)}
                            </div>
                            {inv.ghiChu.length > 40 && (
                              <button
                                onClick={() => handleViewNote(inv.ghiChu || '')}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1 underline"
                              >
                                (Xem thêm)
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 text-sm">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
        >
          &lt;&lt; Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {currentPage}/{totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
        >
          Sau &gt;&gt;
        </button>
      </div>

      {/* Modal Ghi chú */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border-2 border-red-300 p-6 max-w-md w-full">
            <h3 className="text-center font-bold text-red-600 text-lg mb-4 uppercase">Ghi chú</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] text-gray-700 text-sm whitespace-pre-wrap">
              {selectedNote}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingTable;