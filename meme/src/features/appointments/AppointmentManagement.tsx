// src/features/appointments/AppointmentManagement.tsx
import React, { useState, useMemo } from 'react';
import AppointmentTable from './AppointmentTable';
import AppointmentForm from './AppointmentForm';
import AppointmentDetail from './AppointmentDetail';
import type { Appointment, AppointmentFormData, AppointmentStatus, ServiceType } from './types';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const mockAppointments: Appointment[] = [
  {
    id: 1,
    customerId: 1,
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    petId: 1,
    petName: 'Mimi',
    petSpecies: 'Chó',
    appointmentDate: '2026-06-30',
    appointmentTime: '09:00',
    serviceType: 'Khám tổng quát',
    doctorId: 1,
    doctorName: 'BS. Lê Tấn',
    reason: 'Khám sức khỏe định kỳ',
    notes: 'Khách hàng thân thiết',
    estimatedCost: 300000,
    status: 'confirmed',
    createdAt: '2026-06-25',
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Trần Thị B',
    customerPhone: '0912345678',
    petId: 2,
    petName: 'Tom',
    petSpecies: 'Mèo',
    appointmentDate: '2026-06-29',
    appointmentTime: '14:30',
    serviceType: 'Tái khám',
    doctorId: 2,
    doctorName: 'BS. Phạm Hương',
    reason: 'Tái khám viêm thận',
    notes: 'Cần xét nghiệm máu',
    estimatedCost: 500000,
    status: 'pending',
    createdAt: '2026-06-28',
  },
  {
    id: 3,
    customerId: 1,
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    petId: 3,
    petName: 'Bông',
    petSpecies: 'Mèo',
    appointmentDate: '2026-06-28',
    appointmentTime: '10:00',
    serviceType: 'Tiêm phòng',
    doctorId: 1,
    doctorName: 'BS. Lê Tấn',
    reason: 'Tiêm vắc-xin dại',
    status: 'completed',
    createdAt: '2026-06-20',
    completedAt: '2026-06-28',
    estimatedCost: 250000,
  },
  {
    id: 4,
    customerId: 3,
    customerName: 'Lê Văn C',
    customerPhone: '0987654321',
    petId: 4,
    petName: 'Kiki',
    petSpecies: 'Chim',
    appointmentDate: '2026-07-02',
    appointmentTime: '16:00',
    serviceType: 'Tắm & Cắt tỉa',
    doctorId: 3,
    doctorName: 'BS. Trần Minh',
    reason: 'Cắt tỉa lông',
    status: 'pending',
    createdAt: '2026-06-29',
    estimatedCost: 200000,
  },
  {
    id: 5,
    customerId: 2,
    customerName: 'Trần Thị B',
    customerPhone: '0912345678',
    petId: 2,
    petName: 'Tom',
    petSpecies: 'Mèo',
    appointmentDate: '2026-06-27',
    appointmentTime: '08:30',
    serviceType: 'Cấp cứu',
    doctorId: 2,
    doctorName: 'BS. Phạm Hương',
    reason: 'Nôn mửa, bỏ ăn',
    status: 'cancelled',
    cancelReason: 'Khách hủy do bận việc',
    createdAt: '2026-06-26',
    estimatedCost: 400000,
  },
];

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [serviceFilter, setServiceFilter] = useState<'all' | ServiceType>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch =
        apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.customerPhone.includes(searchTerm) ||
        apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchesService = serviceFilter === 'all' || apt.serviceType === serviceFilter;
      const matchesDate = !dateFilter || apt.appointmentDate === dateFilter;

      return matchesSearch && matchesStatus && matchesService && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, serviceFilter, dateFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedAppointments = filteredAppointments.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  // Stats
  const today = new Date().toISOString().split('T')[0];
  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    today: appointments.filter(a => a.appointmentDate === today).length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  const handleAdd = (data: AppointmentFormData) => {
    const newApt: Appointment = {
      ...data,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAppointments([...appointments, newApt]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleEdit = (data: AppointmentFormData) => {
    if (!selectedAppointment) return;
    const updated = appointments.map(apt =>
      apt.id === selectedAppointment.id ? { ...apt, ...data } : apt
    );
    setAppointments(updated);
    setShowForm(false);
    setSelectedAppointment(null);
    setIsEditMode(false);
  };

  const handleView = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setShowDetail(true);
  };

  const handleEditClick = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleStatusChange = (apt: Appointment, newStatus: AppointmentStatus, cancelReason?: string) => {
    const updated = appointments.map(a => {
      if (a.id !== apt.id) return a;
      const changes: Partial<Appointment> = { status: newStatus };
      if (newStatus === 'completed') changes.completedAt = new Date().toISOString().split('T')[0];
      if (newStatus === 'cancelled' && cancelReason) changes.cancelReason = cancelReason;
      return { ...a, ...changes };
    });
    setAppointments(updated);
  };

  const handleDelete = (apt: Appointment) => {
    if (window.confirm(`Bạn có chắc muốn xóa lịch hẹn của ${apt.petName}?`)) {
      setAppointments(appointments.filter(a => a.id !== apt.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ LỊCH HẸN</h1>
          <p className="text-gray-600 mt-1">Lịch khám và dịch vụ của phòng khám</p>
        </div>
        <button
          onClick={() => { setIsEditMode(false); setShowForm(true); }}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center gap-2 font-medium shadow-lg shadow-indigo-200"
        >
          <Calendar size={20} />
          + Tạo lịch hẹn
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng lịch hẹn</div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Calendar size={24} className="text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Chờ xác nhận</div>
              <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Hôm nay</div>
              <div className="text-3xl font-bold text-blue-600">{stats.today}</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Đã hoàn thành</div>
              <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Tìm theo khách hàng, thú cưng, bác sĩ, SĐT..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={dateFilter}
          onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={serviceFilter}
          onChange={(e) => { setServiceFilter(e.target.value as any); setCurrentPage(1); }}
        >
          <option value="all">Tất cả dịch vụ</option>
          {['Khám tổng quát', 'Tiêm phòng', 'Tắm & Cắt tỉa', 'Triệt sản', 'Phẫu thuật', 'Tái khám', 'Cấp cứu', 'Khác'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-2xl px-4 py-3"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="completed">Đã hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
          <option value="no-show">Không đến</option>
        </select>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Số lượng:</label>
          <select
            className="border border-gray-300 rounded-2xl px-4 py-3"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <AppointmentTable
        appointments={paginatedAppointments}
        onView={handleView}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={safeCurrentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &lt;&lt; Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {safeCurrentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={safeCurrentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Sau &gt;&gt;
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-auto">
            <AppointmentForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={() => { setShowForm(false); setIsEditMode(false); }}
              initialData={selectedAppointment || undefined}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedAppointment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-auto">
            <AppointmentDetail
              appointment={selectedAppointment}
              onClose={() => setShowDetail(false)}
              onEdit={handleEditClick}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;