// src/features/customers/CustomerForm.tsx
import React, { useState } from 'react';
import type { CustomerFormData } from './types';

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  onCancel: () => void;
  initialData?: Partial<CustomerFormData>;
  isEdit?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    ten: initialData?.ten || '',
    dienThoai: initialData?.dienThoai || '',
    email: initialData?.email || '',
    diaChi: initialData?.diaChi || '',
    maKhach: initialData?.maKhach || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold ${isEdit ? 'text-blue-700' : 'text-emerald-700'}`}>
          {isEdit ? 'Cập nhật khách hàng' : 'THÊM KHÁCH HÀNG MỚI'}
        </h2>
        <button onClick={onCancel} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tên khách hàng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ tên: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ten"
            value={formData.ten}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-emerald-500"
            placeholder="Nhập họ tên khách hàng"
          />
        </div>

        {/* Số điện thoại + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại: <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="dienThoai"
              value={formData.dienThoai}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-emerald-500"
              placeholder="09xxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-emerald-500"
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="diaChi"
            value={formData.diaChi}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-emerald-500"
            placeholder="Nhập địa chỉ"
          />
        </div>

        {/* Mã khách (tùy chọn) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mã khách:</label>
          <input
            type="text"
            name="maKhach"
            value={formData.maKhach || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-emerald-500"
            placeholder="Mã khách (nếu có)"
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
              isEdit
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isEdit ? 'Cập nhật' : 'Thêm khách hàng'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;