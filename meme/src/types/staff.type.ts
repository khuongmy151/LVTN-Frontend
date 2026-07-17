export type Role = 'Bác sĩ' | 'Lễ tân' | 'Admin';

export type StaffStatus = 'CÒN LÀM' | 'NGHỈ VIỆC';

export interface Staff {
  id: string;
  fullName: string;
  gender: 'Nam' | 'Nữ';
  dob: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  status: StaffStatus;

  avatar?: string;

  specialization?: string;
  degree?: string;
  experience?: string;
  description?: string;
  proofFile?: string;
}