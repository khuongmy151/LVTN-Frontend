// src/features/billing/BillingForm.tsx
import React, { useState } from 'react';
import type { InvoiceFormData, InvoiceItem, PaymentMethod, ItemType } from './types';
import { PAYMENT_METHODS } from './types';
import { Plus, Trash2 } from 'lucide-react';

interface BillingFormProps {
  onSubmit: (data: InvoiceFormData) => void;
  onCancel: () => void;
}

// Mock data
const MOCK_CUSTOMERS = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567' },
  { id: 2, name: 'Trần Thị B', phone: '0912345678' },
  { id: 3, name: 'Lê Văn C', phone: '0987654321' },
];

const MOCK_EMPLOYEES = [
  { id: 1, name: 'BS. Lê Tấn' },
  { id: 2, name: 'BS. Phạm Hương' },
  { id: 3, name: 'BS. Trần Minh' },
];

const MOCK_SERVICES = [
  { id: 1, name: 'Khám tổng quát', donGia: 300000 },
  { id: 2, name: 'Tiêm vắc-xin', donGia: 250000 },
  { id: 3, name: 'Tắm & Cắt tỉa', donGia: 500000 },
  { id: 4, name: 'Xét nghiệm máu', donGia: 700000 },
];

const MOCK_MEDICINES = [
  { id: 1, name: 'Thuốc kháng sinh', donGia: 150000 },
  { id: 2, name: 'Thuốc giảm đau', donGia: 100000 },
  { id: 3, name: 'Vitamin', donGia: 80000 },
];

const BillingForm: React.FC<BillingFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    maPhieuKham: '',
    maKhachHang: 0,
    tenKhachHang: '',
    sdtKhachHang: '',
    maNhanVien: 0,
    tenNhanVien: '',
    phuongThucThanhToan: 'Tiền mặt',
    ghiChu: '',
    chiTietHoaDon: [],
  });

  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    loai: 'dich_vu',
    soLuong: 1,
    donGia: 0,
  });

  const handleCustomerChange = (customerId: number) => {
    const customer = MOCK_CUSTOMERS.find(c => c.id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        maKhachHang: customer.id,
        tenKhachHang: customer.name,
        sdtKhachHang: customer.phone,
      }));
    }
  };

  const handleEmployeeChange = (employeeId: number) => {
    const employee = MOCK_EMPLOYEES.find(e => e.id === employeeId);
    if (employee) {
      setFormData(prev => ({
        ...prev,
        maNhanVien: employee.id,
        tenNhanVien: employee.name,
      }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.ten || !newItem.soLuong || !newItem.donGia) {
      alert('Vui lòng điền đầy đủ thông tin mục');
      return;
    }

    const item: InvoiceItem = {
      id: Date.now(),
      loai: newItem.loai as ItemType,
      ten: newItem.ten,
      soLuong: newItem.soLuong || 1,
      donGia: newItem.donGia || 0,
      thanhTien: (newItem.soLuong || 1) * (newItem.donGia || 0),
      maChiTietDonThuoc: newItem.loai === 'thuoc' ? newItem.id : undefined,
      maDichVu: newItem.loai === 'dich_vu' ? newItem.id : undefined,
    };

    setFormData(prev => ({
      ...prev,
      chiTietHoaDon: [...prev.chiTietHoaDon, item],
    }));

    setNewItem({ loai: 'dich_vu', soLuong: 1, donGia: 0, ten: '' });
  };

  const handleRemoveItem = (id: number) => {
    setFormData(prev => ({
      ...prev,
      chiTietHoaDon: prev.chiTietHoaDon.filter(item => item.id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.chiTietHoaDon.length === 0) {
      alert('Vui lòng thêm ít nhất một mục vào hóa đơn');
      return;
    }
    onSubmit(formData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const totalAmount = formData.chiTietHoaDon.reduce((sum, item) => sum + item.thanhTien, 0);

  const availableItems = newItem.loai === 'thuoc' ? MOCK_MEDICINES : MOCK_SERVICES;

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-violet-700">💰 Tạo hóa đơn mới</h2>
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
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-violet-500"
              placeholder="VD: PK001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khách hàng: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.maKhachHang}
              onChange={(e) => handleCustomerChange(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-violet-500"
            >
              <option value={0}>-- Chọn khách hàng --</option>
              {MOCK_CUSTOMERS.map(c => (
                <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhân viên: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.maNhanVien}
              onChange={(e) => handleEmployeeChange(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-violet-500"
            >
              <option value={0}>-- Chọn nhân viên --</option>
              {MOCK_EMPLOYEES.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phương thức thanh toán: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.phuongThucThanhToan}
              onChange={(e) => setFormData(prev => ({ ...prev, phuongThucThanhToan: e.target.value as PaymentMethod }))}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-violet-500"
            >
              {PAYMENT_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Thêm mục */}
        <div className="border-t-2 border-violet-200 pt-5">
          <h3 className="text-lg font-bold text-violet-700 mb-4">📋 Thêm mục vào hóa đơn</h3>
          <div className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
              <select
                value={newItem.loai}
                onChange={(e) => setNewItem(prev => ({ ...prev, loai: e.target.value as ItemType, ten: '', id: undefined }))}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              >
                <option value="dich_vu">Dịch vụ</option>
                <option value="thuoc">Thuốc</option>
                <option value="chi_dinh">Chỉ định</option>
              </select>
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
              <select
                value={newItem.ten || ''}
                onChange={(e) => {
                  const item = availableItems.find(i => i.name === e.target.value);
                  if (item) {
                    setNewItem(prev => ({
                      ...prev,
                      ten: item.name,
                      donGia: item.donGia,
                      id: item.id,
                    }));
                  }
                }}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              >
                <option value="">-- Chọn --</option>
                {availableItems.map(i => (
                  <option key={i.id} value={i.name}>{i.name}</option>
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
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá</label>
              <input
                type="number"
                min="0"
                value={newItem.donGia}
                onChange={(e) => setNewItem(prev => ({ ...prev, donGia: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-3 bg-violet-600 text-white rounded-2xl hover:bg-violet-700 flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách mục */}
        {formData.chiTietHoaDon.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4">
            <h4 className="font-bold text-gray-700 mb-3">Danh sách mục</h4>
            <div className="space-y-2">
              {formData.chiTietHoaDon.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {item.loai === 'thuoc' ? '💊' : item.loai === 'dich_vu' ? '🏥' : '📋'} {item.ten}
                    </div>
                    <div className="text-sm text-gray-500">
                      SL: {item.soLuong} x {formatCurrency(item.donGia)}
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
            <div className="mt-4 pt-4 border-t-2 border-violet-300 flex justify-between items-center">
              <div className="text-lg font-bold text-gray-700">Tổng cộng:</div>
              <div className="text-2xl font-bold text-violet-600">{formatCurrency(totalAmount)}</div>
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
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-violet-500"
            placeholder="Ghi chú thêm..."
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
            className="flex-1 py-4 bg-violet-600 text-white rounded-2xl font-medium hover:bg-violet-700"
          >
            Tạo hóa đơn
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;