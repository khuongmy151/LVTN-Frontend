// src/features/medicines/MedicineBatchModal.tsx
import React, { useState } from 'react';
import type { Medicine, MedicineBatch, MedicineBatchFormData } from './types';

interface MedicineBatchModalProps {
  medicine: Medicine;
  onClose: () => void;
  onAddBatch: (medicineId: number, batch: MedicineBatch) => void;
  onDeleteBatch: (medicineId: number, batchId: number) => void;
}

const MedicineBatchModal: React.FC<MedicineBatchModalProps> = ({
  medicine,
  onClose,
  onAddBatch,
  onDeleteBatch,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<MedicineBatchFormData>({
    batchCode: '',
    stock: 0,
    expiryDate: '',
  });
  const [stockInput, setStockInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batchCode.trim()) {
      alert('Vui lòng nhập mã lô');
      return;
    }
    const newBatch: MedicineBatch = {
      id: Date.now(),
      medicineId: medicine.id,
      batchCode: formData.batchCode,
      stock: formData.stock,
      expiryDate: formData.expiryDate,
    };
    onAddBatch(medicine.id, newBatch);
    setShowForm(false);
    setFormData({ batchCode: '', stock: 0, expiryDate: '' });
    setStockInput('');
  };

  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lô thuốc</h2>
          <p className="text-sm text-gray-600 mt-1">{medicine.name}</p>
        </div>
        <button
          onClick={onClose}
          className="text-3xl text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Danh sách lô */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mã lô
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tồn kho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                HSD
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(medicine.batches || []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  Chưa có lô thuốc nào
                </td>
              </tr>
            ) : (
              (medicine.batches || []).map((batch) => {
                const isExpired = new Date(batch.expiryDate) < new Date();
                return (
                  <tr key={batch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {batch.batchCode}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{batch.stock}</td>
                    <td className="px-6 py-3">
                      <span
                        className={
                          isExpired
                            ? 'text-red-600 font-semibold'
                            : 'text-gray-700'
                        }
                      >
                        {new Date(batch.expiryDate).toLocaleDateString('vi-VN')}
                        {isExpired && ' (Hết hạn)'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => onDeleteBatch(medicine.id, batch.id)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Form thêm lô */}
      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <h3 className="font-semibold text-gray-800">Thêm lô mới</h3>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Mã lô (VD: Lô 003)"
              value={formData.batchCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, batchCode: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Số lượng"
              value={stockInput}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, '');
                setStockInput(v);
                setFormData((prev) => ({ ...prev, stock: Number(v) || 0 }));
              }}
              className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
            >
              Thêm lô
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 font-medium transition-colors"
        >
          + Thêm lô thuốc mới
        </button>
      )}

      {/* Nút đóng */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default MedicineBatchModal;