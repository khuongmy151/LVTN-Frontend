// src/features/checkup/types.ts
export interface Checkup {
  maPhieuKham: string;              // Mã phiếu khám
  maLichHen: string;                // Mã lịch hẹn
  maBacSi: number;
  tenBacSi: string;
  maBenhNhan: number;
  tenBenhNhan: string;
  tenChuNuoi: string;
  tenThuCung: string;
  loaiThuCung: string;
  trieuChung: string;               // Triệu chứng
  chanDoan: string;                 // Chẩn đoán
  canNangLucKham: string;           // Căn năng lực khám
  nhietDo: number;                  // Nhiệt độ (°C)
  ghiChu?: string;
  ngayTaiKham?: string;             // Ngày tái khám
  ngayTao: string;
  ngayCapNhat?: string;
  ketQua?: string;                  // Kết quả điều trị
}

export interface CheckupFormData {
  maLichHen: string;
  maBacSi: number;
  tenBacSi: string;
  maBenhNhan: number;
  tenBenhNhan: string;
  tenChuNuoi: string;
  tenThuCung: string;
  loaiThuCung: string;
  trieuChung: string;
  chanDoan: string;
  canNangLucKham: string;
  nhietDo: number;
  ghiChu?: string;
  ngayTaiKham?: string;
}

// Mock data
export const MOCK_DOCTORS = [
  { id: 1, name: 'BS. Lê Tấn' },
  { id: 2, name: 'BS. Phạm Hương' },
  { id: 3, name: 'BS. Trần Minh' },
];

export const MOCK_APPOINTMENTS = [
  { maLichHen: 'LH001', tenBenhNhan: 'Nguyễn Văn A', tenThuCung: 'Mimi', loaiThuCung: 'Chó', ngayHen: '2026-06-30' },
  { maLichHen: 'LH002', tenBenhNhan: 'Trần Thị B', tenThuCung: 'Tom', loaiThuCung: 'Mèo', ngayHen: '2026-06-29' },
  { maLichHen: 'LH003', tenBenhNhan: 'Lê Văn C', tenThuCung: 'Kiki', loaiThuCung: 'Chim', ngayHen: '2026-07-02' },
];