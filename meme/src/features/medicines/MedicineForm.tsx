// src/features/medicines/MedicineForm.tsx
import React, { useState } from 'react';
import type {
  MedicineFormData,
  MedicineUpdateData,
  MedicineUnit,
  MedicineCategory,
  MedicineBatch,
} from './types';

interface MedicineFormProps {
  onSubmit: (data: MedicineFormData | MedicineUpdateData) => void;
  onCancel: () => void;
  initialData?: Partial<MedicineFormData & MedicineUpdateData & { batches?: MedicineBatch[] }>;
  isEdit?: boolean;
}

const UNIT_OPTIONS: MedicineUnit[] = ['Viên', 'Ống', 'Lọ', 'Hộp', 'Gói', 'Chai', 'Túi'];
const CATEGORY_OPTIONS: MedicineCategory[] = [
  'Giảm đau',
  'Kháng sinh',
  'Kháng viêm',
  'Vitamin',
  'Tẩy giun',
  'Sát trùng',
  'Khác',
];

const MedicineForm: React.FC<MedicineFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || ('Giảm đau' as MedicineCategory),
    description: initialData?.description || '',
    unit: initialData?.unit || ('Viên' as MedicineUnit),
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    minStock: initialData?.minStock || 0,
  });

  const [batches, setBatches] = useState<MedicineBatch[]>(
    initialData?.batches || [
      {
        id: Date.now(),
        medicineId: 0,
        batchCode: 'Lô 001',
        stock: initialData?.stock || 0,
        expiryDate: '',
      },
    ]
  );

  const [priceInput, setPriceInput] = useState<string>(
    initialData?.price ? initialData.price.toString() : ''
  );
  const [stockInput, setStockInput] = useState<string>(
    initialData?.stock ? initialData.stock.toString() : ''
  );
  const [minStockInput, setMinStockInput] = useState<string>(
    initialData?.minStock ? initialData.minStock.toString() : ''
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setPriceInput(numericValue);
      setFormData((prev) => ({ ...prev, price: Number(numericValue) || 0 }));
    } else if (name === 'stock') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setStockInput(numericValue);
      setFormData((prev) => ({ ...prev, stock: Number(numericValue) || 0 }));
      // Cập nhật stock của lô đầu tiên
      setBatches((prev) =>
        prev.map((b, idx) => (idx === 0 ? { ...b, stock: Number(numericValue) || 0 } : b))
      );
    } else if (name === 'minStock') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setMinStockInput(numericValue);
      setFormData((prev) => ({ ...prev, minStock: Number(numericValue) || 0 }));
    } else if (name === 'category') {
      setFormData((prev) => ({ ...prev, category: value as MedicineCategory }));
    } else if (name === 'unit') {
      setFormData((prev) => ({ ...prev, unit: value as MedicineUnit }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddBatch = () => {
    const newBatch: MedicineBatch = {
      id: Date.now(),
      medicineId: 0,
      batchCode: `Lô ${String(batches.length + 1).padStart(3, '0')}`,
      stock: 0,
      expiryDate: '',
    };
    setBatches([...batches, newBatch]);
  };

  const handleRemoveBatch = (index: number) => {
    if (batches.length > 1) {
      setBatches(batches.filter((_, idx) => idx !== index));
    }
  };

  const handleBatchChange = (
    index: number,
    field: keyof MedicineBatch,
    value: string | number
  ) => {
    const newBatches = [...batches];
    if (field === 'stock') {
      const numericValue = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value;
      newBatches[index] = { ...newBatches[index], stock: Number(numericValue) || 0 };
    } else {
      newBatches[index] = { ...newBatches[index], [field]: value };
    }
    setBatches(newBatches);

    // Tính tổng tồn kho từ các lô
    const totalStock = newBatches.reduce((sum, batch) => sum + batch.stock, 0);
    setFormData((prev) => ({ ...prev, stock: totalStock }));
    setStockInput(totalStock.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên thuốc');
      return;
    }
    if (formData.price <= 0) {
      alert('Vui lòng nhập giá hợp lệ');
      return;
    }

    // Tính tổng tồn kho từ các lô
    const totalStock = batches.reduce((sum, batch) => sum + batch.stock, 0);
    
    onSubmit({
      ...formData,
      stock: totalStock,
      batches: batches,
    } as any);
  };

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${isEdit ? 'text-purple-700' : 'text-red-700'}`}>
          {isEdit ? 'Cập nhật thuốc' : 'Thêm thuốc'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên thuốc */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên thuốc: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Đơn vị + Giá */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị:</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
            >
              {UNIT_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá:</label>
            <input
              type="text"
              name="price"
              value={priceInput}
              onChange={handleChange}
              placeholder="0"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quản lý Lô thuốc */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Quản lý thuốc</h3>
            <button
              type="button"
              onClick={handleAddBatch}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              + Thêm lô
            </button>
          </div>

          <div className="space-y-3">
            {batches.map((batch, index) => (
              <div key={batch.id} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Lô {index + 1}</span>
                  {batches.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBatch(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Xóa
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Mã lô (VD: Lô 001)"
                    value={batch.batchCode}
                    onChange={(e) => handleBatchChange(index, 'batchCode', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Số lượng"
                    value={batch.stock.toString()}
                    onChange={(e) =>
                      handleBatchChange(index, 'stock', e.target.value.replace(/[^0-9]/g, ''))
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={batch.expiryDate}
                    onChange={(e) => handleBatchChange(index, 'expiryDate', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Tổng tồn kho: <span className="font-semibold text-gray-900">{batches.reduce((sum, b) => sum + b.stock, 0)}</span>
          </div>
        </div>

        {/* Tồn kho tối thiểu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho tối thiểu:</label>
          <input
            type="text"
            name="minStock"
            value={minStockInput}
            onChange={handleChange}
            placeholder="0"
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
            {isEdit ? 'Hủy' : 'Đóng'}
          </button>
          <button
            type="submit"
            className={`flex-1 py-3 text-white rounded-xl font-medium transition-colors ${
              isEdit ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isEdit ? 'Cập nhật' : 'Thêm thuốc'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;