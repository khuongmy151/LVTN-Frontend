// src/features/checkup/CheckupForm.tsx
import React, { useState } from 'react';
import type { CheckupFormData } from './types';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS } from './types';

interface CheckupFormProps {
  onSubmit: (data: CheckupFormData) => void;
  onCancel: () => void;
}

const CheckupForm: React.FC<CheckupFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CheckupFormData>({
    maLichHen: '',
    maBacSi: 0,
    tenBacSi: '',
    maBenhNhan: 0,
    tenBenhNhan: '',
    tenChuNuoi: '',
    tenThuCung: '',
    loaiThuCung: '',
    trieuChung: '',
    chanDoan: '',
    canNangLucKham: '',
    nhietDo: 38.0,
    ghiChu: '',
    ngayTaiKham: '',
  });

  const handleAppointmentChange = (maLichHen: string) => {
    const appointment = MOCK_APPOINTMENTS.find(a => a.maLichHen === maLichHen);
    if (appointment) {
      setFormData(prev => ({
        ...prev,
        maLichHen: appointment.maLichHen,
        maBenhNhan: 1, // Mock
        tenBenhNhan: appointment.tenBenhNhan,
        tenChuNuoi: appointment.tenBenhNhan,
        tenThuCung: appointment.tenThuCung,
        loaiThuCung: appointment.loaiThuCung,
      }));
    }
  };

  const handleDoctorChange = (doctorId: number) => {
    const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);
    if (doctor) {
      setFormData(prev => ({
        ...prev,
        maBacSi: doctor.id,
        tenBacSi: doctor.name,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'nhietDo') {
      setFormData(prev => ({ ...prev, nhietDo: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-rose-700">🏥 Tạo phiếu khám bệnh</h2>
        <button onClick={onCancel} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin lịch hẹn & Bác sĩ */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã lịch hẹn: <span className="text-red-500">*</span>
            </label>
            <select
              name="maLichHen"
              value={formData.maLichHen}
              onChange={(e) => handleAppointmentChange(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
            >
              <option value="">-- Chọn lịch hẹn --</option>
              {MOCK_APPOINTMENTS.map(apt => (
                <option key={apt.maLichHen} value={apt.maLichHen}>
                  {apt.maLichHen} - {apt.tenBenhNhan} ({apt.tenThuCung})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bác sĩ khám: <span className="text-red-500">*</span>
            </label>
            <select
              name="maBacSi"
              value={formData.maBacSi}
              onChange={(e) => handleDoctorChange(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
            >
              <option value={0}>-- Chọn bác sĩ --</option>
              {MOCK_DOCTORS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Thông tin bệnh nhân */}
        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
          <h3 className="font-bold text-rose-700 mb-3">👤 Thông tin bệnh nhân</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Tên chủ nuôi</div>
              <div className="font-semibold">{formData.tenChuNuoi || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Thú cưng</div>
              <div className="font-semibold">{formData.tenThuCung || '-'} ({formData.loaiThuCung || '-'})</div>
            </div>
          </div>
        </div>

        {/* Triệu chứng & Chẩn đoán */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Triệu chứng: <span className="text-red-500">*</span>
          </label>
          <textarea
            name="trieuChung"
            value={formData.trieuChung}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Mô tả các triệu chứng quan sát được..."
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chẩn đoán: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="chanDoan"
            value={formData.chanDoan}
            onChange={handleChange}
            required
            placeholder="VD: Viêm đường hô hấp, viêm dạ dày..."
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Nhiệt độ & Căn năng lực */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhiệt độ (°C): <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="nhietDo"
              value={formData.nhietDo}
              onChange={handleChange}
              step="0.1"
              min="35"
              max="43"
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
            />
            {formData.nhietDo >= 39.5 && (
              <p className="text-xs text-red-600 mt-1 font-medium">⚠️ Sốt cao!</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Căn năng lực khám: <span className="text-red-500">*</span>
            </label>
            <select
              name="canNangLucKham"
              value={formData.canNangLucKham}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
            >
              <option value="">-- Chọn --</option>
              <option value="Khám tổng quát">Khám tổng quát</option>
              <option value="Khám chuyên sâu">Khám chuyên sâu</option>
              <option value="Cấp cứu">Cấp cứu</option>
              <option value="Tái khám">Tái khám</option>
            </select>
          </div>
        </div>

        {/* Ngày tái khám */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày tái khám:
          </label>
          <input
            type="date"
            name="ngayTaiKham"
            value={formData.ngayTaiKham}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú:
          </label>
          <textarea
            name="ghiChu"
            value={formData.ghiChu}
            onChange={handleChange}
            rows={3}
            placeholder="Lưu ý thêm..."
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
          />
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
            className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-medium hover:bg-rose-700"
          >
            Tạo phiếu khám
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckupForm;