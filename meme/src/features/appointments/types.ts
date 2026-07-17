// src/features/appointments/types.ts
export type AppointmentStatus = 
  | 'pending'      // Chờ xác nhận
  | 'confirmed'    // Đã xác nhận
  | 'completed'    // Đã hoàn thành
  | 'cancelled'    // Đã hủy
  | 'no-show';     // Khách không đến

export type ServiceType = 
  | 'Khám tổng quát'
  | 'Tiêm phòng'
  | 'Tắm & Cắt tỉa'
  | 'Triệt sản'
  | 'Phẫu thuật'
  | 'Tái khám'
  | 'Cấp cứu'
  | 'Khác';

export interface Appointment {
  id: number;
  // Thông tin khách hàng & vật nuôi
  customerId: number;
  customerName: string;
  customerPhone: string;
  petId: number;
  petName: string;
  petSpecies: string;

  // Thông tin lịch hẹn
  appointmentDate: string;   // YYYY-MM-DD
  appointmentTime: string;   // HH:mm
  serviceType: ServiceType;
  doctorId: number;
  doctorName: string;
  reason: string;            // Lý do đến
  notes?: string;            // Ghi chú nội bộ
  estimatedCost?: number;    // Chi phí dự kiến (VNĐ)

  // Trạng thái
  status: AppointmentStatus;
  createdAt: string;
  completedAt?: string;
  cancelReason?: string;
}

export interface AppointmentFormData {
  customerId: number;
  customerName: string;
  customerPhone: string;
  petId: number;
  petName: string;
  petSpecies: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: ServiceType;
  doctorId: number;
  doctorName: string;
  reason: string;
  notes?: string;
  estimatedCost?: number;
}

// Danh sách bác sĩ (mock)
export const DOCTORS = [
  { id: 1, name: 'BS. Lê Tấn' },
  { id: 2, name: 'BS. Phạm Hương' },
  { id: 3, name: 'BS. Trần Minh' },
];

// Danh sách dịch vụ
export const SERVICE_TYPES: ServiceType[] = [
  'Khám tổng quát',
  'Tiêm phòng',
  'Tắm & Cắt tỉa',
  'Triệt sản',
  'Phẫu thuật',
  'Tái khám',
  'Cấp cứu',
  'Khác',
];