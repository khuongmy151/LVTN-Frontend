// src/features/prescriptions/types.ts
export interface Prescription {
  maDonThuoc: string;           // Mã đơn thuốc (tự động sinh)
  maPhieuKham: string;          // Mã phiếu khám
  maBenhNhan: number;
  tenBenhNhan: string;
  tenChuNuoi: string;
  tenThuCung: string;
  loaiThuCung: string;
  maBacSi: number;
  tenBacSi: string;
  chanDoan: string;             // Chẩn đoán
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  chiTietDonThuoc: PrescriptionItem[];
  tongTien: number;
}

export interface PrescriptionItem {
  id: number;
  maDonThuoc?: string;
  maThuoc: number;
  tenThuoc: string;
  soLuong: number;
  giaBan: number;
  lieuDung: string;             // Liều dùng (VD: 1 viên/lần)
  cachDung: string;             // Cách dùng (VD: Uống sau ăn)
  ghiChu?: string;
  thanhTien: number;            // = soLuong * giaBan
}

export interface PrescriptionFormData {
  maPhieuKham: string;
  maBenhNhan: number;
  tenBenhNhan: string;
  tenChuNuoi: string;
  tenThuCung: string;
  loaiThuCung: string;
  maBacSi: number;
  tenBacSi: string;
  chanDoan: string;
  ghiChu?: string;
  chiTietDonThuoc: PrescriptionItem[];
}

// Mock data
export const MOCK_DOCTORS = [
  { id: 1, name: 'BS. Lê Tấn' },
  { id: 2, name: 'BS. Phạm Hương' },
  { id: 3, name: 'BS. Trần Minh' },
];

export const MOCK_MEDICINES = [
  { id: 1, name: 'Amoxicillin 500mg', giaBan: 5000, donVi: 'viên' },
  { id: 2, name: 'Paracetamol 500mg', giaBan: 3000, donVi: 'viên' },
  { id: 3, name: 'Cefalexin 500mg', giaBan: 8000, donVi: 'viên' },
  { id: 4, name: 'Metronidazole 250mg', giaBan: 4000, donVi: 'viên' },
  { id: 5, name: 'Vitamin C 500mg', giaBan: 2000, donVi: 'viên' },
  { id: 6, name: 'Thuốc nhỏ mắt', giaBan: 50000, donVi: 'chai' },
  { id: 7, name: 'Thuốc bôi da', giaBan: 35000, donVi: 'tuýp' },
  { id: 8, name: 'Siro ho', giaBan: 45000, donVi: 'chai' },
];