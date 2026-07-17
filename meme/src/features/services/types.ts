// src/features/services/types.ts

export type ServiceStatus = 'active' | 'inactive';

export type ServiceCategory =
  | 'Khám'
  | 'Siêu âm'
  | 'Xét nghiệm'
  | 'Tiêm phòng'
  | 'Phẫu thuật'
  | 'Chăm sóc'
  | 'Nha khoa'
  | 'Khác';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface Service {
  id: number;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  status: ServiceStatus; // 'active' = Đang áp dụng, 'inactive' = Ngừng
}

export interface ServiceFormData {
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
}