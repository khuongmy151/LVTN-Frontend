// src/features/billing/types.ts
export type PaymentMethod = 'Tiền mặt' | 'Chuyển khoản' | 'Thẻ' | 'Momo' | 'ZaloPay';
export type InvoiceStatus = 'pending' | 'paid' | 'cancelled' | 'refunded';
export type ItemType = 'thuoc' | 'dich_vu' | 'chi_dinh';

export interface Invoice {
  maHoaDon: string;           // Mã hóa đơn (tự động sinh)
  maPhieuKham: string;        // Mã phiếu khám
  maKhachHang: number;
  tenKhachHang: string;
  sdtKhachHang: string;
  maNhanVien: number;
  tenNhanVien: string;
  tongTien: number;
  phuongThucThanhToan: PaymentMethod;
  trangThai: InvoiceStatus;
  ghiChu?: string;
  ngayTao: string;
  ngayCapNhat?: string;
  chiTietHoaDon: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  maHoaDon?: string;
  loai: ItemType;             // thuoc | dich_vu | chi_dinh
  ten: string;                // Tên thuốc/dịch vụ
  maChiTietDonThuoc?: number;
  maChiTietChiDinh?: number;
  maDichVu?: number;
  soLuong: number;
  donGia: number;
  thanhTien: number;          // = soLuong * donGia
}

export interface InvoiceFormData {
  maPhieuKham: string;
  maKhachHang: number;
  tenKhachHang: string;
  sdtKhachHang: string;
  maNhanVien: number;
  tenNhanVien: string;
  phuongThucThanhToan: PaymentMethod;
  ghiChu?: string;
  chiTietHoaDon: InvoiceItem[];
}

// Mock data
export const PAYMENT_METHODS: PaymentMethod[] = [
  'Tiền mặt',
  'Chuyển khoản',
  'Thẻ',
  'Momo',
  'ZaloPay',
];

export const INVOICE_STATUS: Record<InvoiceStatus, { label: string; color: string }> = {
  pending: { label: 'Chưa thanh toán', color: 'bg-amber-100 text-amber-700' },
  paid: { label: 'Đã thanh toán', color: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
  refunded: { label: 'Đã hoàn tiền', color: 'bg-blue-100 text-blue-700' },
};