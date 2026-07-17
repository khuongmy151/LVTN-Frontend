// src/features/employees/EmployeeForm.tsx
import React, { useState, useEffect } from 'react';
import type { EmployeeFormData } from './types';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  initialData?: Partial<EmployeeFormData>;
  isEdit?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: initialData?.name || '',
    gender: initialData?.gender || 'Nam',
    birthDate: initialData?.birthDate || '',
    username: initialData?.username || '',
    password: initialData?.password || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || 'Lễ tân',
    avatar: initialData?.avatar || '',
    specialization: initialData?.specialization || '',
    degree: initialData?.degree || '',
    experience: initialData?.experience || '',
    description: initialData?.description || '',
    proofFile: initialData?.proofFile || '',
    proofPreview: initialData?.proofPreview || '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string>(initialData?.avatar || '');
  const [proofPreview, setProofPreview] = useState<string>(initialData?.proofPreview || '');
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  // Khi role thay đổi, nếu không phải Bác sĩ thì xóa các field chuyên môn
  useEffect(() => {
    if (formData.role !== 'Bác sĩ') {
      setFormData(prev => ({
        ...prev,
        specialization: '',
        degree: '',
        experience: '',
      }));
    }
  }, [formData.role]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // SĐT: chỉ cho nhập số, tối đa 10 ký tự (không hiển thị yêu cầu ra UI)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
  };

  // Kinh nghiệm: chỉ nhập số
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, experience: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    setFormData(prev => ({ ...prev, avatar: '' }));
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProofPreview(result);
        setFormData(prev => ({
          ...prev,
          proofFile: file.name,
          proofPreview: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let pwd = '';
    for (let i = 0; i < 10; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password: pwd }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate SĐT ngầm (10 số, bắt đầu bằng 0) - không hiển thị ra UI
    if (!/^0\d{9}$/.test(formData.phone)) {
      alert('Số điện thoại không hợp lệ');
      return;
    }
    onSubmit(formData);
  };

  const isDoctor = formData.role === 'Bác sĩ';

  return (
    <div className="p-8 max-h-[90vh] overflow-auto">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-bold ${isEdit ? 'text-blue-700' : 'text-emerald-700'}`}>
          {isEdit ? 'Cập nhật nhân viên' : 'THÊM NHÂN VIÊN'}
        </h2>
        <button onClick={onCancel} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ tên + Giới tính */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính:</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === 'Nam'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Nam</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === 'Nữ'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Nữ</span>
              </label>
            </div>
          </div>
        </div>

        {/* Ngày sinh + Username */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              lang="en-GB"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Mật khẩu (chỉ khi THÊM) */}
        {!isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu:</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hoặc tạo tự động"
                className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={generatePassword}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-medium whitespace-nowrap"
              >
                Tạo mật khẩu
              </button>
            </div>
          </div>
        )}

        {/* Email + SĐT */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sđt:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Chọn ảnh đại diện */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chọn ảnh (có thể bỏ qua):
          </label>
          <input
            ref={avatarInputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleAvatarChange}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3"
          />
          <p className="text-xs text-gray-500 mt-1">Hỗ trợ: png, jpg, jpeg</p>

          {avatarPreview && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <img
                src={avatarPreview}
                alt="avatar preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200"
              >
                Xóa ảnh
              </button>
            </div>
          )}
        </div>

        {/* Vai trò */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isEdit}
            className={`w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 ${
              isEdit ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="Lễ tân">Lễ tân</option>
            <option value="Bác sĩ">Bác sĩ</option>
          </select>
        </div>

        {/* Chuyên khoa / Bằng cấp / Kinh nghiệm - CHỈ hiện khi role = Bác sĩ */}
        {isDoctor && (
          <div className="space-y-4 border-l-4 border-blue-400 pl-4 py-2 bg-blue-50/50 rounded-r-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa:</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization || ''}
                  onChange={handleChange}
                  disabled={isEdit}
                  className={`w-full border border-gray-300 rounded-2xl px-4 py-3 ${
                    isEdit ? 'bg-gray-100 cursor-not-allowed' : 'focus:outline-none focus:border-blue-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bằng cấp:</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree || ''}
                  onChange={handleChange}
                  disabled={isEdit}
                  className={`w-full border border-gray-300 rounded-2xl px-4 py-3 ${
                    isEdit ? 'bg-gray-100 cursor-not-allowed' : 'focus:outline-none focus:border-blue-500'
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience || ''}
                onChange={handleExperienceChange}
                inputMode="numeric"
                placeholder="Số năm kinh nghiệm"
                disabled={isEdit}
                className={`w-full border border-gray-300 rounded-2xl px-4 py-3 ${
                  isEdit ? 'bg-gray-100 cursor-not-allowed' : 'focus:outline-none focus:border-blue-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả:</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Minh chứng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minh chứng:</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleProofChange}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3"
          />
          <p className="text-xs text-gray-500 mt-1">Hỗ trợ: png, jpg, pdf</p>
          {proofPreview && (
            <div className="mt-3 border border-gray-200 rounded-2xl p-3 bg-gray-50">
              {proofPreview.includes('application/pdf') || formData.proofFile?.endsWith('.pdf') ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="text-2xl">📄</span>
                  <span className="font-medium">{formData.proofFile}</span>
                </div>
              ) : (
                <img src={proofPreview} alt="proof preview" className="max-h-40 rounded-xl mx-auto" />
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`flex-1 py-4 text-white rounded-2xl font-medium ${
              isEdit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isEdit ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;