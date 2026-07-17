// src/features/inventory/types.ts

export type InventoryStatus = 'Đang xử lý' | 'Hoàn thành' | 'Đã hủy';
export type SortOption = 'default' | 'total-asc' | 'total-desc' | 'date-asc' | 'date-desc';

// Dòng thuốc trong phiếu nhập
export interface InventoryItem {
  id: number;
  medicineName: string;
  batchCode: string;     // Mã lô
  quantity: number;
  unit: string;          // Đơn vị tính
  price: number;         // Đơn giá nhập
  totalPrice: number;    // Thành tiền = quantity * price
}

// Phiếu nhập kho
export interface InventoryRecord {
  id: number;
  code: string;          // Mã phiếu (HEHE0001...)
  staffName: string;     // Nhân viên tạo
  totalAmount: number;   // Tổng tiền của phiếu
  status: InventoryStatus;
  createdDate: string;   // Ngày lập
  note: string;          // Ghi chú
  items: InventoryItem[]; // Danh sách thuốc trong phiếu
}

// Form data khi submit
export interface InventoryFormData {
  id?: number;
  note: string;
  items: InventoryItem[];
}