// src/features/appointments/AppointmentDetail.tsx
import React from 'react';
import type { Appointment, AppointmentStatus } from './types';

interface AppointmentDetailProps {
  appointment: Appointment;
  onClose: () => void;
  onEdit?: (apt: Appointment) => void;
  onStatusChange?: (apt: Appointment, newStatus: AppointmentStatus, cancelReason?: string) => void;
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({
  appointment: apt,
  onClose,
  onEdit,
  onStatusChange,
}) => {
  const getStatusConfig = (status: AppointmentStatus) => {
    const config = {
      pending: { label: 'Chờ xác nhận', className: 'bg-amber-100 text-amber-700', icon: '⏳' },
      confirmed: { label: 'Đã xác nhận', className: 'bg-blue-100 text-blue-700', icon: '✓' },
      completed: { label: 'Đã hoàn thành', className: 'bg-emerald-100 text-emerald-700', icon: '✅' },
      cancelled: { label: 'Đã hủy', className: 'bg-red-100 text-red-700', icon: '✕' },
      'no-show': { label: 'Không đến', className: 'bg-gray-100 text-gray-700', icon: '❌' },
    };
    return config[status];
  };

  const getServiceIcon = (service: string) => {
    const icons: Record<string, string> = {
      'Khám tổng quát': '',
      'Tiêm phòng': '',
      'Tắm & Cắt tỉa': '✂️',
      'Triệt sản': '🏥',
      'Phẫu thuật': '⚕️',
      'Tái khám': '🔄',
      'Cấp cứu': '🚨',
      'Khác': '📋',
    };
    return icons[service] || '📋';
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const statusConfig = getStatusConfig(apt.status);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700"> Chi tiết lịch hẹn</h2>
        <div className="mt-3">
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold ${statusConfig.className}`}>
            <span>{statusConfig.icon}</span>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Timeline trạng thái */}
      <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
        <div className="text-sm font-bold text-indigo-700 mb-3">📋 Tiến trình</div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              apt.status !== 'pending' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'
            }`}>1</div>
            <div className="mt-1 font-medium">Tạo lịch</div>
            <div className="text-gray-500">{apt.createdAt}</div>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300 relative">
            <div className={`absolute inset-0 ${
              ['confirmed', 'completed'].includes(apt.status) ? 'bg-emerald-500' : 'bg-transparent'
            }`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              ['confirmed', 'completed'].includes(apt.status) ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-white'
            }`}>2</div>
            <div className="mt-1 font-medium">Xác nhận</div>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-300 relative">
            <div className={`absolute inset-0 ${
              apt.status === 'completed' ? 'bg-emerald-500' : 'bg-transparent'
            }`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              apt.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-white'
            }`}>3</div>
            <div className="mt-1 font-medium">Hoàn thành</div>
          </div>
        </div>
      </div>

      {/* Thông tin chính */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-gray-700 max-w-2xl mx-auto">
        {/* Ngày giờ */}
        <div className="col-span-2 bg-indigo-50 rounded-2xl p-4">
          <div className="text-sm text-gray-500 mb-1">📅 Ngày & Giờ hẹn</div>
          <div className="font-bold text-xl text-indigo-700">
            {apt.appointmentDate} • {apt.appointmentTime}
          </div>
        </div>

        {/* Dịch vụ */}
        <div className="col-span-2">
          <div className="text-sm text-gray-500">🏥 Loại dịch vụ</div>
          <div className="font-semibold text-lg">
            {getServiceIcon(apt.serviceType)} {apt.serviceType}
          </div>
        </div>

        {/* Khách hàng */}
        <div className="col-span-2 border-t-2 border-indigo-200 pt-4 mt-2">
          <div className="text-sm font-bold text-indigo-700 mb-3">👤 Khách hàng</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Họ tên</div>
              <div className="font-semibold">{apt.customerName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">SĐT</div>
              <div className="font-semibold">{apt.customerPhone}</div>
            </div>
          </div>
        </div>

        {/* Vật nuôi */}
        <div className="col-span-2">
          <div className="text-sm font-bold text-indigo-700 mb-3">🐾 Vật nuôi</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Tên</div>
              <div className="font-semibold">{apt.petName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Loài</div>
              <div className="font-semibold">{apt.petSpecies}</div>
            </div>
          </div>
        </div>

        {/* Bác sĩ */}
        <div className="col-span-2">
          <div className="text-sm text-gray-500">👨‍️ Bác sĩ phụ trách</div>
          <div className="font-semibold text-lg">{apt.doctorName}</div>
        </div>

        {/* Lý do */}
        <div className="col-span-2">
          <div className="text-sm text-gray-500">📝 Lý do đến khám</div>
          <div className="font-medium bg-gray-50 p-4 rounded-2xl border border-gray-200">
            {apt.reason}
          </div>
        </div>

        {/* Chi phí */}
        <div>
          <div className="text-sm text-gray-500">💰 Chi phí dự kiến</div>
          <div className="font-bold text-lg text-emerald-600">
            {formatCurrency(apt.estimatedCost)}
          </div>
        </div>

        {/* Ngày tạo */}
        <div>
          <div className="text-sm text-gray-500"> Ngày tạo lịch</div>
          <div className="font-medium">{apt.createdAt}</div>
        </div>

        {/* Ghi chú */}
        {apt.notes && (
          <div className="col-span-2">
            <div className="text-sm text-gray-500">📌 Ghi chú nội bộ</div>
            <div className="font-medium bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-800">
              {apt.notes}
            </div>
          </div>
        )}

        {/* Lý do hủy */}
        {apt.cancelReason && (
          <div className="col-span-2">
            <div className="text-sm text-gray-500">❌ Lý do hủy</div>
            <div className="font-medium bg-red-50 p-4 rounded-2xl border border-red-200 text-red-700">
              {apt.cancelReason}
            </div>
          </div>
        )}

        {/* Ngày hoàn thành */}
        {apt.completedAt && (
          <div className="col-span-2">
            <div className="text-sm text-gray-500">✅ Ngày hoàn thành</div>
            <div className="font-medium text-emerald-600">{apt.completedAt}</div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        {onEdit && (apt.status === 'pending' || apt.status === 'confirmed') && (
          <button
            onClick={() => onEdit(apt)}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700"
          >
            ✏️ Cập nhật
          </button>
        )}
        {onStatusChange && apt.status === 'pending' && (
          <button
            onClick={() => onStatusChange(apt, 'confirmed')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700"
          >
            ✓ Xác nhận
          </button>
        )}
        {onStatusChange && apt.status === 'confirmed' && (
          <button
            onClick={() => onStatusChange(apt, 'completed')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700"
          >
            ✅ Hoàn thành
          </button>
        )}
        {onStatusChange && (apt.status === 'pending' || apt.status === 'confirmed') && (
          <button
            onClick={() => {
              const reason = prompt('Lý do hủy:');
              if (reason !== null) onStatusChange(apt, 'cancelled', reason);
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700"
          >
            ✕ Hủy lịch
          </button>
        )}
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

export default AppointmentDetail;