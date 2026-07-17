// src/features/appointments/AppointmentForm.tsx
import React, { useState } from 'react';
import type { AppointmentFormData, ServiceType } from './types';
import { DOCTORS, SERVICE_TYPES } from './types';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => void;
  onCancel: () => void;
  initialData?: Partial<AppointmentFormData>;
  isEdit?: boolean;
}

// Mock danh sách khách hàng & thú cưng (trong thực tế sẽ load từ API)
const MOCK_CUSTOMERS = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', pets: [
    { id: 1, name: 'Mimi', species: 'Chó' },
    { id: 3, name: 'Bông', species: 'Mèo' },
  ]},
  { id: 2, name: 'Trần Thị B', phone: '0912345678', pets: [
    { id: 2, name: 'Tom', species: 'Mèo' },
  ]},
  { id: 3, name: 'Lê Văn C', phone: '0987654321', pets: [
    { id: 4, name: 'Kiki', species: 'Chim' },
  ]},
];

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    customerId: initialData?.customerId || 0,
    customerName: initialData?.customerName || '',
    customerPhone: initialData?.customerPhone || '',
    petId: initialData?.petId || 0,
    petName: initialData?.petName || '',
    petSpecies: initialData?.petSpecies || '',
    appointmentDate: initialData?.appointmentDate || '',
    appointmentTime: initialData?.appointmentTime || '',
    serviceType: initialData?.serviceType || 'Khám tổng quát',
    doctorId: initialData?.doctorId || 1,
    doctorName: initialData?.doctorName || 'BS. Lê Tấn',
    reason: initialData?.reason || '',
    notes: initialData?.notes || '',
    estimatedCost: initialData?.estimatedCost || 0,
  });

  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(initialData?.customerId || 0);
  const [selectedPetId, setSelectedPetId] = useState<number>(initialData?.petId || 0);

  // Lấy danh sách thú cưng theo khách hàng
  const availablePets = MOCK_CUSTOMERS.find(c => c.id === selectedCustomerId)?.pets || [];

  const handleCustomerChange = (customerId: number) => {
    const customer = MOCK_CUSTOMERS.find(c => c.id === customerId);
    if (customer) {
      setSelectedCustomerId(customerId);
      setSelectedPetId(0);
      setFormData(prev => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.name,
        customerPhone: customer.phone,
        petId: 0,
        petName: '',
        petSpecies: '',
      }));
    }
  };

  const handlePetChange = (petId: number) => {
    const pet = availablePets.find(p => p.id === petId);
    if (pet) {
      setSelectedPetId(petId);
      setFormData(prev => ({
        ...prev,
        petId: pet.id,
        petName: pet.name,
        petSpecies: pet.species,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'doctorId') {
      const doctor = DOCTORS.find(d => d.id === Number(value));
      setFormData(prev => ({
        ...prev,
        doctorId: Number(value),
        doctorName: doctor?.name || '',
      }));
    } else if (name === 'estimatedCost') {
      setFormData(prev => ({ ...prev, [name]: Number(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold ${isEdit ? 'text-blue-700' : 'text-indigo-700'}`}>
          {isEdit ? '📅 Cập nhật lịch hẹn' : '📅 Tạo lịch hẹn mới'}
        </h2>
        <button onClick={onCancel} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Khách hàng */}
        <div className="border-t-2 border-indigo-200 pt-5">
          <h3 className="text-lg font-bold text-indigo-700 mb-4">👤 Thông tin khách hàng</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khách hàng: <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCustomerId}
                onChange={(e) => handleCustomerChange(Number(e.target.value))}
                required
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
              >
                <option value={0}>-- Chọn khách hàng --</option>
                {MOCK_CUSTOMERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vật nuôi: <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPetId}
                onChange={(e) => handlePetChange(Number(e.target.value))}
                required
                disabled={selectedCustomerId === 0}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500 disabled:bg-gray-100"
              >
                <option value={0}>-- Chọn vật nuôi --</option>
                {availablePets.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.species})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ngày giờ + Dịch vụ */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày hẹn: <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giờ hẹn: <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại dịch vụ: <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            >
              {SERVICE_TYPES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bác sĩ phụ trách: <span className="text-red-500">*</span>
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            >
              {DOCTORS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lý do + Chi phí */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lý do đến khám: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            placeholder="VD: Khám sức khỏe định kỳ, tiêm vắc-xin..."
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chi phí dự kiến (VNĐ):</label>
            <input
              type="number"
              name="estimatedCost"
              value={formData.estimatedCost || ''}
              onChange={handleChange}
              min="0"
              step="10000"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
            {formData.estimatedCost > 0 && (
              <p className="text-xs text-indigo-600 mt-1 font-medium">
                ≈ {formatCurrency(formData.estimatedCost)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú nội bộ:</label>
            <input
              type="text"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Lưu ý đặc biệt..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`flex-1 py-4 text-white rounded-2xl font-medium ${
              isEdit
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isEdit ? 'Cập nhật' : 'Tạo lịch hẹn'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;