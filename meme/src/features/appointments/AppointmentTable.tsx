// src/features/appointments/AppointmentTable.tsx
import React from 'react';
import type { Appointment, AppointmentStatus } from './types';

interface AppointmentTableProps {
  appointments: Appointment[];
  onView: (apt: Appointment) => void;
  onEdit: (apt: Appointment) => void;
  onDelete: (apt: Appointment) => void;
  onStatusChange: (apt: Appointment, newStatus: AppointmentStatus) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const getStatusConfig = (status: AppointmentStatus) => {
    const config = {
      pending: { label: 'Chờ xác nhận', className: 'bg-amber-100 text-amber-700' },
      confirmed: { label: 'Đã xác nhận', className: 'bg-blue-100 text-blue-700' },
      completed: { label: 'Đã hoàn thành', className: 'bg-emerald-100 text-emerald-700' },
      cancelled: { label: 'Đã hủy', className: 'bg-red-100 text-red-700' },
      'no-show': { label: 'Không đến', className: 'bg-gray-100 text-gray-700' },
    };
    return config[status];
  };

  const getServiceIcon = (service: string) => {
    const icons: Record<string, string> = {
      'Khám tổng quát': '🩺',
      'Tiêm phòng': '💉',
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

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Ngày/Giờ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Vật nuôi</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Dịch vụ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Bác sĩ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Chi phí</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                Không có lịch hẹn nào
              </td>
            </tr>
          ) : (
            appointments.map((apt, index) => {
              const statusConfig = getStatusConfig(apt.status);
              return (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">{index + 1}</td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-gray-900">{apt.appointmentDate}</div>
                    <div className="text-xs text-gray-500">{apt.appointmentTime}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-gray-900">{apt.customerName}</div>
                    <div className="text-xs text-gray-500">{apt.customerPhone}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-gray-900">{apt.petName}</div>
                    <div className="text-xs text-gray-500">{apt.petSpecies}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                      {getServiceIcon(apt.serviceType)} {apt.serviceType}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{apt.doctorName}</td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-700">
                    {formatCurrency(apt.estimatedCost)}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${statusConfig.className}`}>
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => onView(apt)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => onEdit(apt)}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-amber-50"
                      >
                        Sửa
                      </button>
                      {apt.status === 'pending' && (
                        <button
                          onClick={() => onStatusChange(apt, 'confirmed')}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-emerald-50"
                        >
                          Xác nhận
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => onStatusChange(apt, 'completed')}
                          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-indigo-50"
                        >
                          Hoàn thành
                        </button>
                      )}
                      {(apt.status === 'pending' || apt.status === 'confirmed') && (
                        <button
                          onClick={() => {
                            const reason = prompt('Lý do hủy:');
                            if (reason !== null) onStatusChange(apt, 'cancelled');
                          }}
                          className="text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-red-50"
                        >
                          Hủy
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;