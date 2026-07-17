// src/features/prescriptions/PrescriptionForm.tsx
import React, { useState } from 'react';
import type { PrescriptionFormData, PrescriptionItem } from './types';
import { MOCK_DOCTORS, MOCK_MEDICINES } from './types';
import { Plus, Trash2 } from 'lucide-react';

interface PrescriptionFormProps {
  onSubmit: (data: PrescriptionFormData) => void;
  onCancel: () => void;
}

// Mock patients
const MOCK_PATIENTS = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', pets: [
    { name: 'Mimi', species: 'Chó' },
    { name: 'Bông', species: 'Mèo' },
  ]},
  { id: 2, name: 'Trần Thị B', phone: '0912345678', pets: [
    { name: 'Tom', species: 'Mèo' },
  ]},
  { id: 3, name: 'Lê Văn C', phone: '0987654321', pets: [
    { name: 'Kiki', species: 'Chim' },
  ]},
];

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PrescriptionFormData>({
    maPhieuKham: '',
    maBenhNhan: 0,
    tenBenhNhan: '',
    tenChuNuoi: '',
    tenThuCung: '',
    loaiThuCung: '',
    maBacSi: 0,
    tenBacSi: '',
    chanDoan: '',
    ghiChu: '',
    chiTietDonThuoc: [],
  });

  const [newItem, setNewItem] = useState<Partial<PrescriptionItem>>({
    maThuoc: 0,
    soLuong: 1,
    lieuDung: '',
    cachDung: '',
  });

  const handlePatientChange = (patientId: number) => {
    const patient = MOCK_PATIENTS.find(p => p.id === patientId);
    if (patient) {
      setFormData(prev => ({
        ...prev,
        maBenhNhan: patient.id,
        tenBenhNhan: patient.name,
        tenChuNuoi: patient.name,
        tenThuCung: '',
        loaiThuCung: '',
      }));
    }
  };

  const handlePetChange = (petName: string) => {
    const patient = MOCK_PATIENTS.find(p => p.id === formData.maBenhNhan);
    const pet = patient?.pets.find(p => p.name === petName);
    if (pet) {
      setFormData(prev => ({
        ...prev,
        tenThuCung: pet.name,
        loaiThuCung: pet.species,
      }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.maThuoc || !newItem.soLuong || !newItem.lieuDung || !newItem.cachDung) {
      alert('Vui lòng điền đầy đủ thông tin thuốc');
      return;
    }

    const medicine = MOCK_MEDICINES.find(m => m.id === newItem.maThuoc);
    if (!medicine) return;

    const item: PrescriptionItem = {
      id: Date.now(),
      maThuoc: medicine.id,
      tenThuoc: medicine.name,
      soLuong: newItem.soLuong || 1,
      giaBan: medicine.giaBan,
      lieuDung: newItem.lieuDung || '',
      cachDung: newItem.cachDung || '',
      thanhTien: (newItem.soLuong || 1) * medicine.giaBan,
    };

    setFormData(prev => ({
      ...prev,
      chiTietDonThuoc: [...prev.chiTietDonThuoc, item],
    }));

    setNewItem({ maThuoc: 0, soLuong: 1, lieuDung: '', cachDung: '' });
  };

  const handleRemoveItem = (id: number) => {
    setFormData(prev => ({
      ...prev,
      chiTietDonThuoc: prev.chiTietDonThuoc.filter(item => item.id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.chiTietDonThuoc.length === 0) {
      alert('Vui lòng thêm ít nhất một loại thuốc');
      return;
    }
    onSubmit(formData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const totalAmount = formData.chiTietDonThuoc.reduce((sum, item) => sum + item.thanhTien, 0);
  const currentPatient = MOCK_PATIENTS.find(p => p.id === formData.maBenhNhan);

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-teal-700">💊 Kê đơn thuốc mới</h2>
        <button onClick={onCancel} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã phiếu khám: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.maPhieuKham}
              onChange={(e) => setFormData(prev => ({ ...prev, maPhieuKham: e.target.value }))}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500"
              placeholder="VD: PK001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bác sĩ kê đơn: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.maBacSi}
              onChange={(e) => {
                const doctor = MOCK_DOCTORS.find(d => d.id === Number(e.target.value));
                setFormData(prev => ({
                  ...prev,
                  maBacSi: Number(e.target.value),
                  tenBacSi: doctor?.name || '',
                }));
              }}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500"
            >
              <option value={0}>-- Chọn bác sĩ --</option>
              {MOCK_DOCTORS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bệnh nhân & Thú cưng */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bệnh nhân (Chủ nuôi): <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.maBenhNhan}
              onChange={(e) => handlePatientChange(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500"
            >
              <option value={0}>-- Chọn bệnh nhân --</option>
              {MOCK_PATIENTS.map(p => (
                <option key={p.id} value={p.id}>{p.name} - {p.phone}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thú cưng: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.tenThuCung}
              onChange={(e) => handlePetChange(e.target.value)}
              required
              disabled={!formData.maBenhNhan}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500 disabled:bg-gray-100"
            >
              <option value="">-- Chọn thú cưng --</option>
              {currentPatient?.pets.map(pet => (
                <option key={pet.name} value={pet.name}>{pet.name} ({pet.species})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chẩn đoán */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chẩn đoán: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.chanDoan}
            onChange={(e) => setFormData(prev => ({ ...prev, chanDoan: e.target.value }))}
            required
            placeholder="VD: Viêm đường hô hấp, viêm da..."
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Thêm thuốc */}
        <div className="border-t-2 border-teal-200 pt-5">
          <h3 className="text-lg font-bold text-teal-700 mb-4">💊 Thêm thuốc vào đơn</h3>
          <div className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên thuốc</label>
              <select
                value={newItem.maThuoc || 0}
                onChange={(e) => setNewItem(prev => ({ ...prev, maThuoc: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              >
                <option value={0}>-- Chọn thuốc --</option>
                {MOCK_MEDICINES.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({formatCurrency(m.giaBan)}/{m.donVi})</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
              <input
                type="number"
                min="1"
                value={newItem.soLuong}
                onChange={(e) => setNewItem(prev => ({ ...prev, soLuong: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Liều dùng</label>
              <input
                type="text"
                value={newItem.lieuDung}
                onChange={(e) => setNewItem(prev => ({ ...prev, lieuDung: e.target.value }))}
                placeholder="VD: 1 viên/lần"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cách dùng</label>
              <input
                type="text"
                value={newItem.cachDung}
                onChange={(e) => setNewItem(prev => ({ ...prev, cachDung: e.target.value }))}
                placeholder="VD: Uống sau ăn"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách thuốc */}
        {formData.chiTietDonThuoc.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4">
            <h4 className="font-bold text-gray-700 mb-3">Danh sách thuốc</h4>
            <div className="space-y-2">
              {formData.chiTietDonThuoc.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">💊 {item.tenThuoc}</div>
                    <div className="text-sm text-gray-500">
                      SL: {item.soLuong} • {item.lieuDung} • {item.cachDung}
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 mr-4">
                    {formatCurrency(item.thanhTien)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t-2 border-teal-300 flex justify-between items-center">
              <div className="text-lg font-bold text-gray-700">Tổng cộng:</div>
              <div className="text-2xl font-bold text-teal-600">{formatCurrency(totalAmount)}</div>
            </div>
          </div>
        )}

        {/* Ghi chú */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú:</label>
          <textarea
            value={formData.ghiChu || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, ghiChu: e.target.value }))}
            rows={3}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500"
            placeholder="Lưu ý thêm..."
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
            className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-medium hover:bg-teal-700"
          >
            Kê đơn thuốc
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;