// src/features/pets/PetForm.tsx
import React, { useState } from 'react';
import type { PetFormData, PetSpecies, PetGender } from './types';

interface PetFormProps {
  onSubmit: (data: PetFormData) => void;
  onCancel: () => void;
  initialData?: Partial<PetFormData>;
  isEdit?: boolean;
}

const PetForm: React.FC<PetFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<PetFormData>({
    ten: initialData?.ten || '',
    loai: initialData?.loai || 'Chó',
    giong: initialData?.giong || '',
    gioi_tinh: initialData?.gioi_tinh || 'Đực',
    ngay_sinh: initialData?.ngay_sinh || '',
    can_nang: initialData?.can_nang || 0,
    mau_long: initialData?.mau_long || '',
    ghi_chu: initialData?.ghi_chu || '',
    ma_khach_hang: initialData?.ma_khach_hang || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === 'can_nang') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === 'ma_khach_hang') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ten.trim()) {
      alert('Vui lòng nhập tên vật nuôi');
      return;
    }
    if (!formData.giong.trim()) {
      alert('Vui lòng nhập giống');
      return;
    }
    if (!formData.mau_long.trim()) {
      alert('Vui lòng nhập màu lông');
      return;
    }
    if (formData.can_nang <= 0) {
      alert('Vui lòng nhập cân nặng hợp lệ');
      return;
    }
    if (formData.ma_khach_hang <= 0) {
      alert('Vui lòng chọn khách hàng');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold ${isEdit ? 'text-blue-700' : 'text-amber-700'}`}>
          {isEdit ? '🐾 Cập nhật vật nuôi' : '🐾 Thêm vật nuôi mới'}
        </h2>
        <button onClick={onCancel} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tên + Loại */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên vật nuôi: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ten"
              value={formData.ten}
              onChange={handleChange}
              required
              placeholder="VD: Mimi, Tom..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại: <span className="text-red-500">*</span>
            </label>
            <select
              name="loai"
              value={formData.loai}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            >
              <option value="Chó">🐕 Chó</option>
              <option value="Mèo">🐈 Mèo</option>
              <option value="Chim">🦜 Chim</option>
              <option value="Thỏ">🐇 Thỏ</option>
              <option value="Khác">🐾 Khác</option>
            </select>
          </div>
        </div>

        {/* Giống + Màu lông */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giống: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="giong"
              value={formData.giong}
              onChange={handleChange}
              required
              placeholder="VD: Golden, Poodle..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Màu lông: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mau_long"
              value={formData.mau_long}
              onChange={handleChange}
              required
              placeholder="VD: Vàng kem, Đen trắng..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Giới tính + Ngày sinh */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính:</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gioi_tinh"
                  value="Đực"
                  checked={formData.gioi_tinh === 'Đực'}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-600"
                />
                <span>Đực ♂</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gioi_tinh"
                  value="Cái"
                  checked={formData.gioi_tinh === 'Cái'}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-600"
                />
                <span>Cái ♀</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh:</label>
            <input
              type="date"
              name="ngay_sinh"
              value={formData.ngay_sinh}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Cân nặng + Mã khách hàng */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cân nặng (kg): <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="can_nang"
              value={formData.can_nang}
              onChange={handleChange}
              step="0.1"
              min="0"
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã khách hàng: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="ma_khach_hang"
              value={formData.ma_khach_hang}
              onChange={handleChange}
              min="1"
              required
              placeholder="Nhập mã khách hàng"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú:</label>
          <textarea
            name="ghi_chu"
            value={formData.ghi_chu || ''}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-500"
            placeholder="Tính cách, thói quen, lưu ý đặc biệt..."
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
            className={`flex-1 py-4 text-white rounded-2xl font-medium ${
              isEdit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {isEdit ? 'Cập nhật' : 'Thêm vật nuôi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;