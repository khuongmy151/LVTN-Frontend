// src/features/employees/types.ts
export interface Employee {
  id: number;
  name: string;
  role: string;
  username: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  gender: 'Nam' | 'Nữ';
  birthDate: string; // YYYY-MM-DD
  avatar?: string;
  password?: string;
  specialization?: string;
  degree?: string;
  experience?: string; // chỉ lưu số (năm)
  description?: string;
  proofFile?: string;
  proofPreview?: string;
}

export interface EmployeeFormData {
  name: string;
  gender: 'Nam' | 'Nữ';
  birthDate: string;
  username: string;
  password?: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  specialization?: string;
  degree?: string;
  experience?: string;
  description?: string;
  proofFile?: string;
  proofPreview?: string;
}