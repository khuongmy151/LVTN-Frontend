// src/features/pets/types.ts
export type PetSpecies = 'Chó' | 'Mèo' | 'Chim' | 'Thỏ' | 'Khác';
export type PetGender = 'Đực' | 'Cái';

export interface Pet {
  ma_vat_nuoi: number;        // Mã vật nuôi (PK)
  ten: string;                 // Tên
  loai: PetSpecies;            // Loại (Chó/Mèo/Chim/Thỏ/Khác)
  giong: string;               // Giống
  gioi_tinh: PetGender;        // Giới tính
  ngay_sinh: string;           // Ngày sinh
  can_nang: number;            // Cân nặng (kg)
  mau_long: string;            // Màu lông
  ghi_chu?: string;            // Ghi chú
  ma_khach_hang: number;       // Mã khách hàng (FK)
  da_xoa: boolean;             // Đã xóa (0/1)
  ngay_tao: string;            // Ngày tạo
  ngay_cap_nhat?: string;      // Ngày cập nhật
  // Fields mở rộng (không có trong DB nhưng cần cho UI)
  ten_khach_hang?: string;     // Tên chủ (từ bảng customer)
  sdt_khach_hang?: string;     // SĐT chủ (từ bảng customer)
}

export interface PetFormData {
  ten: string;
  loai: PetSpecies;
  giong: string;
  gioi_tinh: PetGender;
  ngay_sinh: string;
  can_nang: number;
  mau_long: string;
  ghi_chu?: string;
  ma_khach_hang: number;
}

export interface PetUpdateData extends PetFormData {
  ngay_cap_nhat: string;
}