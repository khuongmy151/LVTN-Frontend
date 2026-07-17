// src/features/employees/EmployeeDetail.tsx
import React from 'react';
import type { Employee } from './types';

interface EmployeeDetailProps {
  employee: Employee;
  onClose: () => void;
}

// Format YYYY-MM-DD -> DD/MM/YYYY
const formatBirthDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
};

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onClose }) => {
  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-700">Xem thông tin</h2>
        <div className="mt-2">
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
              employee.status === 'active'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            ({employee.status === 'active' ? 'Còn làm' : 'Nghỉ việc'})
          </span>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="w-36 h-36 bg-gray-100 rounded-full flex items-center justify-center text-7xl border-4 border-white shadow-lg overflow-hidden">
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            '‍⚕️'
          )}
        </div>
      </div>

      {/* Thông tin */}
      <div className="space-y-4 text-gray-700 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Tên:</label>
          <div className="flex-1 font-semibold text-lg">{employee.name}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Giới tính:</label>
          <div className="flex-1 font-medium">{employee.gender}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Ngày sinh:</label>
          <div className="flex-1 font-medium">{formatBirthDate(employee.birthDate)}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Username:</label>
          <div className="flex-1 font-medium">{employee.username}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Email:</label>
          <div className="flex-1 font-medium">{employee.email}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Sđt:</label>
          <div className="flex-1 font-medium">{employee.phone}</div>
        </div>

        <div className="flex items-center gap-3">
          <label className="w-28 text-sm font-medium text-gray-500">Vai trò:</label>
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
            {employee.role}
          </span>
        </div>

        {employee.specialization && (
          <div className="flex items-center gap-3">
            <label className="w-28 text-sm font-medium text-gray-500">Chuyên khoa:</label>
            <div className="flex-1 font-medium">{employee.specialization}</div>
          </div>
        )}

        {employee.degree && (
          <div className="flex items-center gap-3">
            <label className="w-28 text-sm font-medium text-gray-500">Bằng cấp:</label>
            <div className="flex-1 font-medium">{employee.degree}</div>
          </div>
        )}

        {employee.experience && (
          <div className="flex items-center gap-3">
            <label className="w-28 text-sm font-medium text-gray-500">Kinh nghiệm:</label>
            <div className="flex-1 font-medium">{employee.experience} năm</div>
          </div>
        )}

        {employee.description && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Mô tả:</label>
            <div className="font-medium bg-gray-50 p-4 rounded-2xl border border-gray-200">
              {employee.description}
            </div>
          </div>
        )}

        {(employee.proofFile || employee.proofPreview) && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Minh chứng:</label>
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 flex justify-center">
              {employee.proofPreview ? (
                employee.proofPreview.includes('application/pdf') ||
                employee.proofFile?.endsWith('.pdf') ? (
                  <div className="flex flex-col items-center gap-2 text-blue-600">
                    <span className="text-5xl">📄</span>
                    <span className="font-medium">{employee.proofFile}</span>
                  </div>
                ) : (
                  <img src={employee.proofPreview} alt="minh chứng" className="max-h-48 rounded-xl" />
                )
              ) : (
                <div className="flex flex-col items-center gap-2 text-blue-600">
                  <span className="text-5xl">📄</span>
                  <span className="font-medium">{employee.proofFile}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chỉ có nút Thoát ra - không có nút Cập nhật thông tin */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
        >
          Thoát ra
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;