// src/features/services/ServiceForm.tsx
import React, { useState } from 'react';
import type { ServiceFormData, ServiceCategory } from './types';

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ServiceFormData>;
  isEdit?: boolean;
}

const CATEGORY_OPTIONS: ServiceCategory[] = [
  'Khám',
  'Siêu âm',
  'Xét nghiệm',
  'Tiêm phòng',
  'Phẫu thuật',
  'Chăm sóc',
  'Nha khoa',
  'Khác',
];

const ServiceForm: React.FC<ServiceFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: initialData?.name || '',
    category: initialData?.category || ('Khám' as ServiceCategory),
    description: initialData?.description || '',
    price: initialData?.price || 0,
  });

  const [priceInput, setPriceInput] = useState<string>(
    initialData?.price ? initialData.price.toString() : ''
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setPriceInput(numericValue);
      setFormData((prev) => ({ ...prev, price: Number(numericValue) || 0 }));
    } else if (name === 'category') {
      setFormData((prev) => ({ ...prev, category: value as ServiceCategory }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên dịch vụ');
      return;
    }
    if (formData.price <= 0) {
      alert('Vui lòng nhập giá hợp lệ');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2
          className={`text-2xl font-bold ${
            isEdit ? 'text-emerald-700' : 'text-red-700'
          }`}
        >
          {isEdit ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên dịch vụ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên dịch vụ: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nhập tên dịch vụ..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục: <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giá: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={priceInput}
            onChange={handleChange}
            required
            placeholder="0"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Nhập mô tả chi tiết dịch vụ..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            [ Hủy ]
          </button>
          <button
            type="submit"
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              isEdit
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isEdit ? '[ Cập nhật ]' : '[ Thêm ]'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;