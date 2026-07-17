// src/features/inventory/InventoryForm.tsx
import React, { useState } from 'react';
import type { InventoryRecord, InventoryItem, InventoryFormData } from './types';

interface InventoryFormProps {
  onSubmit: (data: InventoryFormData) => void;
  onCancel: () => void;
  initialData?: InventoryRecord | null;
  isEdit?: boolean;
}

const mockMedicines = [
  { id: 1, name: 'Phanadol', unit: 'Vi' },
  { id: 2, name: 'Amoxicillin', unit: 'Gói' },
  { id: 3, name: 'ACETYL C', unit: 'Hộp' },
  { id: 4, name: 'Vitamin B Complex', unit: 'Lọ' },
  { id: 5, name: 'Ivermectin', unit: 'Ống' },
  { id: 6, name: 'Dexamethasone', unit: 'Ống' },
];

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const InventoryForm: React.FC<InventoryFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [items, setItems] = useState<InventoryItem[]>(initialData?.items || []);
  const [note, setNote] = useState(initialData?.note || '');

  const [selectedMedicineId, setSelectedMedicineId] = useState<number>(0);
  const [batchCode, setBatchCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const selectedMedicine = mockMedicines.find((m) => m.id === selectedMedicineId);

  const handleAddItem = () => {
    if (!selectedMedicine || !quantity || !price) return;
    const qty = parseInt(quantity);
    const prc = parseInt(price);
    const newItem: InventoryItem = {
      id: Date.now(),
      medicineName: selectedMedicine.name,
      batchCode: batchCode,
      quantity: qty,
      unit: selectedMedicine.unit,
      price: prc,
      totalPrice: qty * prc,
    };

    setItems([...items, newItem]);
    setSelectedMedicineId(0);
    setBatchCode('');
    setQuantity('');
    setPrice('');
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Vui lòng thêm ít nhất một loại thuốc vào phiếu!');
      return;
    }
    onSubmit({
      id: initialData?.id,
      note,
      items,
    });
  };

  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2
          className={`text-2xl font-bold ${
            isEdit ? 'text-amber-700' : 'text-red-600'
          }`}
        >
          {isEdit ? 'Cập nhật Phiếu nhập' : 'Tạo Phiếu nhập'}
        </h2>
        <button
          onClick={onCancel}
          className="text-3xl text-gray-400 hover:text-gray-600 leading-none"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CỘT TRÁI */}
        <div className="space-y-4">
          {/* Khu vực thêm thuốc */}
          <div className="bg-red-50 p-5 rounded-2xl border border-red-200">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Thêm thuốc vào phiếu
            </h3>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-red-500"
                value={selectedMedicineId}
                onChange={(e) => setSelectedMedicineId(Number(e.target.value))}
              >
                <option value={0}>-- Chọn thuốc --</option>
                {mockMedicines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              {selectedMedicine && (
                <>
                  <input
                    type="text"
                    placeholder="Mã lô (VD: Lô 001)"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red-500"
                    value={batchCode}
                    onChange={(e) => setBatchCode(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Số lượng"
                      className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red-500"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Giá nhập (VNĐ)"
                      className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-red-500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                  >
                    + Thêm thuốc
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Danh sách thuốc đã thêm */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-800 text-sm">
                Danh sách thuốc ({items.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Mã lô</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Tên thuốc</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Thành tiền</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-400">
                        Chưa có thuốc nào trong phiếu
                      </td>
                    </tr>
                  ) : (
                    items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2.5 text-gray-600">{idx + 1}</td>
                        <td className="px-3 py-2.5 text-gray-700">{item.batchCode || '-'}</td>
                        <td className="px-3 py-2.5 font-medium text-gray-900">
                          {item.medicineName}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700">
                          {item.price.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-gray-800">
                          {formatMoney(item.totalPrice)}
                        </td>
                        <td className="px-3 py-2.5">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 font-medium text-xs"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {items.length > 0 && (
                  <tfoot>
                    <tr className="bg-red-50">
                      <td colSpan={5} className="px-3 py-3 text-right font-bold text-gray-800">
                        Tổng tiền:
                      </td>
                      <td className="px-3 py-3 font-bold text-red-700 text-lg">
                        {formatMoney(totalAmount)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ghi chú:
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-4 py-3 h-40 focus:outline-none focus:border-red-500 resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú cho phiếu nhập này..."
            />
          </div>

          {/* Thống kê nhanh */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-5 border border-red-100">
            <div className="text-sm text-gray-600 mb-1">Tổng giá trị phiếu nhập</div>
            <div className="text-3xl font-bold text-red-700">
              {formatMoney(totalAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Số loại thuốc: <span className="font-semibold">{items.length}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 text-white rounded-xl font-medium transition-colors shadow-sm ${
                isEdit
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isEdit ? 'Cập nhật' : 'Tạo phiếu'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;