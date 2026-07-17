// src/features/employees/EmployeeTable.tsx
import React from 'react';
import type { Employee } from './types';

interface EmployeeTableProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onToggleStatus: (employee: Employee) => void;
  onResetPassword: (employee: Employee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onView,
  onEdit,
  onToggleStatus,
  onResetPassword,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Họ tên</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Vai trò</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">SĐT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {employees.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-500">{index + 1}</td>
                <td className="px-6 py-5 font-medium text-gray-900">{emp.name}</td>
                <td className="px-6 py-5">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {emp.role}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">{emp.username}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{emp.email}</td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      emp.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {emp.status === 'active' ? 'Còn làm' : 'Nghỉ việc'}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">{emp.phone}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onView(emp)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => onEdit(emp)}
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-amber-50"
                    >
                      Cập nhật
                    </button>
                    {emp.status === 'active' ? (
                      <button
                        onClick={() => onToggleStatus(emp)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-red-50"
                      >
                        Nghỉ việc
                      </button>
                    ) : (
                      <button
                        onClick={() => onResetPassword(emp)}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-purple-50"
                      >
                        Cấp lại mk
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;