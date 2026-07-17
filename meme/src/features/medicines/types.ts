// src/features/medicines/types.ts
export type MedicineUnit = 'Viên' | 'Ống' | 'Lọ' | 'Hộp' | 'Gói' | 'Chai' | 'Túi';

export type MedicineCategory =
  | 'Giảm đau'
  | 'Kháng sinh'
  | 'Kháng viêm'
  | 'Vitamin'
  | 'Tẩy giun'
  | 'Sát trùng'
  | 'Khác';

export type SortOption =
  | 'default'
  | 'stock-asc'
  | 'stock-desc'
  | 'min-stock-asc'
  | 'min-stock-desc'
  | 'price-asc'
  | 'price-desc';

export interface MedicineBatch {
  id: number;
  medicineId: number;
  batchCode: string; // Mã lô: "Lô 001"
  stock: number; // Tồn kho của lô
  expiryDate: string; // HSD: ISO date
}

export interface Medicine {
  id: number;
  name: string;
  category: MedicineCategory;
  description: string;
  unit: MedicineUnit;
  price: number;
  stock: number; // Tổng tồn kho
  minStock: number; // Tồn tối thiểu
  batches?: MedicineBatch[]; // Các lô thuốc
  status?: 'active' | 'inactive'; // Trạng thái
  expiryDate?: string; // HSD tổng (optional)
}

export interface MedicineFormData {
  name: string;
  category: MedicineCategory;
  description: string;
  unit: MedicineUnit;
  price: number;
  stock: number; // Chỉ có khi THÊM
  minStock: number;
  batches?: MedicineBatch[]; // Thêm field batches
}

export interface MedicineUpdateData {
  name: string;
  category: MedicineCategory;
  description: string;
  unit: MedicineUnit;
  price: number;
  minStock: number; // KHÔNG có stock (vì không cập nhật tồn kho hiện tại)
  batches?: MedicineBatch[]; // Thêm field batches
}

export interface MedicineBatchFormData {
  batchCode: string;
  stock: number;
  expiryDate: string;
}