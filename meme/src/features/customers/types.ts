// src/features/customers/types.ts
export interface Customer {
  maKhachHang: string;        // ma_khach_hang - Khóa chính
  ten: string;                 // ten - Tên khách hàng
  dienThoai: string;           // dien_thoai - Số điện thoại
  email: string;               // email
  diaChi: string;              // dia_chi - Địa chỉ
  maKhach?: string;            // ma_khach - Mã khách (có thể trùng)
  daXoa: boolean;              // da_xoa - Đã xóa (0/1)
  ngayTao: string;             // ngay_tao - Ngày tạo
  ngayCapNhat?: string;        // ngay_cap_nhat - Ngày cập nhật
}

export interface CustomerFormData {
  ten: string;
  dienThoai: string;
  email: string;
  diaChi: string;
  maKhach?: string;
}